/* ============================================================================
   Grounding layer.

   Everything the assistant needs to reason about coverage is COMPUTED HERE and
   handed to the model as plain facts. Language models are bad at arithmetic and
   invent moves, so we never ask them to do either: we do the maths, they do
   the strategy and the explanation.
   ========================================================================== */

/* --- Type coverage of a team --- */
const teamCoverage = typesList => {
  const take = new Set();
  typesList.flat().forEach(type => {
    take.add(type);
    Object.entries(TYPE_CHART).forEach(([attacker, row]) => {
      if ((row[type] ?? 1) > 1) take.add(attacker);
    });
  });
  return [...take];
};

const teamWeaknesses = typesList => {
  const tally = {};
  Object.entries(TYPE_CHART).forEach(([attacker, row]) => {
    let worst = 1;
    (typesList || []).forEach(type => {
      const value = row[type] ?? 1;
      if (value === 0 || value > worst) worst = value;
    });
    if (worst > 1) (tally[attacker] ||= []).push(worst);
  });
  return tally;
};

/* --- What a set actually threatens ---
   Scored from the real usage numbers, so the ranking mirrors the live meta
   instead of a guess. */
const moveKey = name => String(name || "").toLowerCase().replace(/[^a-z]/g, "");

/* Move types and powers come from the generated roster (real usage data),
   so nothing here has to be maintained by hand. */
const resolveMove = name => {
  if (typeof moveInfo === "function") {
    const direct = moveInfo(name);
    if (direct) return direct;
  }
  const key = moveKey(name);
  return Object.keys(typeof MOVE_DATA === "object" ? MOVE_DATA : {}).find(k => moveKey(k) === key) || null;
};
/* Named `championMoveType` rather than `moveTypeOf`: script.js already declares
   `moveTypeOf` at global scope and the two pages may be combined later. */
const championMoveType = name => {
  const info = resolveMove(name);
  return info?.type || null;
};
const championMovePower = name => {
  const info = resolveMove(name);
  return info?.power ?? null;
};

const threatProfile = entry => {
  if (!entry?.meta) return null;
  const perMove = entry.meta.moves.map(m => ({
    move: m.name,
    percent: m.percent,
    type: m.type || championMoveType(m.name),
    power: m.power ?? championMovePower(m.name)
  }));
  const attackTypes = [...new Set(perMove.filter(m => m.percent >= 15 && m.type).map(m => m.type))];
  const targets = {};
  attackTypes.forEach(attackType => {
    Object.entries(TYPE_CHART[attackType] || {}).forEach(([defender, mult]) => {
      if (mult >= 2) (targets[defender] ||= []).push({ type: attackType, mult });
    });
  });
  const topTargets = Object.entries(targets)
    .map(([type, list]) => ({ type, from: list.map(t => t.type), mult: Math.max(...list.map(t => t.mult)) }))
    .sort((a, b) => b.mult - a.mult);
  return { moves: perMove.slice(0, 6), attackTypes, topTargets: topTargets.slice(0, 10) };
};

/* --- Description of the user's current team, as facts --- */
const describeCurrentTeam = team => {
  const list = (team || []).filter(p => p && typeof p === "object" && p.name);
  if (!list.length) return "The team is empty.";
  return list.map((p, i) => {
    const entry = getRosterEntry(p.name);
    const typeText = entry ? entry.types.join("/") : (p.types || []).join("/");
    return `  Slot ${i + 1}: ${p.name} [${typeText}]${entry?.bst ? ` BST ${entry.bst}` : ""}`;
  }).join("\n");
};

const currentTeamCoverage = team => {
  const list = (team || []).filter(p => p && Array.isArray(p.types) && p.types.length);
  if (!list.length) return null;
  const types = list.map(p => p.types);
  return {
    attacks: teamCoverage(types).sort(),
    weaknesses: Object.entries(teamWeaknesses(types)).map(([type, list2]) => `${type} x${Math.max(...list2)}`)
  };
};

/* --- Build the factual brief handed to the model --- */
const buildBrief = ({ team, focus, legalMoves }) => {
  const parts = [];

  parts.push("AVAILABLE POKÉMON (verified stats and types; `meta` = real Champions usage):");
  ROSTER.forEach(entry => {
    const flags = [entry.tier ? `tier ${entry.tier}` : null, entry.meta ? `${entry.meta.usage}% usage` : "unused"].filter(Boolean);
    let line = `- ${entry.name} | ${entry.types.join("/")} | BST ${entry.bst} | ${STAT_NAMES.map((n, i) => `${n} ${entry.stats[i]}`).join(" ")} | abilities: ${entry.abilities.join(", ")} | ${flags.join(", ")}`;
    if (entry.mega) line += ` | REQUIRES ${entry.gem} (Mega form of ${entry.mega})`;
    parts.push(line);
    if (entry.meta?.moves?.length) {
      parts.push(`    moves used: ${entry.meta.moves.map(m => `${m.name} (${m.percent}%)`).join(", ")}`);
      if (entry.meta.abilities?.length) parts.push(`    abilities used: ${entry.meta.abilities.map(a => `${a.name} (${a.percent}%)`).join(", ")}`);
      if (entry.meta.items?.length) parts.push(`    items used: ${entry.meta.items.map(it => `${it.name} (${it.percent}%)`).join(", ")}`);
      if (entry.meta.partners?.length) parts.push(`    often teamed with: ${entry.meta.partners.map(p => p.name).join(", ")}`);
    }
    if (legalMoves?.[entry.slug]?.length) parts.push(`    legal moves: ${legalMoves[entry.slug].join(", ")}`);
  });

  parts.push("");
  parts.push(`TYPE MATCHUP REFERENCE: ${Object.entries(TYPE_NAMES).map(([k, v]) => v).join(", ")}.`);

  const coverage = currentTeamCoverage(team);
  if (coverage) {
    parts.push("");
    parts.push("CURRENT TEAM, PRECOMPUTED (do not recalculate):");
    parts.push(describeCurrentTeam(team));
    parts.push(`  Types the team can hit: ${coverage.attacks.join(", ")}`);
    parts.push(`  Types that threaten the team: ${coverage.weaknesses.join(", ") || "none"}`);
  }

  if (focus) {
    const entry = getRosterEntry(focus);
    const threat = threatProfile(entry);
    if (entry) {
      parts.push("");
      parts.push(`FOCUS POKÉMON: ${entry.name}`);
      parts.push(`  types ${entry.types.join("/")} | BST ${entry.bst} | abilities ${entry.abilities.join(", ")}`);
      if (threat) parts.push(`  its attacks threaten: ${threat.topTargets.map(t => `${t.type} (x${t.mult} via ${t.from.join("/")})`).join(", ")}`);
    }
  }

  return parts.join("\n");
};