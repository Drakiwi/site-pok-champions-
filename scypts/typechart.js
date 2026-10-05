/* Type chart, natures and competitive items.
   Kept separate from roster.js so regenerating the roster never overwrites it. */

const TYPE_CHART = {
  normal:   { rock: .5, ghost: 0, steel: .5 },
  fire:     { fire: .5, water: .5, grass: 2, ice: 2, bug: 2, rock: .5, dragon: .5, steel: 2 },
  water:    { fire: 2, water: .5, grass: .5, ground: 2, rock: 2, dragon: .5 },
  electric: { water: 2, electric: .5, grass: .5, ground: 0, flying: 2, dragon: .5 },
  grass:    { fire: .5, water: 2, grass: .5, poison: .5, ground: 2, flying: .5, bug: .5, rock: 2, dragon: .5, steel: .5 },
  ice:      { fire: .5, water: .5, grass: 2, ice: .5, ground: 2, flying: 2, dragon: 2, steel: .5 },
  fighting: { normal: 2, ice: 2, poison: .5, flying: .5, psychic: .5, bug: .5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: .5 },
  poison:   { grass: 2, poison: .5, ground: .5, rock: .5, ghost: .5, steel: 0, fairy: 2 },
  ground:   { fire: 2, electric: 2, grass: .5, poison: 2, flying: 0, bug: .5, rock: 2, steel: 2 },
  flying:   { electric: .5, grass: 2, fighting: 2, bug: 2, rock: .5, steel: .5 },
  psychic:  { fighting: 2, poison: 2, psychic: .5, dark: 0, steel: .5 },
  bug:      { fire: .5, grass: 2, fighting: .5, poison: .5, flying: .5, psychic: 2, ghost: .5, dark: 2, steel: .5, fairy: .5 },
  rock:     { fire: 2, ice: 2, fighting: .5, ground: .5, flying: 2, bug: 2, steel: .5 },
  ghost:    { normal: 0, psychic: 2, ghost: 2, dark: .5 },
  dragon:   { dragon: 2, steel: .5, fairy: 0 },
  dark:     { fighting: .5, psychic: 2, ghost: 2, dark: 2, fairy: .5 },
  steel:    { fire: .5, water: .5, electric: .5, ice: 2, rock: 2, steel: .5, fairy: 2 },
  fairy:    { fire: .5, fighting: 2, poison: .5, dragon: 2, dark: 2, steel: .5 }
};

const TYPE_NAMES = {
  normal: "Normal", fire: "Fire", water: "Water", electric: "Electric", grass: "Grass", ice: "Ice",
  fighting: "Fighting", poison: "Poison", ground: "Ground", flying: "Flying", psychic: "Psychic",
  bug: "Bug", rock: "Rock", ghost: "Ghost", dragon: "Dragon", dark: "Dark", steel: "Steel", fairy: "Fairy"
};

const TYPE_COLOURS = {
  normal: "#a8a878", fire: "#ef6a34", water: "#4c9bd4", electric: "#f5c400", grass: "#5fa845",
  ice: "#7fd4e8", fighting: "#c0392b", poison: "#a254b5", ground: "#c98b32", flying: "#8f9fe0",
  psychic: "#f472a8", bug: "#94b816", rock: "#b5a04a", ghost: "#6b4a8f", dragon: "#7c5cd6",
  dark: "#5a5568", steel: "#7a8ca3", fairy: "#e28fb4"
};

const typeMultiplier = (attackType, defenderTypes) =>
  (defenderTypes || []).reduce((mult, defender) => mult * (TYPE_CHART[attackType]?.[defender] ?? 1), 1);

const NATURES = {
  Hardy: null, Bold: { up: "defense", down: "attack" }, Modest: { up: "special-attack", down: "attack" },
  Timid: { up: "speed", down: "attack" }, Jolly: { up: "speed", down: "special-attack" },
  Adamant: { up: "attack", down: "special-attack" }, Impish: { up: "defense", down: "special-attack" },
  Calm: { up: "special-defense", down: "attack" }, Gentle: { up: "special-defense", down: "defense" },
  Sassy: { up: "special-defense", down: "speed" }, Quiet: { up: "special-attack", down: "speed" },
  Rash: { up: "special-attack", down: "special-defense" }, Naive: { up: "speed", down: "special-defense" },
  Serious: null, Naughty: { up: "attack", down: "special-defense" }, Lonely: { up: "attack", down: "defense" },
  Brave: { up: "attack", down: "speed" }, Relaxed: { up: "defense", down: "speed" },
  Mild: { up: "special-attack", down: "defense" }, Quirky: null, Bashful: null, Docile: null
};

const NATURE_LIST = Object.keys(NATURES);
const natureEffect = nature => NATURES[nature] || null;

/* Canonical stat maths, shared by every page so it is only written once.
   `mod` is +1 for a boosted nature, -1 for a lowered one, 0 for neutral. */
const statValue = (base, ev, mod) => {
  const withNature = mod > 0 ? Math.floor(base * 1.1) : mod < 0 ? -Math.ceil(base * 0.1) : 0;
  return base + withNature + Math.floor((Number(ev) || 0) / 4);
};

const evTotal = evs => Object.values(evs || {}).reduce((sum, value) => sum + Number(value || 0), 0);
const evPercent = value => Math.min(100, Math.round((Number(value) || 0) / 252 * 100));

const STAT_ORDER = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
const STAT_LABELS = { hp: "HP", attack: "Atk", defense: "Def", "special-attack": "SpA", "special-defense": "SpD", speed: "Spe" };

/* Items that actually show up in Champions play. */
const ITEMS = [
  "Life Orb", "Choice Band", "Choice Specs", "Choice Scarf", "Leftovers", "Sitrus Berry",
  "Assault Vest", "Focus Sash", "Heavy-Duty Boots", "Rocky Helmet", "Black Sludge", "Light Clay",
  "Booster Energy", "Scope Lens", "Punching Glove", "Clear Amulet", "Covert Cloak", "Safety Goggles",
  "Magnet", "Power Herb", "Loaded Dice", "Eject Pack", "Eject Button", "Red Card", "Grip Claw",
  "Shed Shell", "Throat Spray", "Weakness Policy", "Terrain Extender", "Mirror Herb", "Metronome",
  "Electric Seed", "Grassy Seed", "Misty Seed", "Psychic Seed", "Adrenaline Orb", "Mental Herb",
  "Air Balloon", "Leftovers", "No item"
];

/* Archetypes the assistant reasons with when assigning roles. */
const ROLES = [
  { id: "sweeper",      label: "Sweeper",          wants: { attack: 3, speed: 3 }, blurb: "Comes in late, sweeps with strong attacks" },
  { id: "wallbreaker",  label: "Wallbreaker",      wants: { attack: 3 },             blurb: "Punches through defensive walls" },
  { id: "fast-tanker",  label: "Fast wall/tank",   wants: { defense: 3, speed: 2 },  blurb: "Survives one hit and stalls" },
  { id: "tank",         label: "Tank",             wants: { hp: 3, defense: 3 },     blurb: "Absorbs damage and wears the enemy down" },
  { id: "support",      label: "Support",          wants: { bulk: 2 },              blurg: "Sets up the team or the weather" },
  { id: "revival",      label: "Revival / pivot",  wants: { bulk: 2 },              blurb: "Comes in on a healthy team and sets up" },
  { id: "hazard",       label: "Hazard control",   wants: { bulk: 1 },              blurb: "Stealth Rock, Toxic Spikes and webs" }
];