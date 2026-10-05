/* ============================================================================
   Shared helpers.

   escapeHtml and readTeam are needed by generator.js, ai.js and chat.js, and
   loading any two of those pages together would redeclare them. They live here
   instead, and this file is loaded once by every page that uses them.

   generator.js is itself a page controller with no DOM at module scope, so it
   can be concatenated into a plain Node bundle for testing.
   ========================================================================== */

const escapeHtml = text => String(text ?? "").replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[character]));

/* The player's saved team, in the shape script.js writes it. */
const readTeam = () => {
  try {
    const raw = JSON.parse(localStorage.getItem("pokemon-team") || "null");
    if (!Array.isArray(raw)) return [];
    const out = [...Array(6)];
    raw.forEach((entry, index) => {
      if (index < 6 && entry && typeof entry.name === "string") out[index] = entry;
    });
    return out;
  } catch { return []; }
};

/* ============================================================================
   Interface for the local strategy engine.

   Everything here is presentation and input handling. The decisions are made by
   engine.js, which works from the verified roster data; this file only collects
   the player's choices, calls it, and renders what comes back.
   ========================================================================== */

const genOutput = document.getElementById("gen-output");
const generateBtn = document.getElementById("generate");
const regenerateBtn = document.getElementById("regenerate");
const discardBtn = document.getElementById("discard");
const styleList = document.getElementById("style-list");
const effortList = document.getElementById("effort-list");
const effortNote = document.getElementById("effort-note");
const threatInput = document.getElementById("threat-input");
const threatStatus = document.getElementById("threat-status");
const threatOptions = document.getElementById("threat-options");
const requiredInput = document.getElementById("required-input");
const requiredStatus = document.getElementById("required-status");
const kbNote = document.getElementById("kb-note");

let currentStyle = "balanced";
let currentEffort = "standard";
let shownSignatures = [];
let currentTeam = null;
let seedCounter = 0;

/* ---------- Options ---------- */
const renderStyles = () => {
  styleList.innerHTML = STYLE_LIST.map(style => `
    <button type="button" class="opt ${style.id === currentStyle ? "is-active" : ""}"
      data-style="${style.id}" title="${escapeHtml(style.blurb)}">
      <b>${escapeHtml(style.label)}</b>
      <small>${escapeHtml(style.blurb)}</small>
    </button>`).join("");
};

const renderEffort = () => {
  effortList.innerHTML = Object.entries(EFFORT_LEVELS).map(([id, level]) => `
    <button type="button" class="opt is-inline ${id === currentEffort ? "is-active" : ""}" data-effort="${id}">
      <b>${escapeHtml(level.label)}</b>
      <small>${escapeHtml(level.blurb)}</small>
    </button>`).join("");
  effortNote.textContent = `${EFFORT_LEVELS[currentEffort].blurb}. Le niveau change la largeur de la recherche, pas les règles.`;
};

const renderThreatOptions = () => {
  const types = FORMAT_THREATS.slice(0, 8).map(type => `<option value="${TYPE_NAMES[type]}">`);
  const meta = ROSTER.filter(entry => entry.meta?.usage)
    .sort((a, b) => b.meta.usage - a.meta.usage)
    .slice(0, 10)
    .map(entry => `<option value="${escapeHtml(entry.name)}">`);
  threatOptions.innerHTML = types.join("") + meta.join("");
};

const renderKbNote = () => {
  const withUsage = ROSTER.filter(entry => entry.meta?.usage).length;
  const megas = ROSTER.filter(entry => entry.mega).length;
  const moves = Object.keys(typeof MOVE_DATA === "object" ? MOVE_DATA : {}).length;
  const formats = availableFormats();
  kbNote.innerHTML = `
    <b>${ROSTER.length}</b> Pokémon dont <b>${megas}</b> Méga ·
    <b>${withUsage}</b> avec de vraies données d'usage ·
    <b>${moves}</b> coups typés et chiffrés.
    ${formats.length ? `<br>Format couvert : ${escapeHtml(formats[0].label)} (${formats[0].count} Pokémon mesurés).` : ""}
    <br>Source : données d'usage du format Champions.`;
};

/* ---------- Reading the form ---------- */
const parseNames = raw => String(raw || "")
  .split(/[,;]/)
  .map(value => value.trim())
  .filter(Boolean);

const readRequired = () => {
  const wanted = parseNames(requiredInput.value);
  if (!wanted.length) { requiredStatus.textContent = ""; return []; }
  const resolved = [];
  const unknown = [];
  wanted.forEach(name => {
    if (getRosterEntry(name)) resolved.push(getRosterEntry(name));
    else unknown.push(name);
  });
  requiredStatus.textContent = unknown.length
    ? `Ignoré, inconnu du site : ${unknown.join(", ")}.`
    : `${resolved.length} Pokémon imposé${resolved.length > 1 ? "s" : ""}.`;
  requiredStatus.classList.toggle("is-warn", unknown.length > 0);
  return resolved;
};

const readThreat = () => {
  const raw = threatInput.value.trim();
  if (!raw) { threatStatus.textContent = ""; return null; }
  const entry = getRosterEntry(raw);
  const isType = !!TYPE_NAMES[raw.toLowerCase()];
  if (entry) {
    threatStatus.textContent = `Menace : ${entry.name} [${entry.types.map(t => TYPE_NAMES[t]).join(" / ")}].`;
    threatStatus.classList.remove("is-warn");
    return entry.name;
  }
  if (isType) {
    threatStatus.textContent = `Menace : type ${TYPE_NAMES[raw.toLowerCase()]}.`;
    threatStatus.classList.remove("is-warn");
    return raw.toLowerCase();
  }
  threatStatus.textContent = `« ${raw} » n'est pas dans le site, menace ignorée.`;
  threatStatus.classList.add("is-warn");
  return null;
};

/* ---------- Rendering a generated team ---------- */
const typePills = types => types
  .map(type => `<li class="type ${type}">${TYPE_NAMES[type] || type}</li>`)
  .join("");

const moveRow = name => {
  const type = championMoveType(name);
  const colour = TYPE_COLOURS[type] || "var(--accent)";
  const power = championMovePower(name);
  return `<li class="ai-move" style="--move-colour:${colour}">
      <span>${escapeHtml(name)}</span>
      ${power ? `<b>${power}</b>` : "<b class='is-status'>—</b>"}
    </li>`;
};

const evBars = evs => STAT_ORDER
  .filter(key => Number(evs[key]) > 0)
  .map(key => `<div class="ev-row">
      <span>${STAT_LABELS[key]}</span><b>${evs[key]}</b>
      <i style="--v:${evPercent(evs[key])}%"></i>
    </div>`)
  .join("");

const PROVENANCE_NOTE = {
  usage: "Set issu des données d'usage réelles du format.",
  curated: "Set curaté pour ce Pokémon.",
  base: "Set repris de la forme de base : cette forme n'a pas de données d'usage propres."
};

const slotCard = (slot, index) => `
  <article class="gen-card">
    <header>
      <img src="${spriteFor(slot.name)}" alt="" loading="lazy">
      <div class="gen-card-id">
        <h3>${escapeHtml(slot.name)}</h3>
        <ul class="ai-types">${typePills(slot.types)}</ul>
      </div>
      <div class="gen-card-tags">
        <span class="ai-slot">Slot ${index + 1}</span>
        <span class="gen-role">${escapeHtml(ROLE_LABEL[slot.role] || slot.role)}</span>
        ${slot.gem ? `<span class="gen-gem">${escapeHtml(slot.gem)}</span>` : ""}
      </div>
    </header>
    <ul class="ai-moves">${slot.moves.map(moveRow).join("")}</ul>
    <dl class="ai-meta">
      <div><dt>Talent</dt><dd>${escapeHtml(slot.ability)}</dd></div>
      <div><dt>Objet</dt><dd>${escapeHtml(slot.item)}</dd></div>
      <div><dt>Nature</dt><dd>${escapeHtml(slot.nature)}</dd></div>
    </dl>
    <div class="ai-evs">
      <h4>EVs <small>${evTotal(slot.evs)}/510</small></h4>
      ${evBars(slot.evs)}
    </div>
    <p class="ai-why">${escapeHtml(slot.why)}</p>
    <p class="gen-source">${escapeHtml(PROVENANCE_NOTE[slot.provenance] || "")}</p>
  </article>`;

const renderTeam = result => {
  const counts = result.provenance;
  const bits = [];
  if (counts.usage) bits.push(`${counts.usage} set(s) sur données d'usage réelles`);
  if (counts.curated) bits.push(`${counts.curated} set(s) curaté(s)`);
  if (counts.base) bits.push(`${counts.base} set(s) hérité(s) de la forme de base`);

  genOutput.innerHTML = `
    <div class="gen-summary">
      <h2>Équipe ${escapeHtml((STYLE_LIST.find(s => s.id === result.style) || {}).label || "")}</h2>
      <p>${escapeHtml(result.summary)}</p>
      <ul class="gen-priority">
        ${result.priority.map(type =>
          `<li class="type ${type}">${TYPE_NAMES[type] || type}</li>`).join("")}
      </ul>
      <p class="gen-source">Menaces visées : ${result.priority.map(t => TYPE_NAMES[t] || t).join(", ")}. ${escapeHtml(bits.join(" · "))}.</p>
    </div>
    <div class="gen-cards">${result.team.map(slotCard).join("")}</div>
    <div class="proposal-bar">
      <span>${result.team.length} Pokémon proposé${result.team.length > 1 ? "s" : ""}</span>
      <button type="button" class="proposal-apply">Charger cette équipe</button>
    </div>`;

  genOutput.querySelector(".proposal-apply").addEventListener("click", event => {
    const count = applyTeam(result.team);
    const btn = event.currentTarget;
    btn.textContent = `${count} Pokémon chargé${count > 1 ? "s" : ""} ✓`;
    btn.classList.add("is-done");
    refreshTeamPanel();
  });

  regenerateBtn.disabled = false;
  discardBtn.disabled = false;
};

/* ---------- Generating ---------- */
const run = ({ fresh }) => {
  if (fresh) { shownSignatures = []; seedCounter = 0; }

  const threat = readThreat();
  const required = readRequired();

  generateBtn.disabled = true;
  regenerateBtn.disabled = true;
  const label = generateBtn.querySelector(".gen-label");
  const original = label.textContent;
  label.textContent = "Recherche en cours…";

  /* Yield once so the button state paints before the beam search blocks. */
  requestAnimationFrame(() => setTimeout(() => {
    try {
      seedCounter += 1;
      const result = generateTeam({
        style: currentStyle,
        effort: currentEffort,
        threat,
        required: required.map(entry => entry.name),
        seed: seedCounter,
        exclude: shownSignatures
      });
      shownSignatures.push(result.signature);
      currentTeam = result;
      renderTeam(result);
    } catch (error) {
      genOutput.innerHTML = `<div class="gen-empty"><h2>Erreur</h2><p>${escapeHtml(error.message || String(error))}</p></div>`;
    } finally {
      label.textContent = original;
      generateBtn.disabled = false;
      regenerateBtn.disabled = false;
    }
  }, 0));
};

generateBtn.addEventListener("click", () => run({ fresh: true }));
regenerateBtn.addEventListener("click", () => run({ fresh: false }));
discardBtn.addEventListener("click", () => {
  genOutput.innerHTML = `<div class="gen-empty">
      <h2>Aucune équipe générée</h2>
      <p>Choisis un style, un effort de recherche, puis lance la génération.</p>
    </div>`;
  currentTeam = null;
  shownSignatures = [];
  seedCounter = 0;
  regenerateBtn.disabled = true;
  discardBtn.disabled = true;
});

styleList.addEventListener("click", event => {
  const btn = event.target.closest("[data-style]");
  if (!btn) return;
  currentStyle = btn.dataset.style;
  renderStyles();
});

effortList.addEventListener("click", event => {
  const btn = event.target.closest("[data-effort]");
  if (!btn) return;
  currentEffort = btn.dataset.effort;
  renderEffort();
});

threatInput.addEventListener("input", readThreat);
requiredInput.addEventListener("input", readRequired);

/* ---------- Team analysis and slot replacement ---------- */
const slotSelect = document.getElementById("slot-select");
const teamStatus = document.getElementById("team-status");
const teamVerdict = document.getElementById("team-verdict");
const swapOutput = document.getElementById("swap-output");

const refreshTeamPanel = () => {
  const team = readTeam().filter(slot => slot && slot.name);
  teamStatus.textContent = team.length
    ? `${team.length} Pokémon enregistré${team.length > 1 ? "s" : ""}.`
    : "Aucune équipe enregistrée. Va sur la page Équipe pour en créer une.";

  slotSelect.innerHTML = (team.length ? team : []).map((slot, index) =>
    `<option value="${index}">${index + 1}. ${escapeHtml(slot.name)}</option>`).join("")
    || `<option value="">—</option>`;

  if (currentTeam) teamVerdict.innerHTML = "";
};

document.getElementById("analyse-team")?.addEventListener("click", () => {
  const team = readTeam().filter(slot => slot && slot.name);
  const verdict = analyseCurrentTeam(team);
  if (verdict.empty) {
    teamVerdict.innerHTML = `<p class="verdict-note">${escapeHtml(verdict.text)}</p>`;
    return;
  }
  const marks = [
    verdict.uncovered.length
      ? `<li class="is-bad">Ne répond pas à : ${verdict.uncovered.map(t => TYPE_NAMES[t] || t).join(", ")}.</li>`
      : `<li class="is-good">Répond à tous les types qui menacent le format.</li>`,
    verdict.holes.length
      ? `<li class="is-bad">Failles partagées : ${verdict.holes.map(t => TYPE_NAMES[t] || t).join(", ")}.</li>`
      : `<li class="is-good">Aucune faille partagée par trois Pokémon ou plus.</li>`,
    verdict.megaCount > 1
      ? `<li class="is-bad">${verdict.megaCount} Méga : la règle n'en autorise qu'une.</li>`
      : `<li class="is-good">${verdict.megaCount === 1 ? "Une Méga, comme la règle l'impose." : "Aucune Méga, ce qui est permis."}</li>`
  ];
  teamVerdict.innerHTML = `<ul class="verdict-list">${marks.join("")}</ul>`;
});

document.getElementById("suggest-swap")?.addEventListener("click", () => {
  const team = readTeam().filter(slot => slot && slot.name);
  if (!team.length) {
    swapOutput.innerHTML = `<p class="verdict-note">Aucune équipe enregistrée : rien à remplacer.</p>`;
    return;
  }
  const slotIndex = Number(slotSelect.value);
  if (!Number.isFinite(slotIndex)) {
    swapOutput.innerHTML = `<p class="verdict-note">Choisis d'abord un slot.</p>`;
    return;
  }

  const options = replaceSlot(team.map(slot => slot.name), slotIndex, {
    style: currentStyle,
    effort: currentEffort
  });

  if (!options.length) {
    swapOutput.innerHTML = `<p class="verdict-note">Aucun remplaçant trouvé qui respecte les règles.</p>`;
    return;
  }

  swapOutput.innerHTML = `<div class="swap-list">${options.map((slot, i) => `
      <div class="swap-item">
        <img src="${spriteFor(slot.name)}" alt="" loading="lazy">
        <div>
          <b>${escapeHtml(slot.name)}</b>
          <ul class="ai-types">${typePills(slot.types)}</ul>
          <small>${slot.moves.map(escapeHtml).join(", ")}</small>
          <small>${escapeHtml(slot.ability)} · ${escapeHtml(slot.item)} · ${escapeHtml(slot.nature)}</small>
          <p class="ai-why">${escapeHtml(slot.why)}</p>
        </div>
        ${i === 0 ? `<button type="button" class="proposal-apply is-small" data-swap="${escapeHtml(slot.name)}">Charger</button>` : ""}
      </div>`).join("")}</div>`;

  swapOutput.querySelector("[data-swap]")?.addEventListener("click", event => {
    const name = event.currentTarget.dataset.swap;
    const full = readTeam();
    const index = Number(event.currentTarget.closest(".swap-item") ? slotSelect.value : 0);
    const proposal = options.find(slot => slot.name === name);
    if (!proposal) return;
    full[index] = { ...full[index], ...proposalToTeamSlot(proposal) };
    writeTeam(full);
    event.currentTarget.textContent = "Chargé ✓";
    event.currentTarget.classList.add("is-done");
    refreshTeamPanel();
  });
});

/* ---------- Boot ---------- */
const bootGenerator = () => {
  const count = document.getElementById("roster-count");
  if (count) count.textContent = ROSTER.length;
  renderStyles();
  renderEffort();
  renderThreatOptions();
  renderKbNote();
  refreshTeamPanel();
};

bootGenerator();