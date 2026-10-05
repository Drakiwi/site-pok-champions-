/* ============================================================================
   Local strategy engine.

   Builds genuinely competitive Champions teams with no API key and no network
   call. Everything it reasons from lives in verified data files:

     roster.js   real base stats, types, abilities, mega stones and live
                 Champions usage numbers (which moves, items, abilities are
                 actually played, and which Pokemon are teamed together)
     sets.js     curated sets, used as a fallback when a Pokemon has no usage
                 data of its own (mostly Mega forms)

   How it works: build a picture of what the format actually threatens, then run
   a beam search over the six slots. A team scores well when it covers those
   threatening types, answers each of them more than once, mixes roles instead
   of stacking six attackers, leans on synergy the usage data confirms, and
   does not share a single glaring weakness. The effort level only changes how
   wide the search runs.

   No move, ability, item or Pokemon is ever invented: every value comes from
   one of those two files.
   ========================================================================== */

/* ---------- Normalisation ---------- */
const normKey = value => String(value || "")
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]/g, "");

const BASE_FORM_SUFFIX = /\s*-(mega(-[xyz])?|hisui|hisuian|alola|galar|eternal|f|male|female)$/i;
const baseFormName = name => String(name || "").replace(BASE_FORM_SUFFIX, "").trim();

/* The site labels Scovillain "Scovilain"; a couple of forms need a hand. */
const NAME_ALIASES = { scovillain: "scovilain" };

const SETS_INDEX = new Map(SETS.map(entry => [normKey(entry.name), entry]));
const setEntryFor = name => {
  const keys = [normKey(name), normKey(NAME_ALIASES[normKey(name)]), normKey(baseFormName(name))];
  for (const key of keys) {
    if (!key) continue;
    const hit = SETS_INDEX.get(key);
    if (hit) return hit;
  }
  return null;
};

/* ---------- Move pool per Pokemon ----------
   Real usage data wins. Curated sets are the fallback, and when they come from
   a base form rather than the exact entry the card says so, because a Mega does
   not always keep its base moveset. */
const MOVE_POOL_CACHE = new Map();

/* Null and 0 both mean "status move". Curated sets write null, the usage data
   writes 0, and the difference was silently making status moves look like they
   had no power at all instead of being recognised as utility. */
const STATUS_POWER = 0;
const isStatusPower = power => power === null || power === undefined || Number(power) === STATUS_POWER;

const movePoolFor = entry => {
  if (MOVE_POOL_CACHE.has(entry.name)) return MOVE_POOL_CACHE.get(entry.name);

  const fromUsage = (entry.meta?.moves || []).map(move => ({
    name: move.name,
    type: move.type || championMoveType(move.name),
    power: isStatusPower(move.power) ? STATUS_POWER : move.power,
    percent: move.percent || 0
  }));

  const curated = setEntryFor(entry.name);
  const fromSets = curated
    ? curated.moves.map(([name, type, power]) => ({
      name,
      type,
      power: isStatusPower(power) ? STATUS_POWER : power,
      percent: 0
    }))
    : [];

  const base = fromUsage.length ? fromUsage : fromSets;
  const moves = base
    .filter(move => move.name)
    .map(move => {
      const known = championMovePower(move.name);
      return {
        name: move.name,
        type: move.type || championMoveType(move.name),
        power: isStatusPower(move.power)
          ? STATUS_POWER
          : (isStatusPower(known) ? STATUS_POWER : known),
        percent: move.percent || 0
      };
    });

  /* Does the set belong to this exact Pokemon, or to its base form? */
  const inherited = curated ? normKey(curated.name) !== normKey(entry.name) : false;

  const result = {
    moves,
    curated,
    provenance: fromUsage.length ? "usage" : fromSets.length ? (inherited ? "base" : "curated") : "none",
    inherited
  };
  MOVE_POOL_CACHE.set(entry.name, result);
  return result;
};

/* ---------- Per-Pokemon analysis ---------- */
const ANALYSIS_CACHE = new Map();

const analyseEntry = entry => {
  if (ANALYSIS_CACHE.has(entry.name)) return ANALYSIS_CACHE.get(entry.name);

  const pool = movePoolFor(entry);
  const attacking = pool.moves.filter(move => move.type && move.power > STATUS_POWER);
  const status = pool.moves.filter(move => isStatusPower(move.power));

  /* Coverage is judged on the moves this Pokemon really brings to a game.
     Facade and Rock Smash are filler: they are in almost every set but nobody
     builds around them, so a threshold on real usage share keeps them from
     making every Pokemon look like it answers every type. */
  const realUsage = attacking.filter(move => (move.percent || 0) >= 20);
  const relevant = realUsage.length >= 2 ? realUsage : attacking;

  const [hp, atk, def, spa, spd, spe] = entry.stats;

  /* What does this Pokemon hit hard? Best multiplier per defending type, with
     STAB counted because a same-type move is the one it will actually spam. */
  const threat = {};
  relevant.forEach(move => {
    const row = TYPE_CHART[move.type] || {};
    Object.entries(row).forEach(([defType, mult]) => {
      if (mult <= 1) return;
      const stab = entry.types.includes(move.type);
      const score = mult * (stab ? 1.25 : 1);
      const current = threat[defType];
      if (!current || score > current.score) {
        threat[defType] = { type: defType, mult, score, via: move.type, stab, move: move.name, power: move.power };
      }
    });
  });

  const attackTypes = [...new Set(attacking.map(move => move.type))];
  const hitCount = Object.keys(threat).length;
  const bestMult = Math.max(1, ...Object.values(threat).map(t => t.mult));

  const bulk = hp + def + spd;
  const physical = atk > spa * 1.15;
  const special = spa > atk * 1.15;

  /* Role, inferred from the stat spread and the moves it actually runs. */
  const names = pool.moves.map(move => normKey(move.name));
  const has = (...keys) => keys.some(key => names.includes(normKey(key)));
  const setup = has("swordsdance", "nastyp", "nastyplot", "bulkup", "dragondance", "calmmind",
    "shiftgear", "quiverdance", "agility", "irondefense", "shellsmash", "triplekick");
  const pivot = has("uturn", "voltswitch", "partingshot", "teleport", "batonpass");
  const recovery = has("recover", "roost", "softboiled", "synthesis", "milkdrink", "lifedew", "rest", "slackoff");
  const hazard = has("stealthrock", "toxicspikes", "spikes", "stickyweb", "stealthrock");
  const support = has("tailwind", "trickroom", "screens", "reflect", "lightscreen", "auroraveil",
    "helpinghand", "followme", "wideguard", "aromatherapy", "healbell", " Coaching");
  const weak = hp < 90 && bulk < 240;

  let role = "balanced";
  if (setup && spe >= 95) role = physical ? "sweeper" : "sweeper";
  else if (recovery && bulk >= 300) role = "tank";
  else if (hazard || support) role = "support";
  else if (pivot && spe >= 95) role = "pivot";
  else if (bestMult >= 4 || (bulk < 230 && hitCount >= 3)) role = "wallbreaker";
  else if (spe >= 110 && bulk < 250) role = "sweeper";
  else if (bulk >= 300) role = "tank";
  else if (weak) role = "glass";

  const result = {
    entry,
    pool,
    attacking,
    relevant,
    status,
    threat,
    attackTypes,
    hitCount,
    bestMult,
    bulk,
    physical,
    special,
    role,
    stats: { hp, atk, def, spa, spd, spe }
  };
  ANALYSIS_CACHE.set(entry.name, result);
  return result;
};

/* ---------- What actually threatens this format ----------
   A type is dangerous when a lot of popular Pokemon hit it super-effectively,
   so the tally is over DEFENDED types, not attacking ones. Only moves a real
   share of sets actually run are counted, which keeps spread moves like Return
   or Facade from inflating the list. */
const FORMAT_THREATS = (() => {
  const tally = {};
  ROSTER.forEach(entry => {
    if (!entry.meta?.usage) return;
    const weight = entry.meta.usage;
    const { relevant } = analyseEntry(entry);
    relevant.forEach(move => {
      if (move.power < 55) return;
      const share = (move.percent || 0) / 100;
      if (share < 0.25) return;
      Object.entries(TYPE_CHART[move.type] || {}).forEach(([defType, mult]) => {
        if (mult < 2) return;
        tally[defType] = (tally[defType] || 0) + weight * share * (mult >= 4 ? 1.5 : 1);
      });
    });
  });
  return Object.entries(tally).sort((a, b) => b[1] - a[1]).map(([type]) => type);
})();

/* How many threatening types each effort level aims to answer. More effort means
   a wider net of threats, which is the real difference between the levels. */
const DETAIL_THRESHOLDS = { quick: 4, standard: 6, deep: 8 };

/* Priority types to cover: either what the user asked about, or the real
   top threats of the format. */
const priorityTypesFor = (threat, effort) => {
  const depth = DETAIL_THRESHOLDS[effort] || 6;
  if (!threat) return FORMAT_THREATS.slice(0, depth);

  const key = normKey(threat);
  const asType = TYPE_NAMES[key] ? key : null;
  const entry = getRosterEntry(threat) || ROSTER.find(e => normKey(e.name) === key) || null;

  if (entry) {
    const { attacking } = analyseEntry(entry);
    const types = [...new Set(attacking.map(move => move.type))].slice(0, 4);
    return types.length ? types : FORMAT_THREATS.slice(0, depth);
  }
  if (asType) {
    /* Cover the named type, then whatever else the format leans on as backup. */
    return [asType, ...FORMAT_THREATS.filter(t => t !== asType).slice(0, depth - 1)];
  }
  return FORMAT_THREATS.slice(0, depth);
};

/* ---------- Team evaluation ---------- */
const coverageOf = picks => {
  const coverage = {};
  picks.forEach(entry => {
    const { threat } = analyseEntry(entry);
    Object.values(threat).forEach(hit => {
      const current = coverage[hit.type];
      if (!current || hit.mult > current) coverage[hit.type] = hit.mult;
    });
  });
  return coverage;
};

/* How many members answer each threatening type. One is a coin flip, two is a
   plan. */
const answerCount = picks => {
  const counts = {};
  picks.forEach(entry => {
    const { threat } = analyseEntry(entry);
    Object.entries(threat).forEach(([type, hit]) => {
      if (hit.mult >= 2) counts[type] = (counts[type] || 0) + 1;
    });
  });
  return counts;
};

/* A weakness only matters when several members share it: one weak Pokemon is a
   switch-in, three is a problem the opponent can force. Counting members rather
   than taking the worst multiplier is what makes the verdict useful. */
/* One weak Pokemon is a switch-in, three is a problem the opponent can force,
   so the player's team is expected to have six members. */
const WEAKNESS_SHARE = 3;

const weaknessTally = picks => {
  const counts = {};
  const worst = {};
  if (!picks.length) return { counts, worst };
  Object.entries(TYPE_CHART).forEach(([attacker, row]) => {
    let members = 0;
    let max = 1;
    picks.forEach(entry => {
      let hit = 1;
      entry.types.forEach(type => {
        const value = row[type] ?? 1;
        if (value > hit) hit = value;
      });
      if (hit > 1) members += 1;
      if (hit > max) max = hit;
    });
    counts[attacker] = members;
    worst[attacker] = max;
  });
  return { counts, worst };
};

/* The weaknesses worth telling the player about: shared by enough members to
   decide a game, or x4 against anyone. */
const realWeaknesses = picks => {
  const { counts, worst } = weaknessTally(picks);
  return Object.entries(counts)
    .filter(([, members]) => members >= WEAKNESS_SHARE)
    .map(([type, members]) => ({ type, members, mult: worst[type] }))
    .sort((a, b) => b.members - a.members || b.mult - a.mult);
};

/* Real synergy: the usage data lists which Pokemon are actually played together,
   so a pair that shows up there is worth more than one that merely could work. */
const partnerLookup = entry => {
  const index = {};
  (entry.meta?.partners || []).forEach(partner => {
    const key = normKey(partner.name);
    index[key] = (index[key] || 0) + partner.percent;
  });
  return index;
};

const synergyBetween = (a, b) => partnerLookup(a)[normKey(b.name)] || 0;

const STYLE_WEIGHTS = {
  balanced: { coverage: 6, insurance: 1.5, roles: 4, bulk: 1.4, speed: 0.8, power: 1, synergy: 0.02, weakness: 2 },
  offense:  { coverage: 5, insurance: 0.8, roles: 3, bulk: 0.3, speed: 1.6, power: 2.2, synergy: 0.02, weakness: 1 },
  bulk:     { coverage: 6, insurance: 2.2, roles: 5, bulk: 2.8, speed: 0.3, power: 0.5, synergy: 0.02, weakness: 3 },
  speed:    { coverage: 6, insurance: 1.5, roles: 4, bulk: 0.5, speed: 2.8, power: 1.2, synergy: 0.02, weakness: 1.5 },
  tank:     { coverage: 7, insurance: 2.6, roles: 5, bulk: 3.4, speed: 0.2, power: 0.3, synergy: 0.02, weakness: 3.5 }
};

const STYLE_LIST = [
  { id: "balanced", label: "Équilibrée", blurb: "Couverture large, peu de failles, pas deypertérat" },
  { id: "offense", label: "Offensive", blurb: "Vitesse et puissance, on Gain de vitesse avant de perdre" },
  { id: "bulk", label: "Résistant", blurb: "Deux réponses à chaque menace, on encaisse" },
  { id: "speed", label: "Ultra-vitesse", blurb: "Priorité à la vitesse, on agit toujours en premier" },
  { id: "tank", label: "Blindé", blurb: "Maximum de bulk, très peu de PPM" }
];

const EFFORT_LEVELS = {
  quick: { label: "Rapide", pool: 14, beam: 5, blurb: "Recherche courte, quasi instantanée" },
  standard: { label: "Standard", pool: 26, beam: 14, blurb: "Bon compromis, moins d'une seconde" },
  deep: { label: "Approfondie", pool: 40, beam: 30, blurb: "Recherche large, meilleur résultat final" }
};

const scoreTeam = (picks, priority, weights) => {
  if (!picks.length) return 0;
  const coverage = coverageOf(picks);
  const answers = answerCount(picks);
  const weakness = realWeaknesses(picks);

  let score = 0;

  /* Covering what actually threatens the format. */
  priority.forEach(type => {
    const best = coverage[type] || 1;
    if (best >= 4) score += weights.coverage * 1.6;
    else if (best >= 2) score += weights.coverage;
    score += Math.min(answers[type] || 0, 2) * weights.insurance;
  });

  /* Roles: a good six has a way in, a way to stay in and a win condition. */
  const roleCounts = {};
  picks.forEach(entry => {
    const role = analyseEntry(entry).role;
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });
  Object.values(roleCounts).forEach(count => {
    if (count === 1) score += weights.roles;
    else if (count === 2) score += weights.roles * 0.7;
    else if (count === 3) score -= weights.roles * 0.6;
    else score -= weights.roles * 1.4;
  });

  /* Averages, judged against the roster so the scale is meaningful. */
  const analyses = picks.map(analyseEntry);
  const avgBulk = analyses.reduce((sum, a) => sum + a.bulk, 0) / analyses.length;
  const avgSpeed = analyses.reduce((sum, a) => sum + a.stats.spe, 0) / analyses.length;
  const avgPower = analyses.reduce((sum, a) => sum + Math.max(...a.attacking.map(m => m.power || 0), 0), 0) / analyses.length;
  score += weights.bulk * (avgBulk / 100);
  score += weights.speed * (avgSpeed / 12);
  score += weights.power * (avgPower / 12);

  /* Don't hand the opponent a free switch-in. Only shared weaknesses count. */
  weakness.forEach(hole => {
    if (hole.mult >= 4) score -= weights.weakness * 1.6;
    score -= weights.weakness * 0.4 * (hole.members / picks.length);
  });

  /* Confirmed pairings: look the partner up once per pick instead of scanning
     every pair. */
  const partnerIndex = {};
  picks.forEach(entry => {
    (entry.meta?.partners || []).forEach(partner => {
      const key = normKey(partner.name);
      partnerIndex[key] = (partnerIndex[key] || 0) + partner.percent;
    });
  });
  for (let i = 0; i < picks.length; i++) {
    for (let j = i + 1; j < picks.length; j++) {
      score += ((partnerIndex[normKey(picks[j].name)] || 0) / 100) * weights.synergy * 10;
    }
  }

  /* Exactly one Mega spends the one resource the rules allow. */
  const megas = picks.filter(entry => entry.mega).length;
  score += megas === 1 ? 2.5 : 0;

  return score;
};

/* ---------- Candidate ranking, adapted to what is already picked ---------- */
/* Regenerate has to actually change something. The rank is the search order,
   so a real reshuffle is applied per seed: a small, bounded rotation weighted
   by depth, which moves strong picks around without ever letting a bad pick
   take over. A plain random sort would just hand back the same team. */
const jitterOrder = (candidates, rng) => {
  const weighted = candidates.map((candidate, rank) => {
    const influence = 1 + 1.6 / (1 + rank * 0.16);
    return { ...candidate, roll: candidate.value * (0.86 + rng() * 0.28) * influence };
  });
  weighted.sort((a, b) => b.roll - a.roll);
  return weighted.map(candidate => ({ ...candidate, value: candidate.roll }));
};

/* Every form of one Pokemon is the same team slot, however the API links them.
   A Mega names its base in `battleOnly`, and that base may itself be a regional
   or signature form (Floette-Mega -> Floette-Eternal), so the chain is followed
   until it stops. */
const lineKey = entry => {
  if (!entry) return "";
  let current = entry;
  let linked = false;
  for (let step = 0; step < 4; step++) {
    const parent = current.mega ? getRosterEntry(current.mega) : null;
    if (!parent) break;
    current = parent;
    linked = true;
  }
  /* Without a parent in the roster (Garchomp only ships as a Mega, Indeedee-F
     and Garchomp-Mega-Z carry no battleOnly) the form suffix still identifies
     the line, so it is stripped. */
  const name = linked ? current.name : baseFormName(entry.name);
  return normKey(name) || normKey(entry.name);
};

const sameLine = (a, b) => {
  if (!a || !b) return false;
  if (normKey(a.name) === normKey(b.name)) return true;
  const ka = lineKey(a);
  const kb = lineKey(b);
  return !!ka && ka === kb;
};

const rankCandidates = (picks, priority, weights, limit, rng) => {
  const coverage = coverageOf(picks);
  const answers = answerCount(picks);
  const chosen = new Set(picks.map(entry => entry.name));

  /* Facts about the current team that every candidate is measured against.
     Computed once here: doing this inside the loop was what made the deep
     search take seconds instead of milliseconds. */
  const roleCounts = {};
  let bulkSum = 0;
  picks.forEach(entry => {
    const role = analyseEntry(entry).role;
    roleCounts[role] = (roleCounts[role] || 0) + 1;
    bulkSum += analyseEntry(entry).bulk;
  });
  const avgBulk = picks.length ? bulkSum / picks.length : 200;
  /* Weakness types this team already has too many of. */
  const sharedTypes = new Set(realWeaknesses(picks).map(hole => hole.type));
  const partnerBonus = {};
  picks.forEach(picked => {
    (picked.meta?.partners || []).forEach(partner => {
      partnerBonus[normKey(partner.name)] = (partnerBonus[normKey(partner.name)] || 0) + partner.percent;
    });
  });

  return ROSTER
    .filter(entry => !chosen.has(entry.name))
    .map(entry => {
      const analysis = analyseEntry(entry);
      let value = 0;

      /* How much of the missing coverage does this one bring? */
      priority.forEach(type => {
        const have = coverage[type] || 1;
        const hit = analysis.threat[type];
        if (!hit) return;
        if (have < 2) value += weights.coverage * (hit.mult >= 4 ? 1.6 : 1);
        else value += weights.insurance * 0.5 * hit.mult;
        if ((answers[type] || 0) === 0) value += weights.coverage * 0.4;
      });

      /* Role gap. */
      const count = roleCounts[analysis.role] || 0;
      if (count === 0) value += weights.roles;
      else if (count === 1) value += weights.roles * 0.4;
      else value -= weights.roles * 0.8;

      /* Real meta weight. A Pokemon with actual usage numbers is a known
         quantity; one without is a guess, so it only wins if it clearly
         solves something the proven options do not. */
      if (entry.meta?.usage) value += Math.log10(1 + entry.meta.usage) * 9;
      if (entry.tier) value += 2.5;
      if (entry.mega) value += 2.5;
      if (!entry.meta?.usage && analysis.pool.provenance === "none") value -= 6;

      value += weights.bulk * (analysis.bulk - avgBulk) / 100;
      value += weights.speed * (analysis.stats.spe - 100) / 12;
      value += weights.power * Math.max(...analysis.attacking.map(m => m.power || 0), 0) / 12;

      /* Confirmed pairing from the usage data: these two actually show up together. */
      const partner = partnerBonus[normKey(entry.name)];
      if (partner) value += (partner / 100) * weights.synergy * 10;

      /* Worsening a weakness the team already shares is what actually loses
         games, so crossing that line is penalised. */
      if (sharedTypes.size) {
        Object.entries(TYPE_CHART).forEach(([attacker, row]) => {
          if (!sharedTypes.has(attacker)) return;
          const hit = entry.types.some(type => (row[type] ?? 1) > 1);
          if (hit) value -= weights.weakness * 0.7;
        });
      }

      /* Needs a real set to be worth anything. */
      if (!analysis.attacking.length) value -= 40;

      return { entry, value };
    })
    .filter(candidate => !picks.some(picked => sameLine(picked, candidate.entry)))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
};

/* Repair a team that broke a hard rule, rather than shipping it. Excluding every
   shown team can starve the search and leave it short-handed, so this
   backstops it: extra Megas are demoted, duplicates removed, and the six slots
   are filled from the same scored candidate pool. */
const repairTeam = (picks, priority, weights) => {
  const working = picks.filter(Boolean);
  if (!working.length) return null;

  /* One Mega per team, and one member per evolutionary line. */
  let megaSeen = false;
  const fixed = [];
  for (const entry of working) {
    if (fixed.some(kept => sameLine(kept, entry))) continue;
    if (!entry.mega) { fixed.push(entry); continue; }
    if (!megaSeen) { megaSeen = true; fixed.push(entry); continue; }
    const base = getRosterEntry(entry.mega) ||
      ROSTER.find(pick => normKey(pick.name) === normKey(baseFormName(entry.name)));
    if (base && !fixed.some(kept => sameLine(kept, base))) fixed.push(base);
  }

  /* Top up to six from the pool, respecting both rules. */
  const rng = mulberry32(0x5eed);
  let guard = 0;
  while (fixed.length < 6 && guard++ < 60) {
    const option = rankCandidates(fixed, priority, weights, 40, rng)
      .find(candidate => !candidate.entry.mega || !megaSeen);
    if (!option) break;
    fixed.push(option.entry);
    if (option.entry.mega) megaSeen = true;
  }

  return fixed.length ? fixed : null;
};

/* ---------- Beam search ---------- */
const mulberry32 = seed => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* Regenerate has to return something genuinely new. Shuffling the shortlist is
   not enough on its own: the beam keeps the globally best states, so every seed
   converges back to the same six. So previously shown teams are excluded
   outright, and the search is only allowed to relax if it would otherwise fail
   to fill six slots. */
const teamSignature = picks => [...picks].map(entry => normKey(entry.name)).sort().join("|");

const buildTeam = ({ style = "balanced", effort = "standard", threat = null, required = [], seed = 1, exclude = [] } = {}) => {
  const config = EFFORT_LEVELS[effort] || EFFORT_LEVELS.standard;
  const weights = STYLE_WEIGHTS[style] || STYLE_WEIGHTS.balanced;
  const priority = priorityTypesFor(threat, effort);
  const rng = mulberry32(Math.imul(seed + 1, 2654435761));

  const forced = (required || [])
    .map(name => getRosterEntry(name) || ROSTER.find(entry => normKey(entry.name) === normKey(name)))
    .filter(Boolean);
  const megaUsed = forced.some(entry => entry.mega);
  const start = forced.length > 6 ? forced.slice(0, 6) : forced;
  const banned = new Set(exclude);

  /* `strict` refuses to repeat a shown team; it is lifted only if the search
     cannot otherwise reach six members. */
  const run = strict => {
    let beam = [{ picks: start, megaUsed }];
    while (beam[0] && beam[0].picks.length < 6) {
      const next = [];
      for (const state of beam) {
        const shortlist = rankCandidates(state.picks, priority, weights, config.pool, rng);
        for (const candidate of shortlist) {
          if (state.picks.some(entry => sameLine(entry, candidate.entry))) continue;
          if (candidate.entry.mega && state.megaUsed) continue;
          const picks = [...state.picks, candidate.entry];
          const signature = teamSignature(picks);
          if (strict && banned.has(signature)) continue;
          next.push({ picks, megaUsed: state.megaUsed || !!candidate.entry.mega, signature });
        }
      }
      if (!next.length) break;
      next.forEach(state => { state.score = scoreTeam(state.picks, priority, weights); });
      next.sort((a, b) => b.score - a.score);
      beam = next.slice(0, config.beam);
    }
    return beam[0] || { picks: start, signature: teamSignature(start) };
  };

  let best = run(true);
  /* Fewer than six members means the roster could not satisfy the request. */
  if (best.picks.length < 6 && start.length < 6) best = run(false);

  /* Last-resort guard. Excluding every shown team can starve the search, and the
     one thing that must never come back is a second Mega, so verify the winner
     rather than trusting the beam. */
  const megaCount = best.picks.filter(entry => entry.mega).length;
  if (megaCount > 1 || best.picks.length < 6) {
    const repair = repairTeam(best.picks, priority, weights);
    if (repair) best = { picks: repair, signature: teamSignature(repair) };
  }

  return { picks: best.picks, signature: best.signature, priority, style, effort, weights };
};

/* ---------- Set building ---------- */
const EV_PRESETS = {
  physical_sweeper: { attack: 252, speed: 252, "special-defense": 4 },
  special_sweeper: { "special-attack": 252, speed: 252, "special-defense": 4 },
  wallbreaker: { attack: 252, "special-defense": 4, speed: 252 },
  tank: { hp: 252, defense: 252, "special-defense": 4 },
  special_tank: { hp: 252, "special-defense": 252, defense: 4 },
  bulky_attacker: { hp: 252, attack: 252, defense: 4, speed: 2 },
  fast_support: { hp: 252, speed: 252, "special-defense": 4 },
  balanced: { hp: 252, defense: 126, "special-defense": 126, speed: 4 }
};

const NATURE_BY_SHAPE = {
  physical: [["Adamant", "Jolly"], ["Adamant", "Jolly"]],
  special: [["Modest", "Timid"], ["Modest", "Timid"]],
  mixed: [["Jolly", "Naive"], ["Adamant", "Hasty"]]
};

/* Pick four moves: the best real attacks, spread across types, plus a utility
   move if the pool actually has one. Nothing is invented. */
const chooseMoves = analysis => {
  const scored = analysis.relevant
    .map(move => ({
      ...move,
      score: (move.power || 0) * (move.percent ? 0.4 + move.percent / 100 : 0.55) *
        (analysis.entry.types.includes(move.type) ? 1.2 : 1)
    }))
    .sort((a, b) => b.score - a.score);

  const picked = [];
  const usedTypes = new Set();

  /* First pass: one move per attacking type, best first. */
  scored.forEach(move => {
    if (picked.length >= 4 || usedTypes.has(move.type)) return;
    usedTypes.add(move.type);
    picked.push(move);
  });
  /* Second pass: fill up with whatever is left. */
  scored.forEach(move => {
    if (picked.length >= 4) return;
    if (picked.some(chosen => chosen.name === move.name)) return;
    picked.push(move);
  });

  /* A utility move is worth more than a fourth redundant attack. */
  if (analysis.status.length && picked.length === 4) {
    const utility = [...analysis.status].sort((a, b) => (b.percent || 0) - (a.percent || 0))[0];
    if (utility) picked[picked.length - 1] = utility;
  }

  /* Four slots is the format's rule. Curated sets sometimes list only three
     moves: pad from the same pool rather than inventing anything, and never
     repeat a move that is already in. */
  const names = picked.map(move => move.name);
  const spare = [...analysis.relevant, ...analysis.status, ...analysis.attacking]
    .filter(move => move.name && !names.includes(move.name));
  for (const move of spare) {
    if (picked.length >= 4) break;
    picked.push(move);
  }

  return picked.slice(0, 4).map(move => move.name);
};

const buildSet = (entry, context) => {
  const analysis = analyseEntry(entry);
  const { curated, provenance } = analysis.pool;

  /* Ability: most-played first, then curated, then the first legal one. */
  const ability = entry.meta?.abilities?.[0]?.name || curated?.ability || entry.abilities[0] || "—";

  /* Item: same order. */
  const item = entry.meta?.items?.[0]?.name || curated?.item || "Leftovers";

  const shape = analysis.physical ? "physical" : analysis.special ? "special" : "mixed";
  const natureOptions = NATURE_BY_SHAPE[shape];
  const nature = curated?.nature && NATURES[curated.nature] !== undefined
    ? curated.nature
    : natureOptions[entry.stats[5] >= 100 ? 0 : 1];

  const presetKey = analysis.role === "tank"
    ? (analysis.special ? "special_tank" : "tank")
    : analysis.role === "support" || analysis.role === "pivot"
      ? "fast_support"
      : analysis.role === "sweeper"
        ? (analysis.special ? "special_sweeper" : "physical_sweeper")
        : analysis.role === "wallbreaker"
          ? (analysis.special ? "special_sweeper" : "wallbreaker")
          : analysis.bulk >= 300 ? "bulky_attacker" : "balanced";

  const evs = curated?.evs && Object.keys(curated.evs).length
    ? { ...curated.evs }
    : { ...EV_PRESETS[presetKey] };

  const moves = chooseMoves(analysis);

  /* Curated sets mark status moves with a null power. Usage data stores 0, so
     normalise here: `power === 0` means status everywhere downstream, which is
     what decides whether a move counts as coverage or as utility. */
  return {
    name: entry.name,
    slug: entry.slug,
    types: entry.types,
    role: analysis.role,
    ability,
    item,
    nature,
    evs,
    moves,
    gem: entry.gem || null,
    bst: entry.bst,
    provenance,
    why: explainPick(entry, analysis, context)
  };
};

/* ---------- Explanations, built only from facts in the data ---------- */
const ROLE_LABEL = {
  sweeper: "Attaquant rapide",
  wallbreaker: "Casse-mur",
  tank: "Tank",
  support: "Support",
  pivot: "Pivot",
  glass: "Fragile",
  balanced: "Polyvalent"
};

const explainPick = (entry, analysis, context) => {
  const parts = [];

  if (entry.meta?.usage) {
    parts.push(`${formatPercent(entry.meta.usage)} d'usage dans le format Champions${
      entry.meta.rank ? `, rang ${entry.meta.rank}` : ""}.`);
  }

  const hits = (context.priority || [])
    .map(type => analysis.threat[type])
    .filter(Boolean)
    .slice(0, 3);
  if (hits.length) {
    parts.push(`Répond en ${hits.map(hit => `${TYPE_NAMES[hit.type]} ×${hit.mult} via ${TYPE_NAMES[hit.via]}`).join(", ")}.`);
  }

  const partners = (entry.meta?.partners || []).slice(0, 2);
  if (partners.length) {
    parts.push(`Joue normalmente avec ${partners.map(p => p.name).join(" et ")}.`);
  }

  if (entry.mega) {
    parts.push(`Méga : BST ${entry.bst} avec ${entry.gem}.`);
  } else if (analysis.bulk >= 300) {
    parts.push(`${ROLE_LABEL[analysis.role]} : ${analysis.stats.hp} HP / ${analysis.stats.def} Def / ${analysis.stats.spd} SpD encaissent.`);
  } else if (analysis.stats.spe >= 110) {
    parts.push(`${ROLE_LABEL[analysis.role]} : ${analysis.stats.spe} de vitesse, il agit avant l'adversaire.`);
  } else {
    parts.push(ROLE_LABEL[analysis.role]);
  }

  if (analysis.pool.inherited) {
    parts.push("Set repris de la forme de base : cette forme n'a pas de données d'usage propres.");
  }

  return parts.join(" ");
};

const formatPercent = value => `${String(Math.round(value * 10) / 10).replace(".", ",")} %`;

/* ---------- Public API ---------- */

/* The main entry point, mirroring the shape of a generate-team request.
   `exclude` holds the signatures already shown so Regenerate cannot repeat. */
const generateTeam = options => {
  const { picks, signature, priority, style, effort, weights } = buildTeam(options || {});
  const context = { priority };
  const team = picks.map(entry => buildSet(entry, context));
  return {
    team,
    summary: summariseTeam(team, picks, priority, style, effort),
    signature,
    priority,
    style,
    effort,
    provenance: {
      usage: team.filter(slot => slot.provenance === "usage").length,
      curated: team.filter(slot => slot.provenance === "curated").length,
      base: team.filter(slot => slot.provenance === "base").length
    }
  };
};

const summariseTeam = (team, picks, priority, style, effort) => {
  const coverage = coverageOf(picks);
  const answers = answerCount(picks);
  const weakness = realWeaknesses(picks);
  const mega = picks.find(entry => entry.mega);

  const covered = priority.filter(type => (coverage[type] || 1) >= 2);
  const doubled = priority.filter(type => (answers[type] || 0) >= 2);
  const exposed = weakness.map(hole => `${TYPE_NAMES[hole.type]} ×${hole.mult} (${hole.members}/${picks.length})`);

  const lines = [];
  const styleLabel = (STYLE_LIST.find(s => s.id === style) || {}).label || "équilibrée";
  lines.push(`Équipe ${styleLabel.toLowerCase()}, recherche ${EFFORT_LEVELS[effort]?.label.toLowerCase() || "standard"} : ${team.length} Pokémon${mega ? `, une Méga (${mega.name})` : ", sans Méga"}.`);

  if (covered.length) {
    lines.push(`Couvre ${covered.length} type${covered.length > 1 ? "s" : ""} de la menace du format${
      doubled.length ? `, dont ${doubled.length} avec deux réponses` : ""} : ${covered.map(t => TYPE_NAMES[t]).join(", ")}.`);
  } else {
    lines.push("Ne couvre aucun type menacant du format : c'est le principal point faible de cette équipe.");
  }

  if (exposed.length) {
    lines.push(`Failles communes : ${exposed.join(", ")}.`);
  } else {
    lines.push("Aucune faille x2 partagée par l'ensemble de l'équipe.");
  }

  return lines.join(" ");
};

/* Swap a single slot, keeping the rest of the team as it is. */
const replaceSlot = (currentNames, slotIndex, options = {}) => {
  const { style = "balanced", effort = "standard", threat = null } = options;
  const weights = STYLE_WEIGHTS[style] || STYLE_WEIGHTS.balanced;
  const priority = priorityTypesFor(threat, effort);
  const rng = mulberry32(Math.imul((slotIndex + 1) * 7919 + 13, 2654435761));

  const kept = (currentNames || [])
    .map((name, index) => (index === slotIndex ? null : getRosterEntry(name)))
    .filter(Boolean);
  const keptNames = new Set(kept.map(entry => entry.name));
  const megaUsed = kept.some(entry => entry.mega);

  const candidates = rankCandidates(kept, priority, weights, 60, rng)
    .filter(candidate => !keptNames.has(candidate.entry.name))
    .filter(candidate => !kept.some(picked => sameLine(picked, candidate.entry)))
    .filter(candidate => !(candidate.entry.mega && megaUsed))
    .slice(0, 5);

  /* At most one Mega among the suggestions, and only when the slot being
     replaced is the one that holds the team's Mega. Offering five Megas for a
     single slot is not a choice. */
  const nonMega = candidates.filter(candidate => !candidate.entry.mega);
  const megaOption = candidates.find(candidate => candidate.entry.mega);
  const suggestions = megaOption && nonMega.length < 5
    ? [...nonMega.slice(0, 4), megaOption]
    : candidates.slice(0, 5);

  const context = { priority };
  return suggestions.map(candidate => {
    const slot = buildSet(candidate.entry, context);
    /* Say what the swap actually buys: which shared weakness it repairs, or which
     unanswered threat it starts covering. */
    const before = weaknessTally(kept);
    const after = weaknessTally([...kept, candidate.entry]);
    const beforeCoverage = coverageOf(kept);
    const afterCoverage = coverageOf([...kept, candidate.entry]);

    let gain = null;
    Object.entries(before.counts).forEach(([type, members]) => {
      if (members < WEAKNESS_SHARE) return;
      if (after.counts[type] < members) gain = `répare la faille ${TYPE_NAMES[type]}`;
    });
    if (!gain) {
      gain = (context.priority || [])
        .filter(type => (beforeCoverage[type] || 1) < 2 && (afterCoverage[type] || 1) >= 2)
        .map(type => `couvre ${TYPE_NAMES[type]}`)
        .join(", ");
    }
    if (!gain) gain = "apporte un rôle que l'équipe n'a pas encore";
    slot.why = `${gain.charAt(0).toUpperCase()}${gain.slice(1)}. ${slot.why}`;
    return slot;
  });
};

/* Read-only verdict on the player's existing team. */
const analyseCurrentTeam = team => {
  const picks = (team || [])
    .map(slot => slot && (getRosterEntry(slot.name) || ROSTER.find(entry => normKey(entry.name) === normKey(slot.name))))
    .filter(Boolean);

  if (!picks.length) return { empty: true, text: "Aucune équipe enregistrée pour l'instant." };

  const priority = priorityTypesFor(null, "standard");
  const coverage = coverageOf(picks);
  const answers = answerCount(picks);
  const weakness = realWeaknesses(picks);
  const megas = picks.filter(entry => entry.mega).length;
  const roles = {};
  picks.forEach(entry => {
    const role = analyseEntry(entry).role;
    roles[role] = (roles[role] || 0) + 1;
  });

  const lines = [];
  lines.push(`${picks.length} Pokémon sur 6${megas > 1 ? `, ${megas} Méga (la règle n'en autorise qu'une)` : ""}.`);

  const uncovered = priority.filter(type => (coverage[type] || 1) < 2);
  if (uncovered.length) {
    lines.push(`Ne répond pas à : ${uncovered.map(t => TYPE_NAMES[t]).join(", ")}.`);
  } else {
    lines.push("Répond à tous les types qui menacent le format.");
  }

  const solo = priority.filter(type => (answers[type] || 0) === 1);
  if (solo.length) lines.push(`Types couverts par un seul Pokémon : ${solo.map(t => TYPE_NAMES[t]).join(", ")} — fragile si ce membre tombe.`);

  if (weakness.length) {
    lines.push(`Failles partagées : ${weakness.map(hole =>
      `${TYPE_NAMES[hole.type]} ×${hole.mult} sur ${hole.members} Pokémon`).join(", ")}.`);
  } else {
    lines.push("Aucune faille partagée par trois Pokémon ou plus.");
  }

  const heavyRole = Object.entries(roles).find(([, count]) => count >= 3);
  if (heavyRole) {
    lines.push(`Trois Pokémon ou plus partagent le rôle « ${ROLE_LABEL[heavyRole[0]]} ».`);
  }

  const lowSynergy = [];
  for (let i = 0; i < picks.length; i++) {
    for (let j = i + 1; j < picks.length; j++) {
      if (synergyBetween(picks[i], picks[j]) < 1) lowSynergy.push([picks[i], picks[j]]);
    }
  }
  if (lowSynergy.length && lowSynergy.length >= (picks.length * (picks.length - 1)) / 2) {
    lines.push("Peu de paires apparaissent ensemble dans les données d'usage : la synergie est à vérifier.");
  }

  return {
    empty: false,
    text: lines.join(" "),
    uncovered,
    holes: weakness.map(hole => hole.type),
    roles,
    megaCount: megas
  };
};

/* Formats actually present in the usage data, for the format picker. */
const availableFormats = () => {
  const formats = new Map();
  ROSTER.forEach(entry => {
    if (entry.meta?.format) formats.set(entry.meta.format, (formats.get(entry.meta.format) || 0) + 1);
  });
  return [...formats.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ id: name, label: name, count }));
};