/* Chat interface for the assistant. */

const log = document.getElementById("chat-log");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-text");
const sendBtn = document.getElementById("chat-send");
const stopBtn = document.getElementById("chat-stop");
const keyInput = document.getElementById("key-input");
const keyStatus = document.getElementById("key-status");
const suggestRow = document.getElementById("chat-suggest-row");

let controller = null;
let busy = false;

/* ---------- Rendering helpers ---------- */
/* escapeHtml and readTeam come from generator.js, loaded before this file. */

/* Minimal markdown: bold, italic, inline code, bullet lists, headings. */
const renderProse = text => {
  const lines = String(text).split("\n");
  let html = "";
  let inList = false;
  const inline = line => escapeHtml(line)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");

  for (const raw of lines) {
    const line = raw.trimEnd();
    const bullet = /^[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inline(bullet[1])}</li>`;
      continue;
    }
    if (inList) { html += "</ul>"; inList = false; }
    if (!line.trim()) { continue; }
    const head = /^(#{1,3})\s+(.*)$/.exec(line);
    if (head) { html += `<h3 class="prose-head">${inline(head[2])}</h3>`; continue; }
    html += `<p>${inline(line)}</p>`;
  }
  if (inList) html += "</ul>";
  return html || "<p class=\"prose-empty\">…</p>";
};

const proposalMarkup = (proposal, index) => {
  const entry = getRosterEntry(proposal.name);
  const types = (entry?.types || []).map(t => `<li class="type ${t}">${TYPE_NAMES[t] || t}</li>`).join("");
  const moves = (proposal.moves || []).map(name => {
    const colour = TYPE_COLOURS[moveTypeOf(name)] || "var(--accent)";
    return `<li class="ai-move" style="--move-colour:${colour}"><span>${escapeHtml(name)}</span></li>`;
  }).join("");
  const evs = proposal.evs || {};
  const evTotal = Object.values(evs).reduce((sum, v) => sum + (Number(v) || 0), 0);
  const evRows = STAT_NAMES.map((label, i) => {
    const key = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"][i];
    const value = Number(evs[key]) || 0;
    if (!value) return "";
    return `<li><span>${label}</span><b>${value}</b><i style="--v:${Math.min(100, Math.round(value / 252 * 100))}%"></i></li>`;
  }).join("");

  return `<article class="ai-proposal">
    <header>
      <img src="images/gifs/${entry?.slug || "raichu"}.gif" alt="">
      <div>
        <h3>${escapeHtml(proposal.name)}</h3>
        <ul class="ai-types">${types}</ul>
      </div>
      <span class="ai-slot">Slot ${index + 1}</span>
    </header>
    <ul class="ai-moves">${moves}</ul>
    <dl class="ai-meta">
      <div><dt>Ability</dt><dd>${escapeHtml(proposal.ability || "—")}</dd></div>
      <div><dt>Item</dt><dd>${escapeHtml(proposal.item || "—")}</dd></div>
      <div><dt>Nature</dt><dd>${escapeHtml(proposal.nature || "—")}</dd></div>
    </dl>
    ${evRows ? `<div class="ai-evs"><h4>EVs <small>${evTotal}/510</small></h4><ul>${evRows}</ul></div>` : ""}
    ${proposal.why ? `<p class="ai-why">${escapeHtml(proposal.why)}</p>` : ""}
  </article>`;
};

const addMessage = (role, { prose, team, error } = {}) => {
  const row = document.createElement("div");
  row.className = `msg msg-${role}`;
  const body = document.createElement("div");
  body.className = "msg-body";

  if (error) {
    body.innerHTML = `<p class="msg-error">${escapeHtml(error)}</p>`;
  } else {
    body.innerHTML = renderProse(prose || "");
    if (team?.length) {
      const wrap = document.createElement("div");
      wrap.className = "proposal-block";
      wrap.innerHTML = team.map((p, i) => proposalMarkup(p, i)).join("");
      const bar = document.createElement("div");
      bar.className = "proposal-bar";
      bar.innerHTML = `<span>${team.length} Pokémon proposé${team.length > 1 ? "s" : ""}</span>
        <button type="button" class="proposal-apply">Charger cette équipe</button>`;
      bar.querySelector(".proposal-apply").addEventListener("click", event => {
        const count = applyTeam(team);
        const btn = event.currentTarget;
        btn.textContent = `${count} Pokémon chargé${count > 1 ? "s" : ""} ✓`;
        btn.classList.add("is-done");
      });
      body.append(bar, wrap);
    }
  }
  row.append(body);
  log.append(row);
  log.scrollTop = log.scrollHeight;
  return body;
};

/* ---------- Key panel ---------- */
const refreshKeyStatus = () => {
  const key = getKey();
  const ok = keyLooksValid(key);
  keyStatus.textContent = ok ? "Clé enregistrée sur cet appareil." : "Aucune clé : mode local uniquement.";
  keyStatus.classList.toggle("is-ok", ok);
  keyInput.value = ok ? "" : key;
  keyInput.placeholder = ok ? "••••••••••••••••" : "sk-ant-...";
};

document.getElementById("key-save")?.addEventListener("click", () => {
  const value = keyInput.value.trim();
  if (!value) { keyStatus.textContent = "Colle une clé avant d'enregistrer."; keyStatus.classList.remove("is-ok"); return; }
  if (!keyLooksValid(value)) { keyStatus.textContent = "Cette clé ne ressemble pas à une clé Anthropic (sk-ant-…)."; keyStatus.classList.remove("is-ok"); return; }
  setKey(value);
  refreshKeyStatus();
  say("Clé enregistrée. Tu peux maintenant poser ta question.", "system");
});

document.getElementById("key-clear")?.addEventListener("click", () => { setKey(""); refreshKeyStatus(); });

/* ---------- Suggestions ---------- */
const runPrompt = text => { input.value = ""; input.style.height = "auto"; submit(text); };
document.getElementById("suggestions")?.addEventListener("click", event => {
  const btn = event.target.closest("button[data-q]");
  if (btn) runPrompt(btn.dataset.q);
});

/* ---------- Greeting ---------- */
const say = (text, role = "assistant") => addMessage(role, { prose: text });

const boot = () => {
  const withUsage = ROSTER.filter(e => e.meta?.usage).length;

  say(`Coach en ligne. Le générateur d'équipe ci-dessus n'a besoin d'aucune clé : il travaille directement sur ${ROSTER.length} Pokémon et ${withUsage} mesures d'usage réelles du format Champions.\n\nCette partie conversationnelle, elle, a besoin d'une clé Anthropic. Sans clé, utilise le générateur.`);
  say(`Pour l'instant je n'ai pas de clé enregistrée, donc je ne peux pas encore répondre. Colle-la dans le panneau ci-dessus.`, "system");

  const history = readHistory();
  if (history.length) {
    history.slice(-6).forEach(m => addMessage(m.role, { prose: m.text }));
    say("— conversation restaurée —", "system");
  }
  refreshKeyStatus();
  updateSuggestRow();
};

const updateSuggestRow = () => {
  const ideas = [
    "Montre-moi la couverture de types de mon équipe actuelle.",
    "Quel Pokémon sprawle mon manque de vitesse ?",
    "Construis une équipe anti-Fairies.",
    "Trois sets pour un team Dragon / Ground."
  ];
  suggestRow.innerHTML = ideas.map(q => `<button type="button" data-q="${escapeHtml(q)}">${escapeHtml(q)}</button>`).join("");
};

suggestRow.addEventListener("click", event => {
  const btn = event.target.closest("button[data-q]");
  if (btn && !busy) runPrompt(btn.dataset.q);
});

/* ---------- Send ---------- */
const submit = async text => {
  const question = String(text || "").trim();
  if (!question || busy) return;

  const key = getKey();
  if (!keyLooksValid(key)) {
    addMessage("user", { prose: question });
    /* The engine needs no key, so answer with a real generated team rather than
       an apology. Only the conversational reasoning is unavailable. */
    const local = generateTeam({ style: "balanced", effort: "quick", seed: Date.now() % 1000 });
    addMessage("assistant", {
      prose: `Je n'ai pas de clé Anthropic, donc pas de raisonnement écrit. Mais le moteur local, lui, n'en a pas besoin : voici une équipe construite sur les données réelles du format Champions.\n\n${local.summary}\n\nColle une clé dans le panneau du dessus si tu veux que je détaille le pourquoi de chaque choix.`,
      team: local.team
    });
    writeHistory([...readHistory(), { role: "user", text: question }]);
    return;
  }

  busy = true;
  sendBtn.classList.add("is-hidden");
  stopBtn.classList.remove("is-hidden");

  addMessage("user", { prose: question });

  const history = readHistory();
  const messages = [...history, { role: "user", content: question }]
    .slice(-16)
    .map(m => ({ role: m.role, content: m.text }));

  const body = addMessage("assistant", { prose: "…" });

  try {
    controller = new AbortController();
    const team = readTeam();
    const system = buildSystemPrompt({ team, text: question });

    let streamed = "";
    const final = await callModel({
      system,
      messages,
      signal: controller.signal,
      onDelta: (full, hasBlock) => {
        streamed = full;
        const shown = hasBlock ? full.slice(0, full.lastIndexOf("```team")) : full;
        body.innerHTML = renderProse(shown);
        log.scrollTop = log.scrollHeight;
      }
    });

    const { prose, team: parsed } = parseTeamBlock(final);
    body.innerHTML = renderProse(prose);
    if (parsed?.length) {
      const wrap = document.createElement("div");
      wrap.className = "proposal-block";
      wrap.innerHTML = parsed.map((p, i) => proposalMarkup(p, i)).join("");
      const bar = document.createElement("div");
      bar.className = "proposal-bar";
      bar.innerHTML = `<span>${parsed.length} Pokémon proposé${parsed.length > 1 ? "s" : ""}</span>
        <button type="button" class="proposal-apply">Charger cette équipe</button>`;
      bar.querySelector(".proposal-apply").addEventListener("click", event => {
        const count = applyTeam(parsed);
        const btn = event.currentTarget;
        btn.textContent = `${count} Pokémon chargé${count > 1 ? "s" : ""} ✓`;
        btn.classList.add("is-done");
      });
      body.append(bar, wrap);
    }
    writeHistory([...history, { role: "user", text: question }, { role: "assistant", text: final }]);
  } catch (error) {
    if (error.name === "AbortError") {
      body.innerHTML = renderProse(streamed || "Arrêté.");
    } else {
      body.innerHTML = `<p class="msg-error">${escapeHtml(error.message || "Erreur inconnue")}</p>`;
    }
  } finally {
    busy = false;
    controller = null;
    sendBtn.classList.remove("is-hidden");
    stopBtn.classList.add("is-hidden");
    log.scrollTop = log.scrollHeight;
  }
};

form.addEventListener("submit", event => { event.preventDefault(); runPrompt(input.value); });
stopBtn.addEventListener("click", () => controller?.abort());

input.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); runPrompt(input.value); }
});
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(160, input.scrollHeight) + "px";
});

document.getElementById("chat-reset")?.addEventListener("click", () => {
  writeHistory([]);
  log.innerHTML = "";
  boot();
});

boot();