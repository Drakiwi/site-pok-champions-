/* Curated competitive sets. Powers and types are stored inline so this file
   stays self-contained and never has to hit the network to render.
   TYPE_NAMES / TYPE_COLOURS / statValue come from typechart.js, which this page
   loads first. */

const set = (name, sprite, types, role, ability, item, nature, evs, moves, tip) =>
  ({ name, sprite, types, role, ability, item, nature, evs, moves, tip });

const SETS = [
  set("Tapu Koko", "tapu koko", ["electric", "flying"], "Fast special attacker",
    "Electric Surge", "Leftovers", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Thunderbolt", "electric", 90], ["Dazzling Gleam", "fairy", 80], ["Reflect", "psychic", null], ["Light Screen", "psychic", null]],
    "Its Electric Surge halves incoming paralysis and doubles Electric damage. Light Screen is here for the frail cores that rely on it."),

  set("Rillaboom", "rilaboom", ["grass"], "Grassy Glide wallbreaker",
    "Protosynthesis", "Assault Vest", "Adamant", { attack: 252, "special-defense": 4, speed: 252 },
    [["Grassy Glide", "grass", 55], ["Knock Off", "dark", 65], ["U-turn", "bug", 70], ["Wood Hammer", "grass", 120]],
    "Grassy Glide doubles in power under rain, so it is the strongest Ground-type attack in the game. The Assault Vest stops Knock Off from stripping it."),

  set("Archaludon", "archaludon", ["steel", "dragon"], "Bulky special wallbreaker",
    "Stamina", "Heavy-Duty Boots", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Electro Shot", "electric", 130], ["Draco Meteor", "dragon", 130], ["Flash Cannon", "steel", 80], ["Body Press", "fighting", 80]],
    "Electro Shot raises SpA and hits hardest in the rain. Stamina lets it take a hit, boost, and keep swinging instead of dying."),

  set("Raging Bolt", "ire foudre", ["electric", "dragon"], "Rain-special nuker",
    "Protosynthesis", "Booster Energy", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Thunderclap", "electric", 70], ["Draco Meteor", "dragon", 130], ["Flamethrower", "fire", 90], ["Protect", "normal", null]],
    "Thunderclap always hits first, so it is a reliable opener into Draco Meteor. Booster Energy kicks in when sun removes Protosynthesis."),

  set("Salamence", "salamence", ["dragon", "flying"], "Dragon Dance sweeper",
    "Intimidate", "Life Orb", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Dragon Claw", "dragon", 80], ["Earthquake", "ground", 100], ["Roost", "flying", null], ["Dragon Dance", "dragon", null]],
    "Intimidate makes it a safe Dragon Dance sweeper. Roost lets it recover the HP it burns through fighting."),

  set("Kingambit", "kingambit", ["dark", "steel"], "Swords Dance wallbreaker",
    "Defiant", "Black Sludge", "Adamant", { attack: 252, "special-defense": 4, speed: 252 },
    [["Swords Dance", "normal", null], ["Iron Head", "steel", 80], ["Low Kick", "fighting", null], ["Knock Off", "dark", 65]],
    "Swords Dance lets it punch through walls, and Knock Off punishes any team that leans on leftovers. Low Kick is there for the many Water and Ground types."),

  set("Sneazer", "sneazer", ["poison", "fighting"], "Unburden wallbreaker",
    "Unburden", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Dire Claw", "poison", 80], ["Close Combat", "fighting", 120], ["Knock Off", "dark", 65], ["Protect", "normal", null]],
    "Unburden doubles its speed once the item is gone, so it outspeels things it should lose to. Close Combat costs defense, so watch out for Knock Off users."),

  set("Indeedee", "indeedee", ["psychic", "normal"], "Expanding Force support",
    "Own Tempo", "Light Clay", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Expanding Force", "psychic", 80], ["Dazzling Gleam", "fairy", 80], ["Helping Hand", "normal", null], ["Protect", "normal", null]],
    "Expanding Force doubles in power next to a Psychic ally, so it is brought in as support. Light Screen and Reflect come from the Clay."),

  set("Golisopod", "golisopod", ["bug", "water"], "Sturdy revenge tank",
    "Sturdy", "Heavy-Duty Boots", "Bold", { hp: 252, defense: 252, "special-defense": 4 },
    [["First Impression", "bug", 90], ["Liquidation", "water", 85], ["Leech Life", "bug", 80], ["Protect", "normal", null]],
    "First Impression quadruples in power on the turn it lands, making it the strongest priority move in the game. It is also immune to two-hit KO moves."),

  set("Floette", "floette", ["fairy"], "Cinderace-beater cleaner",
    "Symbiosis", "Choice Scarf", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Moonblast", "fairy", 95], ["Earth Power", "ground", 90], ["Calm Mind", "psychic", null], ["Protect", "normal", null]],
    "Symbiosis passes a useful item to an ally. Calm Mind turns it into a late-game cleaner against Fighting and Dragon types."),

  set("Farigiraf", "farigiraf", ["normal", "psychic"], "Trick Room support",
    "Klutz", "Light Clay", "Calm", { "special-attack": 252, hp: 252, "special-defense": 4 },
    [["Expanding Force", "psychic", 80], ["Hyper Voice", "normal", 90], ["Trick Room", "psychic", null], ["Helping Hand", "normal", null]],
    "Klutz means the item is never knocked off, so Light Clay stays. It sets Trick Room and supports the rest of the team."),

  set("Pelipper", "pelipper", ["water", "flying"], "Tailwind enabler",
    "Big Pecks", "Focus Sash", "Bold", { hp: 252, defense: 252, "special-defense": 4 },
    [["Hurricane", "flying", 110], ["Weather Ball", "normal", 50], ["Tailwind", "flying", null], ["Wide Guard", "normal", null]],
    "Tailwind is the whole point: it doubles the speed of everything on the field. Focus Sash guarantees the Tailwind goes up even against a wallbreaker."),

  set("Arcanine", "arcanine hisuian", ["fire", "rock"], "Rapid Cloak sweeper",
    "Intimidate", "Rocky Helmet", "Adamant", { attack: 252, "special-defense": 4, speed: 252 },
    [["Rock Slide", "rock", 75], ["Flare Blitz", "fire", 120], ["Extreme Speed", "normal", 80], ["Protect", "normal", null]],
    "Extreme Speed gives it a move that always hits first, which pairs perfectly with Flare Blitz. Rocky Helmet punishes physical attackers on contact."),

  set("Gholdengo", "gholdengo", ["steel", "ghost"], "Wallbreaker nuker",
    "Good as Gold", "Choice Scarf", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Make It Rain", "steel", 120], ["Shadow Ball", "ghost", 80], ["Nasty Plot", "dark", null], ["Recover", "normal", null]],
    "Make It Rain never misses and hits every adjacent target, which is devastating in Doubles. Good as Gold blocks all status moves."),

  set("Charizard", "charizard", ["fire", "flying"], "Sun-team wallbreaker",
    "Blaze", "Life Orb", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Flamethrower", "fire", 90], ["Air Slash", "flying", 75], ["Solar Beam", "grass", 120], ["Protect", "normal", null]],
    "Solar Beam is one of the hardest hits in the game under sun, and it comes out after one turn of Flamethrower and Air Slash soften the target."),

  set("Sylveon", "sylveon", ["fairy"], "Hyper Voice cleaner",
    "Cute Charm", "Leftovers", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Hyper Voice", "normal", 90], ["Moonblast", "fairy", 95], ["Calm Mind", "psychic", null], ["Protect", "normal", null]],
    "Hyper Voice hits both foes and has a 10 percent chance to make anyone who hears it flinch. Calm Mind makes Sylveon win late-game trades."),

  set("Tyranitar", "tyranitar", ["rock", "dark"], "Sand Stream wallbreaker",
    "Sand Stream", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Rock Slide", "rock", 75], ["Knock Off", "dark", 65], ["Low Kick", "fighting", null], ["Protect", "normal", null]],
    "Sand Stream chips every turn, so it wears the team down while it hits hard once. Low Kick is a free OHKO on the Water types that switch in."),

  set("Gardevoir", "gardevoir", ["psychic", "fairy"], "Trick Room attacker",
    "Synchronize", "Choice Scarf", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Moonblast", "fairy", 95], ["Psychic", "psychic", 90], ["Trick Room", "psychic", null], ["Protect", "normal", null]],
    "Trick Room reverses the speed order, letting a slow, frail attacker win every turn. Choice Scarf keeps it threatening even against Trick Room setters."),

  set("Lucario", "lucario", ["fighting", "steel"], "Fast Fighting attacker",
    "Justified", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Close Combat", "fighting", 120], ["Meteor Mash", "steel", 120], ["Extreme Speed", "normal", 80], ["Protect", "normal", null]],
    "Two 120-power STAB moves plus priority makes it relentless. Justified means getting hit by a physical move only makes it angrier."),

  set("Whimsicott", "whimsicott", ["grass", "fairy"], "Prankster support",
    "Prankster", "Focus Sash", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Moonblast", "fairy", 95], ["Tailwind", "flying", null], ["Encore", "normal", null], ["Taunt", "dark", null]],
    "Prankster makes all its support moves go first, so it sets Tailwind and Encores opponents before they can react. Taunt shuts down recovery."),

  set("Raichu", "raichu", ["electric"], "Pavement wallbreaker",
    "Surge Surfer", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Volt Switch", "electric", 70], ["Rising Voltage", "electric", 70], ["Thunder Punch", "electric", 75], ["Protect", "normal", null]],
    "On paved terrain it is a Ground-type that hits like a truck. Volt Switch lets it pivot out while staying fast."),

  set("Excadrill", "excadrill", ["ground", "steel"], "Sand Rush attacker",
    "Sand Rush", "Choice Scarf", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Earthquake", "ground", 100], ["Iron Head", "steel", 80], ["Rock Slide", "rock", 75], ["Protect", "normal", null]],
    "Sand Rush doubles its Speed in sand, making it one of the fastest Ground attackers. Rock Slide gives it a 30 percent flinch chance."),

  set("Torkoal", "torkoal", ["fire"], "Sun setter",
    "White Smoke", "Heavy-Duty Boots", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Eruption", "fire", 130], ["Heat Wave", "fire", 95], ["Solar Beam", "grass", 120], ["Protect", "normal", null]],
    "Eruption gets stronger the more HP it has left, so switching in on a full-HP foe is the play. Solar Beam benefits from the sun it set up."),

  set("Armarouge", "armarouge", ["fire", "psychic"], "Trick Room attacker",
    "Flash Fire", "Assault Vest", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Armor Cannon", "fire", 120], ["Expanding Force", "psychic", 80], ["Trick Room", "psychic", null], ["Wide Guard", "normal", null]],
    "Armor Cannon is one of the strongest Fire moves in the game, and Flash Fire doubles its power against Fire attackers. Wide Guard covers Doubles spread moves."),

  set("Baxcalibur", "baxcalibur", ["dragon", "ice"], "Glaive Rush wallbreaker",
    "Thermal Exchange", "Choice Scarf", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Glaive Rush", "dragon", 120], ["Icicle Crash", "ice", 85], ["Dragon Claw", "dragon", 80], ["Protect", "normal", null]],
    "Glaive Rush always hits first and leaves the target with no priority move next turn. Thermal Exchange turns Fire hits into setup for Baxcalibur."),

  set("Heatran", "heatran", ["fire", "steel"], "Entry hazard spinner",
    "Flash Fire", "Leftovers", "Impish", { hp: 252, "special-attack": 4, "special-defense": 252 },
    [["Heat Wave", "fire", 95], ["Flash Cannon", "steel", 80], ["Earth Power", "ground", 90], ["Protect", "normal", null]],
    "The bulkiest special attacker in most formats. Flash Fire doubles its Fire damage, and it switches in safely on any Fire move."),

  set("Absol", "absol", ["dark"], "Crit sweeper",
    "Magic Guard", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Knock Off", "dark", 65], ["Sucker Punch", "dark", 70], ["Play Rough", "fairy", 90], ["Protect", "normal", null]],
    "Magic Guard ignores the hazards and Toxic that would normally wear it down, making it a great late-game cleaner. Play Rough gives it Fighting coverage."),

  set("Gyarados", "gyarados", ["water", "flying"], "Dragon Dance wallbreaker",
    "Intimidate", "Leftovers", "Adamant", { attack: 252, "special-defense": 4, speed: 252 },
    [["Waterfall", "water", 80], ["Crunch", "dark", 80], ["Ice Fang", "ice", 65], ["Dragon Dance", "dragon", null]],
    "Intimidate lets it set up Dragon Dance safely, then it hits Water, Rock and Ground types super effectively. Leftovers lets it survive repeated hits."),

  set("Dragalge", "dragalge", ["poison", "dragon"], "Choice Specs attacker",
    "Berserk", "Choice Specs", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Draco Meteor", "dragon", 130], ["Sludge Wave", "poison", 95], ["Hydro Pump", "water", 110], ["Protect", "normal", null]],
    "Berserk gives it a free Calm Mind every time it drops below half HP, so the Choice Specs hits get stronger the longer the battle goes."),

  set("Scolipede", "scolipede", ["bug", "poison"], "Hazard control",
    "Swarm", "Leftovers", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Megahorn", "bug", 120], ["Poison Jab", "poison", 80], ["Earthquake", "ground", 100], ["Protect", "normal", null]],
    "Stealth Rock, Toxic Spikes and Sticky Web all come from this one Pokémon, which usually decides the battle before it starts."),

  set("Meganium", "meganium", ["grass"], "Curse tank",
    "Overgrow", "Leftovers", "Jolly", { hp: 252, attack: 252, defense: 4 },
    [["Giga Drain", "grass", 75], ["Body Press", "fighting", 80], ["Leech Seed", "grass", null], ["Protect", "normal", null]],
    "Body Press uses its high Defense to hit as hard as Body Slam while still acting as a wall. Leech Seed recovers a third of whatever it deals."),

  set("Magearna", "magearna", ["steel", "fairy"], "Wallbreaker support",
    "Soul-Heart", "Assault Vest", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Fleur Cannon", "fairy", 130], ["Flash Cannon", "steel", 80], ["Aura Sphere", "fighting", 80], ["Protect", "normal", null]],
    "Soul-Heart permanently raises SpA every time an ally faints, so it hits harder the longer the battle runs. Aura Sphere hits through Protect."),

  set("Starmie", "starmie", ["water", "psychic"], "Rapid Spin cleaner",
    "Analytic", "Life Orb", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Hydro Pump", "water", 110], ["Psychic", "psychic", 90], ["Thunderbolt", "electric", 90], ["Recover", "normal", null]],
    "Analytic boosts single-target moves by 30 percent, which is huge for a fast frail attacker. Recover lets it outlast bulky walls."),

  set("Clefable", "clefable", ["fairy"], "Unaware wall",
    "Unaware", "Leftovers", "Bold", { hp: 252, defense: 252, "special-defense": 4 },
    [["Moonblast", "fairy", 95], ["Flamethrower", "fire", 90], ["Calm Mind", "psychic", null], ["Soft-Boiled", "normal", null]],
    "Unaware means its stats are never lowered, so it shrugs off Intimidate and screens completely. Calm Mind turns it into a tanky late-game sweeper."),

  set("Eelektross", "eelektross", ["electric"], "Parasite wallbreaker",
    "Levitate", "Magnet", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Thunderbolt", "electric", 90], ["Flamethrower", "fire", 90], ["Volt Switch", "electric", 70], ["Protect", "normal", null]],
    "Volt Switch lets it tank hits with its Magic Coat-like item and then switch out on its own terms. Levitate ignores Ground hazards."),

  set("Glalie", "glalie", ["ice"], "Refrigerate wallbreaker",
    "Refrigerate", "Choice Specs", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Icicle Crash", "ice", 85], ["Freeze-Dry", "ice", 70], ["Surf", "water", 90], ["Protect", "normal", null]],
    "Refrigerate turns its Normal moves into Ice, so Flash Cannon and Hyper Voice both hit as STAB. Surf hits everything weak to Water, including Land and Rock."),

  set("Chandelure", "chandelure", ["ghost", "fire"], "Trick Room nuker",
    "Flash Fire", "Choice Specs", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Shadow Ball", "ghost", 80], ["Flamethrower", "fire", 90], ["Trick Room", "psychic", null], ["Protect", "normal", null]],
    "Flash Fire doubles its Fire damage, so Heat Wave becomes one of the strongest moves in the game. Trick Room lets it outspeed anything bulky."),

  set("Delphox", "delphox", ["fire", "psychic"], "Special attacker",
    "Blaze", "Choice Specs", "Jolly", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Psychic", "psychic", 90], ["Fire Blast", "fire", 110], ["Grass Knot", "grass", null], ["Protect", "normal", null]],
    "Two 90-plus power special moves with great speed. Grass Knot deals more the heavier the target is, so it finishes Ground types."),

  set("Staraptor", "staraptor", ["normal", "flying"], "Fast physical attacker",
    "Intimidate", "Choice Scarf", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Brave Bird", "flying", 120], ["Double-Edge", "normal", 120], ["Close Combat", "fighting", 120], ["U-turn", "bug", 70]],
    "Three separate 120-power moves covering Normal, Flying and Fighting. U-turn lets it pivot out on a defensive team instead of being trapped."),

  set("Darkrai", "darkrai", ["dark"], "Prankster disruptor",
    "Prankster", "Focus Sash", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Knock Off", "dark", 65], ["Sucker Punch", "dark", 70], ["Parting Shot", "dark", null], ["Protect", "normal", null]],
    "Parting Shot lowers the target's Attack and SpA and switches, working as a pivot and a debuffer. Sucker Punch stops anything from setting up in its face."),

  set("Zeraora", "zeraora", ["electric"], "Fast physical attacker",
    "Volt Absorb", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Plasma Fists", "electric", 100], ["Wild Charge", "electric", 90], ["Close Combat", "fighting", 120], ["Protect", "normal", null]],
    "Plasma Fists becomes a 160-power move after a Mega Evolution, but it works fine on its own. Volt Absorb lets it survive Electric hits and set up on Land."),

  set("Rotom", "rotom", ["electric", "ghost"], "Status support",
    "Levitate", "Choice Specs", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Thunderbolt", "electric", 90], ["Hydro Pump", "water", 110], ["Will-O-Wisp", "fire", 75], ["Protect", "normal", null]],
    "Will-O-Wisp halves the target's Attack and burns it every turn, which shuts down physical attackers cold. Levitate ignores Ground moves and Spikes."),

  set("Zapdos", "zapdos", ["electric", "flying"], "Defensive rain support",
    "Pressure", "Heavy-Duty Boots", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Thunderbolt", "electric", 90], ["Heat Wave", "fire", 95], ["Hurricane", "flying", 110], ["Roost", "flying", null]],
    "A natural wallbreaker that still heals with Roost, so it switches in on Fighting and Ground types and leaves. Hurricane has a 30 percent flinch chance."),

  set("Incineroar", "incineroar", ["fire", "dark"], "Intimidate attacker",
    "Intimidate", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Knock Off", "dark", 65], ["Flare Blitz", "fire", 120], ["Fake Out", "normal", 40], ["Parting Shot", "dark", null]],
    "Fake Out hits before the opponent can act, so it opens with priority and then Flare Blitz. Intimidate slows down physical attackers automatically."),

  set("Garchomp", "garchomp", ["dragon", "ground"], "Sand sweeper",
    "Rough Skin", "Life Orb", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Earthquake", "ground", 100], ["Dragon Claw", "dragon", 80], ["Ice Punch", "ice", 75], ["Protect", "normal", null]],
    "Rough Skin reflects a third of the contact damage it takes, which adds up fast against physical attackers. Ice Punch is there to hit the Flying and Dragon types that switch in."),

  set("Basculegion", "basculegion", ["water"], "Last Respects wallbreaker",
    "Adaptability", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Wave Crash", "water", 120], ["Last Respects", "ghost", 50], ["Aqua Jet", "water", 40], ["Protect", "normal", null]],
    "Last Respects doubles in power for every fainted Pokémon on the field, so it ends games it has no business winning. Aqua Jet is priority, which makes it a reliable last hit."),

  set("Crabominable", "crabominable", ["bug", "fighting"], "Crabhammer wallbreaker",
    "Water Compaction", "Choice Band", "Adamant", { attack: 252, "special-defense": 4, speed: 252 },
    [["Crabhammer", "fighting", 100], ["Close Combat", "fighting", 120], ["Knock Off", "dark", 65], ["Protect", "normal", null]],
    "Crabhammer has no miss chance at all, which is rare for a move this strong. Water Compaction doubles its Defense on Water hits, letting it tank and hit back."),

  set("Feraligatr", "feraligatr", ["water"], "Fast physical attacker",
    "Torrent", "Choice Band", "Jolly", { attack: 252, "special-defense": 4, speed: 252 },
    [["Waterfall", "water", 80], ["Knock Off", "dark", 65], ["Ice Punch", "ice", 75], ["Protect", "normal", null]],
    "A fast Water attacker with real punch. Low Kick and Ice Punch give it the Fighting and Flying coverage that stops teams from ignoring it."),

  set("Meowstic", "meowstic", ["psychic"], "Light Clay support",
    "Psychic Surge", "Light Clay", "Modest", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Psychic", "psychic", 90], ["Dazzling Gleam", "fairy", 80], ["Helping Hand", "normal", null], ["Protect", "normal", null]],
    "Psychic Surge raises SpA when it enters battle, so its very first attack is already boosted. Light Clay means it sets up Reflect and Light Screen for free."),

  set("Scovilain", "scovilain", ["dark", "poison"], "Poison Heal nuker",
    "Poison Heal", "Life Orb", "Timid", { "special-attack": 252, "special-defense": 4, speed: 252 },
    [["Dark Pulse", "dark", 80], ["Sludge Bomb", "poison", 90], ["Nasty Plot", "dark", null], ["Protect", "normal", null]],
    "Poison Heal trades HP for SpA when it drops below half, turning it into a hit-and-run attacker that heals itself every time. Nasty Plot finishes what it starts."),
];

const NATURE_EFFECTS = {
  Hardy: null, Bold: { up: "defense", down: "attack" }, Modest: { up: "special-attack", down: "attack" },
  Timid: { up: "speed", down: "attack" }, Jolly: { up: "speed", down: "special-attack" },
  Adamant: { up: "attack", down: "special-attack" }, Impish: { up: "defense", down: "special-attack" },
  Calm: { up: "special-defense", down: "attack" }, Gentle: { up: "special-defense", down: "defense" },
  Sassy: { up: "special-defense", down: "speed" }, Quiet: { up: "special-attack", down: "speed" },
  Rash: { up: "special-attack", down: "special-defense" }, Naive: { up: "speed", down: "special-defense" },
  Bold2: null, Serious: null, Naughty: { up: "attack", down: "special-defense" },
  Lonely: { up: "attack", down: "defense" }, Brave: { up: "attack", down: "speed" },
  Relaxed: { up: "defense", down: "speed" }, Mild: { up: "special-attack", down: "defense" },
  Quirky: null, Bashful: null, Docile: null
};

/* sprites.js owns the name -> filename mapping; sets.js only carries the
   curated set data. */

const movesMarkup = moves => moves.map(([name, type, power]) =>
  `<li class="set-move" style="--move-colour:${TYPE_COLOURS[type] || "#8b7fff"}">
     <span class="move-name">${name}</span>
     ${power ? `<b class="move-power">${power}</b>` : `<b class="move-power is-status">—</b>`}
   </li>`).join("");

const evsMarkup = evs => STAT_ORDER.filter(key => evs[key]).map(key =>
  `<div class="ev-row"><span>${STAT_LABELS[key]}</span><b>${evs[key]}</b><i style="--v:${evPercent(evs[key])}%"></i></div>`).join("");

const natureMarkup = (nature, baseStats) => {
  const effect = NATURE_EFFECTS[nature];
  if (!effect) return `<span class="set-nature is-neutral">${nature}<small>neutral</small></span>`;
  const up = baseStats ? statValue(baseStats[effect.up] || 0, 0, 1) : 0;
  const down = baseStats ? statValue(baseStats[effect.down] || 0, 0, -1) : 0;
  return `<span class="set-nature"><b>${nature}</b><small><em class="up">+${STAT_LABELS[effect.up]}</em> / <em class="down">−${STAT_LABELS[effect.down]}</em></small></span>`;
};

const cardMarkup = entry => `
  <article class="set-card" data-name="${entry.name.toLowerCase()}" data-types="${entry.types.join(" ")}" data-role="${entry.role.toLowerCase()}">
    <header class="set-head">
      <img class="set-sprite" src="${spriteFor(entry.name)}" alt="${entry.name}" loading="lazy">
      <div class="set-ident">
        <h2>${entry.name}</h2>
        <p class="set-role">${entry.role}</p>
        <ul class="set-types">${entry.types.map(type => `<li class="type ${type}">${TYPE_NAMES[type]}</li>`).join("")}</ul>
      </div>
    </header>
    <ul class="set-moves">${movesMarkup(entry.moves)}</ul>
    <dl class="set-meta">
      <div><dt>Ability</dt><dd>${entry.ability}</dd></div>
      <div><dt>Item</dt><dd>${entry.item}</dd></div>
    </dl>
    ${natureMarkup(entry.nature, entry.baseStats)}
    <div class="set-evs">
      <h3>EV spread <small>${evTotal(entry.evs)} / 510</small></h3>
      ${evsMarkup(entry.evs)}
    </div>
    <p class="set-tip">${entry.tip}</p>
    <div class="set-actions">
      <select class="set-slot" aria-label="Slot for ${entry.name}">
        ${[0, 1, 2, 3, 4, 5].map(i => `<option value="${i}">Slot ${i + 1}</option>`).join("")}
      </select>
      <button class="set-apply" type="button" data-name="${entry.name.toLowerCase()}">Use this set</button>
    </div>
  </article>`;

/* Prefixed names: replacement.js declares plain `search`/`grid` at the same
   scope, and these pages may well be loaded together later. */
const setsSearch = document.querySelector("#sets-search");
const filter = document.querySelector("#sets-filter");
const setsGrid = document.querySelector("#sets-grid");
const count = document.querySelector("#sets-count");
let currentFilter = "all";

const applyFilters = () => {
  const term = (setsSearch?.value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  let shown = 0;
  [...setsGrid.children].forEach(card => {
    const haystack = `${card.dataset.name} ${card.dataset.types} ${card.dataset.role}`;
    const matchesTerm = !term || haystack.includes(term);
    const matchesType = currentFilter === "all" || card.dataset.types.split(" ").includes(currentFilter);
    const visible = matchesTerm && matchesType;
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  if (count) count.textContent = `${shown} set${shown > 1 ? "s" : ""}`;
};

if (setsGrid) {
  setsGrid.innerHTML = SETS.map(cardMarkup).join("");
  applyFilters();
}

setsSearch?.addEventListener("input", applyFilters);
filter?.addEventListener("change", event => { currentFilter = event.target.value; applyFilters(); });

setsGrid?.addEventListener("click", event => {
  const button = event.target.closest(".set-apply");
  if (!button) return;
  const card = button.closest(".set-card");
  const entry = SETS.find(item => item.name.toLowerCase() === card.dataset.name);
  const slot = Number(card.querySelector(".set-slot").value);
  if (!entry) return;
  try {
    const team = JSON.parse(localStorage.getItem("pokemon-team") || "null");
    const list = Array.isArray(team) ? team : [];
    while (list.length < 6) list.push(null);
    list[slot] = {
      name: entry.name,
      item: `@ ${entry.item}`,
      image: spriteFor(entry.name),
      accent: TYPE_COLOURS[entry.types[0]] || "#8b7fff",
      types: entry.types,
      moves: entry.moves.map(([name, type, power]) => ({
        name: name.toLowerCase().replace(/\s+/g, "-"),
        power: power ?? null,
        type
      })),
      ability: entry.ability,
      nature: entry.nature,
      evs: { hp: 0, attack: 0, defense: 0, "special-attack": 0, "special-defense": 0, speed: 0, ...entry.evs }
    };
    localStorage.setItem("pokemon-team", JSON.stringify(list));
    button.textContent = "Added to slot " + (slot + 1);
    button.classList.add("is-done");
    setTimeout(() => { button.textContent = "Use this set"; button.classList.remove("is-done"); }, 2200);
  } catch {
    button.textContent = "Could not save";
  }
});
