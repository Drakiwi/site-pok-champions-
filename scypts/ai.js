/* ============================================================================
   Assistant de stratégie — Pokémon Champions.

   Talks to the Anthropic Messages API straight from the browser using the
   official direct-browser-access header. GitHub Pages is static hosting, so
   there is no server to hide a key behind: the key is entered by the player,
   kept in their own localStorage and never sent anywhere except Anthropic.

   The model is grounded on roster.js (real Champions stats, types, abilities,
   mega stones and live usage numbers) plus grounding.js (precomputed type
   maths), so it proposes legal sets instead of inventing moves.
   ========================================================================== */

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-5";
const KEY_STORAGE = "pokemon-ai-key";
const CHAT_STORAGE = "pokemon-ai-chat";

const MAX_TOKENS = 4000;

/* ---------- Key handling ---------- */
const getKey = () => { try { return localStorage.getItem(KEY_STORAGE) || ""; } catch { return ""; } };
const setKey = value => {
  try {
    if (value) localStorage.setItem(KEY_STORAGE, value);
    else localStorage.removeItem(KEY_STORAGE);
  } catch {}
};
const keyLooksValid = key => /^sk-ant-[A-Za-z0-9_-]{20,}$/.test(key.trim());

/* ---------- System prompt ---------- */
const SYSTEM_PROMPT = `You are the strategy coach for a Pokémon Champions team builder.

You are given a VERIFIED DATABASE of every legal Pokémon: real base stats, types, abilities, the mega stone each Mega form requires, and live Champions usage numbers (which moves, items and abilities players actually run, and which Pokémon they are teamed with). Treat that database as ground truth.

HARD RULES
- A team is exactly 6 slots and may contain AT MOST ONE Mega.
- Only Pokémon present in the database may be used. Never invent a Pokémon.
- Only use moves that appear in that Pokémon's "moves used" or "legal moves" list. If you want a move that is not listed, say so instead of inventing it.
- Only use abilities and items that are listed for that Pokémon.
- EV spreads must total at most 510, and no single stat may exceed 252.
- A Mega form has a BST roughly 100 points above its base form, redistributed across its stats. Both versions are listed separately in the database: use the exact numbers given for that entry, never the base form's numbers for a Mega.

HOW TO REASON
1. Work out what the user actually needs: a full team, a set for one Pokémon, a counter to a threat, an analysis of their current team, or a fix for a weakness.
2. For teams: decide which threats must be covered first, then fill roles so coverage overlaps instead of stacking. A good 6 rarely needs six attackers — it needs a way in, a way to stay in, and a win condition.
3. Prefer Pokémon whose listed usage partners already fit the team you are building; that is how real teams are put together.
4. Every factual number you need is already computed for you in the brief. Never do arithmetic yourself and never state a type multiplier that is not in the brief — quote the brief.
5. If the user's request is ambiguous, make a reasonable competitive choice and say what you assumed. Do not stall.

OUTPUT FORMAT
Write your reasoning and advice in plain prose, in the language the user used.

When you propose concrete Pokémon, you MUST also emit a machine-readable block so the site can render it and load it into the team. Put it at the very end, after the prose:

\`\`\`team
{ "team": [ { "name": "Exact Pokemon Name", "ability": "...", "item": "...", "nature": "...", "evs": { "attack": 252, "special-defense": 4, "speed": 252 }, "moves": ["Move", "Move", "Move", "Move"], "why": "one short sentence" } ] }
\`\`\`

Rules for that block:
- \`name\` must match the database exactly.
- 1 to 6 entries. Never two Megas.
- \`evs\` uses only hp, attack, defense, special-attack, special-defense, speed and totals at most 510.
- If you are only answering a question and not proposing Pokémon, omit the block entirely.
- Explain the reasoning in the prose BEFORE the block, never inside it.`;

/* readTeam and escapeHtml come from generator.js, which is loaded first. */

const focusFromText = text => {
  const lower = String(text || "").toLowerCase();
  const hit = ROSTER
    .filter(entry => lower.includes(entry.name.toLowerCase()))
    .sort((a, b) => b.name.length - a.name.length)[0];
  if (hit) return hit.name;
  return null;
};

const buildSystemPrompt = ({ team, text }) => {
  const brief = buildBrief({ team, focus: focusFromText(text), legalMoves: legalMoveIndex() });
  return `${SYSTEM_PROMPT}\n\n===== DATABASE =====\n${brief}\n\n===== END DATABASE =====`;
};

/* Legal moves per Pokémon, filled in progressively from the API as the user
   explores. Keeping it optional means the assistant still works offline. */
const LEGAL_MOVE_KEY = "pokemon-legal-moves";
let legalMoveIndex = () => {
  try { return JSON.parse(localStorage.getItem(LEGAL_MOVE_KEY) || "{}"); } catch { return {}; }
};

const ensureLegalMoves = async slug => {
  const store = legalMoveIndex();
  if (store[slug]) return store[slug];
  const entry = getRosterEntry(slug);
  if (!entry) return [];
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
    if (!res.ok) return [];
    const data = await res.json();
    const names = data.moves.map(m => m.move.name).map(prettySlug).sort();
    store[slug] = names;
    try { localStorage.setItem(LEGAL_MOVE_KEY, JSON.stringify(store)); } catch {}
    return names;
  } catch { return []; }
};

const prettySlug = slug => slug.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");

/* ---------- Chat history ---------- */
const readHistory = () => {
  try { return JSON.parse(localStorage.getItem(CHAT_STORAGE) || "[]"); } catch { return []; }
};
const writeHistory = list => {
  try { localStorage.setItem(CHAT_STORAGE, JSON.stringify(list.slice(-24))); } catch {}
};

/* ---------- API call with streaming ---------- */
const callModel = async ({ system, messages, signal, onDelta }) => {
  const key = getKey();
  if (!keyLooksValid(key)) throw new Error("missing-key");

  const response = await fetch(API_URL, {
    method: "POST",
    signal,
    headers: {
      "content-type": "application/json",
      "x-api-key": key.trim(),
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages,
      stream: true
    })
  });

  if (!response.ok) {
    let detail = "";
    try { detail = (await response.json())?.error?.message || ""; } catch {}
    if (response.status === 401) throw new Error("401 — clé refusée, vérifie qu'elle est valide.");
    if (response.status === 429) throw new Error("429 — trop de requêtes, attends un instant.");
    if (response.status === 400) throw new Error(`400 — requête refusée. ${detail}`.trim());
    throw new Error(`${response.status}${detail ? " — " + detail : ""}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";
  let blockStart = -1;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      let event;
      try { event = JSON.parse(payload); } catch { continue; }
      if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
        const piece = event.delta.text || "";
        full += piece;
        blockStart = full.lastIndexOf("```team");
        onDelta?.(full, blockStart !== -1);
      }
    }
  }
  return full;
};

/* ---------- Parse the ```team block ---------- */
const parseTeamBlock = text => {
  const match = /```team\s*([\s\S]*?)```/.exec(text || "");
  if (!match) return { prose: (text || "").trim(), team: null };
  const prose = (text.slice(0, match.index) || "").trim();
  let team = null;
  try {
    const parsed = JSON.parse(match[1]);
    if (Array.isArray(parsed.team)) team = parsed.team.filter(e => e && getRosterEntry(e.name));
  } catch {}
  return { prose, team };
};

/* ---------- Team storage ---------- */
const writeTeam = list => {
  const normalised = [...Array(6)];
  (list || []).slice(0, 6).forEach((slot, index) => {
    if (slot && slot.name) normalised[index] = slot;
  });
  try { localStorage.setItem("pokemon-team", JSON.stringify(normalised)); } catch {}
};

/* Convert an engine slot into the shape script.js reads. */
/* Turns a display move name into the slug key script.js and Showdown use. */
const moveSlug = name => String(name)
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const proposalToTeamSlot = proposal => {
  const entry = getRosterEntry(proposal.name);
  return {
    name: proposal.name,
    item: `@ ${(entry && entry.gem) || proposal.item || "No item"}`,
    image: spriteFor(entry ? entry.name : ""),
    accent: TYPE_COLOURS[(entry && entry.types[0]) || ""] || "#8b7fff",
    types: (entry && entry.types) || [],
    moves: (proposal.moves || []).slice(0, 4).map(name => ({
      name: moveSlug(name),
      power: championMovePower(name),
      type: championMoveType(name)
    })),
    ability: proposal.ability || (entry && entry.abilities[0]) || "—",
    nature: proposal.nature && NATURES[proposal.nature] !== undefined ? proposal.nature : "Hardy",
    evs: {
      hp: 0, attack: 0, defense: 0, "special-attack": 0, "special-defense": 0, speed: 0,
      ...(proposal.evs || {})
    }
  };
};

const applyTeam = entries => {
  const list = [...Array(6)];
  let megaUsed = false;
  let slot = 0;

  for (const proposal of (entries || []).slice(0, 6)) {
    let entry = getRosterEntry(proposal?.name);
    if (!entry) continue;

    /* Hard rule: one Mega per team. A second Mega is downgraded to its base
       form instead of silently breaking the rule. */
    if (entry.mega) {
      if (megaUsed) entry = getRosterEntry(entry.mega);
      else megaUsed = true;
    }
    if (!entry) continue;
    if (list.some(occupied => occupied && occupied.name === entry.name)) continue;
    if (slot >= 6) break;

    list[slot++] = proposalToTeamSlot(proposal);
  }

  writeTeam(list);
  return list.filter(Boolean).length;
};