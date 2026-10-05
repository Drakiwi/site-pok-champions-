/* ============================================================================
   Roster knowledge base - generated from coupcritique.fr (real Champions data).

   PokeAPI is not the ground truth here: it currently returns falsified typings
   and abilities for several entries (Crabominable comes back as Fighting/Ice,
   Scovillain as Grass/Fire) and 404s on Sneazer and Basculegion. This file
   carries per-Pokemon base stats, types, abilities, the mega stone each Mega
   form requires, and the real competitive usage numbers for the Champions
   format, so the assistant reasons on facts instead of guessing.

   Every move in `meta.moves` carries its real type and power, so no move
   lookup table has to be maintained by hand.

   Types are stored lowercase to match TYPE_CHART, TYPE_NAMES, TYPE_COLOURS
   and the existing team data in script.js.
   ========================================================================== */

const ROSTER = [
 {
  "n": "Tapu Koko",
  "name": "Tapu Koko",
  "slug": "tapukoko",
  "types": [
   "electric",
   "fairy"
  ],
  "stats": [
   70,
   115,
   85,
   95,
   75,
   130
  ],
  "bst": 570,
  "abilities": [
   "Electric Surge",
   "Telepathy"
  ],
  "mega": null,
  "gem": null,
  "tier": null
 },
 {
  "n": "Rillaboom",
  "name": "Rillaboom",
  "slug": "rillaboom",
  "types": [
   "grass"
  ],
  "stats": [
   100,
   125,
   90,
   60,
   70,
   85
  ],
  "bst": 530,
  "abilities": [
   "Overgrow",
   "Grassy Surge"
  ],
  "mega": null,
  "gem": null,
  "tier": "OU",
  "meta": {
   "usage": 54.1,
   "rank": 1,
   "winrate": 50.201,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Grassy Glide",
     "percent": 98.2,
     "type": "grass",
     "power": 55
    },
    {
     "name": "Wood Hammer",
     "percent": 87.7,
     "type": "grass",
     "power": 120
    },
    {
     "name": "U-turn",
     "percent": 48.5,
     "type": "bug",
     "power": 70
    },
    {
     "name": "High Horsepower",
     "percent": 46.5,
     "type": "ground",
     "power": 95
    },
    {
     "name": "Protect",
     "percent": 10.2,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Superpower",
     "percent": 2.4,
     "type": "fighting",
     "power": 120
    },
    {
     "name": "Knock Off",
     "percent": 2.3,
     "type": "dark",
     "power": 65
    },
    {
     "name": "Drum Beating",
     "percent": 1.6,
     "type": "grass",
     "power": 80
    }
   ],
   "abilities": [
    {
     "name": "Grassy Surge",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Miracle Seed",
     "percent": 62.2
    },
    {
     "name": "Sitrus Berry",
     "percent": 11.5
    },
    {
     "name": "Life Orb",
     "percent": 8.2
    },
    {
     "name": "Occa Berry",
     "percent": 5
    }
   ],
   "partners": [
    {
     "name": "Sneasler",
     "percent": 45.7
    },
    {
     "name": "Incineroar",
     "percent": 43.9
    },
    {
     "name": "Salamence-Mega",
     "percent": 43.2
    },
    {
     "name": "Gholdengo",
     "percent": 32.2
    },
    {
     "name": "Kingambit",
     "percent": 25.3
    },
    {
     "name": "Arcanine-Hisui",
     "percent": 23.6
    }
   ]
  }
 },
 {
  "n": "Archaludon",
  "name": "Archaludon",
  "slug": "archaludon",
  "types": [
   "steel",
   "dragon"
  ],
  "stats": [
   90,
   105,
   130,
   125,
   65,
   85
  ],
  "bst": 600,
  "abilities": [
   "Stamina",
   "Sturdy",
   "Stalwart"
  ],
  "mega": null,
  "gem": null,
  "tier": "Uber",
  "meta": {
   "usage": 11.54,
   "rank": 18,
   "winrate": 52.215,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Electro Shot",
     "percent": 98.9,
     "type": "electric",
     "power": 130
    },
    {
     "name": "Protect",
     "percent": 97.9,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Dragon Pulse",
     "percent": 84.8,
     "type": "dragon",
     "power": 85
    },
    {
     "name": "Flash Cannon",
     "percent": 82.1,
     "type": "steel",
     "power": 80
    },
    {
     "name": "Aura Sphere",
     "percent": 12.2,
     "type": "fighting",
     "power": 80
    },
    {
     "name": "Draco Meteor",
     "percent": 10.8,
     "type": "dragon",
     "power": 130
    },
    {
     "name": "Snarl",
     "percent": 10.6,
     "type": "dark",
     "power": 55
    }
   ],
   "abilities": [
    {
     "name": "Stamina",
     "percent": 97.5
    },
    {
     "name": "Sturdy",
     "percent": 1.3
    },
    {
     "name": "Stalwart",
     "percent": 1.2
    }
   ],
   "items": [
    {
     "name": "Leftovers",
     "percent": 90.4
    },
    {
     "name": "Chople Berry",
     "percent": 3.2
    },
    {
     "name": "Psychic Seed",
     "percent": 1.8
    },
    {
     "name": "Life Orb",
     "percent": 1.2
    }
   ],
   "partners": [
    {
     "name": "Pelipper",
     "percent": 70.7
    },
    {
     "name": "Golisopod-Mega",
     "percent": 45.9
    },
    {
     "name": "Rillaboom",
     "percent": 44.5
    },
    {
     "name": "Incineroar",
     "percent": 28.5
    },
    {
     "name": "Grimmsnarl",
     "percent": 27.6
    },
    {
     "name": "Swampert-Mega",
     "percent": 26.1
    }
   ]
  }
 },
 {
  "n": "Ire-Foudre",
  "name": "Raging Bolt",
  "slug": "ragingbolt",
  "types": [
   "electric",
   "dragon"
  ],
  "stats": [
   125,
   73,
   91,
   137,
   89,
   75
  ],
  "bst": 590,
  "abilities": [
   "Protosynthesis"
  ],
  "mega": null,
  "gem": null,
  "tier": "OU"
 },
 {
  "n": "Salamence",
  "name": "Salamence",
  "slug": "salamence",
  "types": [
   "dragon",
   "flying"
  ],
  "stats": [
   95,
   135,
   80,
   110,
   80,
   100
  ],
  "bst": 600,
  "abilities": [
   "Intimidate",
   "Moxie"
  ],
  "mega": null,
  "gem": null,
  "tier": "RUBL"
 },
 {
  "n": "Méga-Salamence",
  "name": "Salamence-Mega",
  "slug": "salamencemega",
  "types": [
   "dragon",
   "flying"
  ],
  "stats": [
   95,
   145,
   130,
   120,
   90,
   120
  ],
  "bst": 700,
  "abilities": [
   "Aerilate"
  ],
  "mega": "Salamence",
  "gem": "Salamencite",
  "tier": null,
  "meta": {
   "usage": 33.99,
   "rank": 3,
   "winrate": 50.372,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Protect",
     "percent": 98.3,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Hyper Voice",
     "percent": 91.8,
     "type": "normal",
     "power": 90
    },
    {
     "name": "Tailwind",
     "percent": 73.9,
     "type": "flying",
     "power": 0
    },
    {
     "name": "Draco Meteor",
     "percent": 57.4,
     "type": "dragon",
     "power": 130
    },
    {
     "name": "Double-Edge",
     "percent": 30.6,
     "type": "normal",
     "power": 120
    },
    {
     "name": "Flamethrower",
     "percent": 18.1,
     "type": "fire",
     "power": 90
    },
    {
     "name": "Dragon Pulse",
     "percent": 8.9,
     "type": "dragon",
     "power": 85
    },
    {
     "name": "Heat Wave",
     "percent": 6.2,
     "type": "fire",
     "power": 95
    }
   ],
   "abilities": [
    {
     "name": "Intimidate",
     "percent": 98.7
    },
    {
     "name": "Moxie",
     "percent": 1.3
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 68.7
    },
    {
     "name": "Sneasler",
     "percent": 63.9
    },
    {
     "name": "Kingambit",
     "percent": 34.4
    },
    {
     "name": "Gholdengo",
     "percent": 31.3
    },
    {
     "name": "Incineroar",
     "percent": 28
    },
    {
     "name": "Arcanine-Hisui",
     "percent": 26.3
    }
   ]
  }
 },
 {
  "n": "Kingambit",
  "name": "Kingambit",
  "slug": "kingambit",
  "types": [
   "dark",
   "steel"
  ],
  "stats": [
   100,
   135,
   120,
   60,
   85,
   50
  ],
  "bst": 550,
  "abilities": [
   "Defiant",
   "Supreme Overlord",
   "Pressure"
  ],
  "mega": null,
  "gem": null,
  "tier": "OU",
  "meta": {
   "usage": 25.38,
   "rank": 5,
   "winrate": 49.876,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Kowtow Cleave",
     "percent": 98.9,
     "type": "dark",
     "power": 85
    },
    {
     "name": "Sucker Punch",
     "percent": 97.4,
     "type": "dark",
     "power": 70
    },
    {
     "name": "Iron Head",
     "percent": 73.1,
     "type": "steel",
     "power": 80
    },
    {
     "name": "Protect",
     "percent": 59.3,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Low Kick",
     "percent": 49.1,
     "type": "fighting",
     "power": 0
    },
    {
     "name": "Swords Dance",
     "percent": 19.3,
     "type": "normal",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Defiant",
     "percent": 98.7
    },
    {
     "name": "Supreme Overlord",
     "percent": 1.3
    }
   ],
   "items": [
    {
     "name": "Chople Berry",
     "percent": 41.9
    },
    {
     "name": "Life Orb",
     "percent": 21.3
    },
    {
     "name": "Black Glasses",
     "percent": 17.3
    },
    {
     "name": "Focus Sash",
     "percent": 15.8
    }
   ],
   "partners": [
    {
     "name": "Sneasler",
     "percent": 57.1
    },
    {
     "name": "Rillaboom",
     "percent": 53.8
    },
    {
     "name": "Salamence-Mega",
     "percent": 46
    },
    {
     "name": "Basculegion",
     "percent": 29.4
    },
    {
     "name": "Incineroar",
     "percent": 20.9
    },
    {
     "name": "Arcanine-Hisui",
     "percent": 20.8
    }
   ]
  }
 },
 {
  "n": "Méga-Garchomp",
  "name": "Garchomp-Mega",
  "slug": "garchompmega",
  "types": [
   "dragon",
   "ground"
  ],
  "stats": [
   108,
   170,
   115,
   120,
   95,
   92
  ],
  "bst": 700,
  "abilities": [
   "Sand Force"
  ],
  "mega": "Garchomp",
  "gem": "Garchompite",
  "tier": null,
  "meta": {
   "usage": 7.61,
   "rank": 21,
   "winrate": 47.708,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Dragon Claw",
     "percent": 91.2,
     "type": "dragon",
     "power": 80
    },
    {
     "name": "Rock Slide",
     "percent": 81.7,
     "type": "rock",
     "power": 75
    },
    {
     "name": "Stomping Tantrum",
     "percent": 65.3,
     "type": "ground",
     "power": 75
    },
    {
     "name": "Protect",
     "percent": 64.5,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Earthquake",
     "percent": 63.2,
     "type": "ground",
     "power": 100
    },
    {
     "name": "Rock Tomb",
     "percent": 6.1,
     "type": "rock",
     "power": 60
    },
    {
     "name": "Poison Jab",
     "percent": 5.7,
     "type": "poison",
     "power": 80
    },
    {
     "name": "Swords Dance",
     "percent": 2.8,
     "type": "normal",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Rough Skin",
     "percent": 96.7
    },
    {
     "name": "Sand Veil",
     "percent": 3.3
    }
   ],
   "items": [
    {
     "name": "Life Orb",
     "percent": 48.8
    },
    {
     "name": "Choice Scarf",
     "percent": 31.1
    },
    {
     "name": "Sitrus Berry",
     "percent": 6.9
    },
    {
     "name": "Rocky Helmet",
     "percent": 3.4
    }
   ],
   "partners": [
    {
     "name": "Charizard-Mega-Y",
     "percent": 42.7
    },
    {
     "name": "Kingambit",
     "percent": 36.5
    },
    {
     "name": "Incineroar",
     "percent": 31.1
    },
    {
     "name": "Rillaboom",
     "percent": 29.6
    },
    {
     "name": "Sneasler",
     "percent": 27.7
    },
    {
     "name": "Basculegion",
     "percent": 22.5
    }
   ]
  }
 },
 {
  "n": "Méga-Garchomp Z",
  "name": "Garchomp-Mega-Z",
  "slug": "garchompmegaz",
  "types": [
   "dragon"
  ],
  "stats": [
   108,
   130,
   85,
   141,
   85,
   151
  ],
  "bst": 700,
  "abilities": [
   "Levitate"
  ],
  "mega": "Garchomp",
  "gem": "Garchompite Z",
  "tier": null,
  "meta": {
   "usage": 6.25,
   "rank": 24,
   "winrate": 48.745,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Protect",
     "percent": 98.2,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Power Gem",
     "percent": 80.7,
     "type": "rock",
     "power": 80
    },
    {
     "name": "Draco Meteor",
     "percent": 66.8,
     "type": "dragon",
     "power": 130
    },
    {
     "name": "Flamethrower",
     "percent": 63.2,
     "type": "fire",
     "power": 90
    },
    {
     "name": "Earth Power",
     "percent": 41.2,
     "type": "ground",
     "power": 90
    },
    {
     "name": "Dragon Pulse",
     "percent": 34.8,
     "type": "dragon",
     "power": 85
    },
    {
     "name": "Fire Blast",
     "percent": 5.6,
     "type": "fire",
     "power": 110
    },
    {
     "name": "Rock Slide",
     "percent": 2.6,
     "type": "rock",
     "power": 75
    }
   ],
   "abilities": [
    {
     "name": "Rough Skin",
     "percent": 96.8
    },
    {
     "name": "Sand Veil",
     "percent": 3.2
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 68.5
    },
    {
     "name": "Incineroar",
     "percent": 56.1
    },
    {
     "name": "Sneasler",
     "percent": 44.3
    },
    {
     "name": "Farigiraf",
     "percent": 25.1
    },
    {
     "name": "Kingambit",
     "percent": 21.7
    },
    {
     "name": "Volcarona",
     "percent": 20.6
    }
   ]
  }
 },
 {
  "n": "Méga-Raichu X",
  "name": "Raichu-Mega-X",
  "slug": "raichumegax",
  "types": [
   "electric"
  ],
  "stats": [
   60,
   135,
   95,
   90,
   95,
   110
  ],
  "bst": 585,
  "abilities": [
   "Electric Surge"
  ],
  "mega": "Raichu",
  "gem": "Raichunite X",
  "tier": null,
  "meta": {
   "usage": null,
   "rank": 85,
   "winrate": 43.509,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Fake Out",
     "percent": 91.5,
     "type": "normal",
     "power": 40
    },
    {
     "name": "Protect",
     "percent": 85.1,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Volt Switch",
     "percent": 66,
     "type": "electric",
     "power": 70
    },
    {
     "name": "Volt Tackle",
     "percent": 51.1,
     "type": "electric",
     "power": 120
    },
    {
     "name": "Rising Voltage",
     "percent": 44.7,
     "type": "electric",
     "power": 70
    },
    {
     "name": "Play Rough",
     "percent": 17,
     "type": "fairy",
     "power": 90
    },
    {
     "name": "Knock Off",
     "percent": 6.4,
     "type": "dark",
     "power": 65
    },
    {
     "name": "Drain Punch",
     "percent": 6.4,
     "type": "fighting",
     "power": 75
    }
   ],
   "abilities": [
    {
     "name": "Lightning Rod",
     "percent": 89.4
    },
    {
     "name": "Static",
     "percent": 10.6
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Sneasler",
     "percent": 42.6
    },
    {
     "name": "Archaludon",
     "percent": 36.2
    },
    {
     "name": "Pelipper",
     "percent": 31.9
    },
    {
     "name": "Incineroar",
     "percent": 21.3
    },
    {
     "name": "Farigiraf",
     "percent": 21.3
    },
    {
     "name": "Basculegion",
     "percent": 19.1
    }
   ]
  }
 },
 {
  "n": "Méga-Raichu Y",
  "name": "Raichu-Mega-Y",
  "slug": "raichumegay",
  "types": [
   "electric"
  ],
  "stats": [
   60,
   100,
   55,
   160,
   80,
   130
  ],
  "bst": 585,
  "abilities": [
   "No Guard"
  ],
  "mega": "Raichu",
  "gem": "Raichunite Y",
  "tier": null,
  "meta": {
   "usage": 13.52,
   "rank": 11,
   "winrate": 53.305,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Zap Cannon",
     "percent": 99.7,
     "type": "electric",
     "power": 120
    },
    {
     "name": "Focus Blast",
     "percent": 99.4,
     "type": "fighting",
     "power": 120
    },
    {
     "name": "Protect",
     "percent": 98.7,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Fake Out",
     "percent": 75.5,
     "type": "normal",
     "power": 40
    },
    {
     "name": "Encore",
     "percent": 19.5,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Volt Switch",
     "percent": 1.9,
     "type": "electric",
     "power": 70
    },
    {
     "name": "Grass Knot",
     "percent": 1.3,
     "type": "grass",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Lightning Rod",
     "percent": 98.2
    },
    {
     "name": "Static",
     "percent": 1.8
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 84.8
    },
    {
     "name": "Gholdengo",
     "percent": 65.6
    },
    {
     "name": "Arcanine-Hisui",
     "percent": 49.5
    },
    {
     "name": "Sneasler",
     "percent": 36.8
    },
    {
     "name": "Sylveon",
     "percent": 32.1
    },
    {
     "name": "Staraptor-Mega",
     "percent": 31.5
    }
   ]
  }
 },
 {
  "n": "Sneazer",
  "name": "Sneazer",
  "slug": "sneazer",
  "types": [
   "poison",
   "fighting"
  ],
  "stats": [
   65,
   80,
   50,
   50,
   50,
   105
  ],
  "bst": 400,
  "abilities": [
   "Unburden",
   "Frisk"
  ],
  "mega": null,
  "gem": null,
  "tier": null
 },
 {
  "n": "Indeedee Femelle",
  "name": "Indeedee-F",
  "slug": "indeedeef",
  "types": [
   "psychic",
   "normal"
  ],
  "stats": [
   70,
   55,
   65,
   95,
   105,
   85
  ],
  "bst": 475,
  "abilities": [
   "Own Tempo",
   "Synchronize",
   "Psychic Surge"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU",
  "meta": {
   "usage": 11.79,
   "rank": 16,
   "winrate": 45.376,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Follow Me",
     "percent": 99.1,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Trick Room",
     "percent": 88.5,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Helping Hand",
     "percent": 83.1,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Psychic",
     "percent": 66.5,
     "type": "psychic",
     "power": 90
    },
    {
     "name": "Protect",
     "percent": 19.3,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Terrain Pulse",
     "percent": 16.5,
     "type": "normal",
     "power": 50
    },
    {
     "name": "Imprison",
     "percent": 8.1,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Dazzling Gleam",
     "percent": 3.7,
     "type": "fairy",
     "power": 80
    }
   ],
   "abilities": [
    {
     "name": "Psychic Surge",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Colbur Berry",
     "percent": 37.2
    },
    {
     "name": "Rocky Helmet",
     "percent": 26.1
    },
    {
     "name": "Psychic Seed",
     "percent": 20.4
    },
    {
     "name": "Sitrus Berry",
     "percent": 10.5
    }
   ],
   "partners": [
    {
     "name": "Sneasler",
     "percent": 47.6
    },
    {
     "name": "Gardevoir-Mega",
     "percent": 36.4
    },
    {
     "name": "Armarouge",
     "percent": 27.2
    },
    {
     "name": "Golisopod-Mega",
     "percent": 25.5
    },
    {
     "name": "Basculegion",
     "percent": 25.5
    },
    {
     "name": "Kingambit",
     "percent": 20.6
    }
   ]
  }
 },
 {
  "n": "Golisopod",
  "name": "Golisopod",
  "slug": "golisopod",
  "types": [
   "bug",
   "water"
  ],
  "stats": [
   75,
   125,
   140,
   60,
   90,
   40
  ],
  "bst": 530,
  "abilities": [
   "Emergency Exit"
  ],
  "mega": null,
  "gem": null,
  "tier": null
 },
 {
  "n": "Méga-Golisopod",
  "name": "Golisopod-Mega",
  "slug": "golisopodmega",
  "types": [
   "bug",
   "steel"
  ],
  "stats": [
   75,
   150,
   175,
   70,
   120,
   40
  ],
  "bst": 630,
  "abilities": [
   "Tough Claws"
  ],
  "mega": "Golisopod",
  "gem": "Golisopite",
  "tier": null
 },
 {
  "n": "Floette Fleur Éternelle",
  "name": "Floette-Eternal",
  "slug": "floetteeternal",
  "types": [
   "fairy"
  ],
  "stats": [
   74,
   65,
   67,
   125,
   128,
   92
  ],
  "bst": 551,
  "abilities": [
   "Flower Veil",
   "Symbiosis"
  ],
  "mega": null,
  "gem": null,
  "tier": null
 },
 {
  "n": "Méga-Floette",
  "name": "Floette-Mega",
  "slug": "floettemega",
  "types": [
   "fairy"
  ],
  "stats": [
   74,
   85,
   87,
   155,
   148,
   102
  ],
  "bst": 651,
  "abilities": [
   "Fairy Aura"
  ],
  "mega": "Floette-Eternal",
  "gem": "Floettite",
  "tier": null
 },
 {
  "n": "Farigiraf",
  "name": "Farigiraf",
  "slug": "farigiraf",
  "types": [
   "normal",
   "psychic"
  ],
  "stats": [
   120,
   90,
   70,
   110,
   70,
   60
  ],
  "bst": 520,
  "abilities": [
   "Cud Chew",
   "Armor Tail",
   "Sap Sipper"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU",
  "meta": {
   "usage": 15.21,
   "rank": 10,
   "winrate": 47.938,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Trick Room",
     "percent": 97.1,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Psychic",
     "percent": 60.1,
     "type": "psychic",
     "power": 90
    },
    {
     "name": "Protect",
     "percent": 60,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Helping Hand",
     "percent": 49.3,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Thunderbolt",
     "percent": 48.5,
     "type": "electric",
     "power": 90
    },
    {
     "name": "Twin Beam",
     "percent": 16.8,
     "type": "psychic",
     "power": 40
    },
    {
     "name": "Expanding Force",
     "percent": 15.4,
     "type": "psychic",
     "power": 80
    },
    {
     "name": "Hyper Voice",
     "percent": 12.4,
     "type": "normal",
     "power": 90
    }
   ],
   "abilities": [
    {
     "name": "Armor Tail",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Sitrus Berry",
     "percent": 63.4
    },
    {
     "name": "Colbur Berry",
     "percent": 17
    },
    {
     "name": "Grassy Seed",
     "percent": 12.2
    },
    {
     "name": "Mental Herb",
     "percent": 1.3
    }
   ],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 47
    },
    {
     "name": "Golisopod-Mega",
     "percent": 37.5
    },
    {
     "name": "Incineroar",
     "percent": 30.4
    },
    {
     "name": "Kingambit",
     "percent": 28.5
    },
    {
     "name": "Salamence-Mega",
     "percent": 21.1
    },
    {
     "name": "Sylveon",
     "percent": 21.1
    }
   ]
  }
 },
 {
  "n": "Pelipper",
  "name": "Pelipper",
  "slug": "pelipper",
  "types": [
   "water",
   "flying"
  ],
  "stats": [
   60,
   50,
   100,
   95,
   70,
   65
  ],
  "bst": 440,
  "abilities": [
   "Keen Eye",
   "Drizzle",
   "Rain Dish"
  ],
  "mega": null,
  "gem": null,
  "tier": "UUBL",
  "meta": {
   "usage": 12.78,
   "rank": 14,
   "winrate": 49.507,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Hurricane",
     "percent": 98.5,
     "type": "flying",
     "power": 110
    },
    {
     "name": "Weather Ball",
     "percent": 95.3,
     "type": "normal",
     "power": 50
    },
    {
     "name": "Tailwind",
     "percent": 85,
     "type": "flying",
     "power": 0
    },
    {
     "name": "Wide Guard",
     "percent": 65.1,
     "type": "rock",
     "power": 0
    },
    {
     "name": "Protect",
     "percent": 38.4,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Muddy Water",
     "percent": 4.6,
     "type": "water",
     "power": 90
    },
    {
     "name": "Ice Beam",
     "percent": 4,
     "type": "ice",
     "power": 90
    },
    {
     "name": "Icy Wind",
     "percent": 2.3,
     "type": "ice",
     "power": 55
    }
   ],
   "abilities": [
    {
     "name": "Drizzle",
     "percent": 98.7
    },
    {
     "name": "Keen Eye",
     "percent": 1.3
    }
   ],
   "items": [
    {
     "name": "Focus Sash",
     "percent": 47.9
    },
    {
     "name": "Sitrus Berry",
     "percent": 37.8
    },
    {
     "name": "Life Orb",
     "percent": 4.9
    },
    {
     "name": "Damp Rock",
     "percent": 3.7
    }
   ],
   "partners": [
    {
     "name": "Archaludon",
     "percent": 63.8
    },
    {
     "name": "Golisopod-Mega",
     "percent": 58.9
    },
    {
     "name": "Sneasler",
     "percent": 32.4
    },
    {
     "name": "Rillaboom",
     "percent": 31.3
    },
    {
     "name": "Basculegion",
     "percent": 30.7
    },
    {
     "name": "Swampert-Mega",
     "percent": 24.7
    }
   ]
  }
 },
 {
  "n": "Arcanine de Hisui",
  "name": "Arcanine-Hisui",
  "slug": "arcaninehisui",
  "types": [
   "fire",
   "rock"
  ],
  "stats": [
   95,
   115,
   80,
   95,
   80,
   90
  ],
  "bst": 555,
  "abilities": [
   "Intimidate",
   "Flash Fire",
   "Rock Head"
  ],
  "mega": null,
  "gem": null,
  "tier": "UU",
  "meta": {
   "usage": 15.68,
   "rank": 9,
   "winrate": 51.939,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Flare Blitz",
     "percent": 99.6,
     "type": "fire",
     "power": 120
    },
    {
     "name": "Protect",
     "percent": 98,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Head Smash",
     "percent": 96.4,
     "type": "rock",
     "power": 150
    },
    {
     "name": "Extreme Speed",
     "percent": 93.2,
     "type": "normal",
     "power": 80
    },
    {
     "name": "Rock Slide",
     "percent": 7.3,
     "type": "rock",
     "power": 75
    },
    {
     "name": "Close Combat",
     "percent": 2,
     "type": "fighting",
     "power": 120
    }
   ],
   "abilities": [
    {
     "name": "Rock Head",
     "percent": 96.7
    },
    {
     "name": "Intimidate",
     "percent": 3.4
    }
   ],
   "items": [
    {
     "name": "Focus Sash",
     "percent": 96.1
    },
    {
     "name": "Choice Scarf",
     "percent": 1.5
    }
   ],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 81.3
    },
    {
     "name": "Salamence-Mega",
     "percent": 57.1
    },
    {
     "name": "Sneasler",
     "percent": 49.7
    },
    {
     "name": "Gholdengo",
     "percent": 46.4
    },
    {
     "name": "Raichu-Mega-Y",
     "percent": 42.7
    },
    {
     "name": "Kingambit",
     "percent": 33.6
    }
   ]
  }
 },
 {
  "n": "Gholdengo",
  "name": "Gholdengo",
  "slug": "gholdengo",
  "types": [
   "steel",
   "ghost"
  ],
  "stats": [
   87,
   60,
   95,
   133,
   91,
   84
  ],
  "bst": 550,
  "abilities": [
   "Good as Gold"
  ],
  "mega": null,
  "gem": null,
  "tier": "OU",
  "meta": {
   "usage": 21.51,
   "rank": 6,
   "winrate": 52.532,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Make It Rain",
     "percent": 99.7,
     "type": "steel",
     "power": 120
    },
    {
     "name": "Shadow Ball",
     "percent": 99.5,
     "type": "ghost",
     "power": 80
    },
    {
     "name": "Protect",
     "percent": 96.2,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Nasty Plot",
     "percent": 89.9,
     "type": "dark",
     "power": 0
    },
    {
     "name": "Power Gem",
     "percent": 7.8,
     "type": "rock",
     "power": 80
    },
    {
     "name": "Trick",
     "percent": 1.7,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Thunderbolt",
     "percent": 1.7,
     "type": "electric",
     "power": 90
    },
    {
     "name": "Dazzling Gleam",
     "percent": 1,
     "type": "fairy",
     "power": 80
    }
   ],
   "abilities": [
    {
     "name": "Good as Gold",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Life Orb",
     "percent": 81.5
    },
    {
     "name": "Grassy Seed",
     "percent": 8.4
    },
    {
     "name": "Choice Scarf",
     "percent": 2.9
    },
    {
     "name": "Leftovers",
     "percent": 2.3
    }
   ],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 81
    },
    {
     "name": "Salamence-Mega",
     "percent": 49.5
    },
    {
     "name": "Sneasler",
     "percent": 46.5
    },
    {
     "name": "Raichu-Mega-Y",
     "percent": 41.3
    },
    {
     "name": "Incineroar",
     "percent": 36
    },
    {
     "name": "Arcanine-Hisui",
     "percent": 33.8
    }
   ]
  }
 },
 {
  "n": "Charizard",
  "name": "Charizard",
  "slug": "charizard",
  "types": [
   "fire",
   "flying"
  ],
  "stats": [
   78,
   84,
   78,
   109,
   85,
   100
  ],
  "bst": 534,
  "abilities": [
   "Blaze",
   "Solar Power"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZUBL"
 },
 {
  "n": "Sylveon",
  "name": "Sylveon",
  "slug": "sylveon",
  "types": [
   "fairy"
  ],
  "stats": [
   95,
   65,
   65,
   110,
   130,
   60
  ],
  "bst": 525,
  "abilities": [
   "Cute Charm",
   "Pixilate"
  ],
  "mega": null,
  "gem": null,
  "tier": "NU",
  "meta": {
   "usage": 11.91,
   "rank": 15,
   "winrate": 49.084,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Hyper Voice",
     "percent": 99.8,
     "type": "normal",
     "power": 90
    },
    {
     "name": "Hyper Beam",
     "percent": 88.1,
     "type": "normal",
     "power": 150
    },
    {
     "name": "Quick Attack",
     "percent": 82.4,
     "type": "normal",
     "power": 40
    },
    {
     "name": "Detect",
     "percent": 71.4,
     "type": "fighting",
     "power": 0
    },
    {
     "name": "Protect",
     "percent": 26.8,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Yawn",
     "percent": 10,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Mystical Fire",
     "percent": 4.8,
     "type": "fire",
     "power": 75
    },
    {
     "name": "Calm Mind",
     "percent": 4.5,
     "type": "psychic",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Pixilate",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Fairy Feather",
     "percent": 92.4
    },
    {
     "name": "Life Orb",
     "percent": 4.1
    },
    {
     "name": "Leftovers",
     "percent": 1.5
    }
   ],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 62
    },
    {
     "name": "Arcanine-Hisui",
     "percent": 38.9
    },
    {
     "name": "Raichu-Mega-Y",
     "percent": 36.5
    },
    {
     "name": "Salamence-Mega",
     "percent": 35.1
    },
    {
     "name": "Gholdengo",
     "percent": 31.9
    },
    {
     "name": "Kingambit",
     "percent": 31.4
    }
   ]
  }
 },
 {
  "n": "Méga-Charizard Y",
  "name": "Charizard-Mega-Y",
  "slug": "charizardmegay",
  "types": [
   "fire",
   "flying"
  ],
  "stats": [
   78,
   104,
   78,
   159,
   115,
   100
  ],
  "bst": 634,
  "abilities": [
   "Drought"
  ],
  "mega": "Charizard",
  "gem": "Charizardite Y",
  "tier": null,
  "meta": {
   "usage": 9.97,
   "rank": 19,
   "winrate": 50.352,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Heat Wave",
     "percent": 99.5,
     "type": "fire",
     "power": 95
    },
    {
     "name": "Protect",
     "percent": 99.2,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Weather Ball",
     "percent": 91.7,
     "type": "normal",
     "power": 50
    },
    {
     "name": "Solar Beam",
     "percent": 44.5,
     "type": "grass",
     "power": 120
    },
    {
     "name": "Ancient Power",
     "percent": 42.5,
     "type": "rock",
     "power": 60
    },
    {
     "name": "Hurricane",
     "percent": 13.1,
     "type": "flying",
     "power": 110
    },
    {
     "name": "Air Slash",
     "percent": 2.6,
     "type": "flying",
     "power": 75
    },
    {
     "name": "Dragon Pulse",
     "percent": 1.1,
     "type": "dragon",
     "power": 85
    }
   ],
   "abilities": [
    {
     "name": "Blaze",
     "percent": 88.6
    },
    {
     "name": "Solar Power",
     "percent": 11.4
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Sneasler",
     "percent": 34.4
    },
    {
     "name": "Rillaboom",
     "percent": 34.2
    },
    {
     "name": "Kingambit",
     "percent": 32.6
    },
    {
     "name": "Garchomp",
     "percent": 32.6
    },
    {
     "name": "Sylveon",
     "percent": 28.5
    },
    {
     "name": "Venusaur",
     "percent": 27.3
    }
   ]
  }
 },
 {
  "n": "Tyranitar",
  "name": "Tyranitar",
  "slug": "tyranitar",
  "types": [
   "rock",
   "dark"
  ],
  "stats": [
   100,
   134,
   110,
   95,
   100,
   61
  ],
  "bst": 600,
  "abilities": [
   "Sand Stream",
   "Unnerve"
  ],
  "mega": null,
  "gem": null,
  "tier": "UU",
  "meta": {
   "usage": 1.91,
   "rank": 51,
   "winrate": 45.527,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Rock Slide",
     "percent": 97,
     "type": "rock",
     "power": 75
    },
    {
     "name": "Knock Off",
     "percent": 91.7,
     "type": "dark",
     "power": 65
    },
    {
     "name": "Protect",
     "percent": 67.9,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Low Kick",
     "percent": 65.5,
     "type": "fighting",
     "power": 0
    },
    {
     "name": "Ice Punch",
     "percent": 30.4,
     "type": "ice",
     "power": 75
    },
    {
     "name": "High Horsepower",
     "percent": 11.3,
     "type": "ground",
     "power": 95
    },
    {
     "name": "Dragon Dance",
     "percent": 4.8,
     "type": "dragon",
     "power": 0
    },
    {
     "name": "Heavy Slam",
     "percent": 2.4,
     "type": "steel",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Sand Stream",
     "percent": 98.8
    },
    {
     "name": "Unnerve",
     "percent": 1.2
    }
   ],
   "items": [
    {
     "name": "Choice Scarf",
     "percent": 28.6
    },
    {
     "name": "Chople Berry",
     "percent": 25
    },
    {
     "name": "Focus Sash",
     "percent": 10.1
    },
    {
     "name": "Passho Berry",
     "percent": 7.7
    }
   ],
   "partners": [
    {
     "name": "Salamence-Mega",
     "percent": 49.4
    },
    {
     "name": "Excadrill",
     "percent": 48.8
    },
    {
     "name": "Sneasler",
     "percent": 39.9
    },
    {
     "name": "Rillaboom",
     "percent": 32.1
    },
    {
     "name": "Indeedee",
     "percent": 31
    },
    {
     "name": "Gholdengo",
     "percent": 21.4
    }
   ]
  }
 },
 {
  "n": "Gardevoir",
  "name": "Gardevoir",
  "slug": "gardevoir",
  "types": [
   "psychic",
   "fairy"
  ],
  "stats": [
   68,
   65,
   65,
   125,
   115,
   80
  ],
  "bst": 518,
  "abilities": [
   "Synchronize",
   "Trace",
   "Telepathy"
  ],
  "mega": null,
  "gem": null,
  "tier": "RU"
 },
 {
  "n": "Méga-Gardevoir",
  "name": "Gardevoir-Mega",
  "slug": "gardevoirmega",
  "types": [
   "psychic",
   "fairy"
  ],
  "stats": [
   68,
   85,
   65,
   165,
   135,
   100
  ],
  "bst": 618,
  "abilities": [
   "Pixilate"
  ],
  "mega": "Gardevoir",
  "gem": "Gardevoirite",
  "tier": null,
  "meta": {
   "usage": 8,
   "rank": 20,
   "winrate": 44.917,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Protect",
     "percent": 98.4,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Hyper Voice",
     "percent": 98,
     "type": "normal",
     "power": 90
    },
    {
     "name": "Expanding Force",
     "percent": 93.7,
     "type": "psychic",
     "power": 80
    },
    {
     "name": "Trick Room",
     "percent": 46,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Thunderbolt",
     "percent": 14.8,
     "type": "electric",
     "power": 90
    },
    {
     "name": "Mystical Fire",
     "percent": 11.1,
     "type": "fire",
     "power": 75
    },
    {
     "name": "Calm Mind",
     "percent": 10.5,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Aura Sphere",
     "percent": 7.3,
     "type": "fighting",
     "power": 80
    }
   ],
   "abilities": [
    {
     "name": "Trace",
     "percent": 78.4
    },
    {
     "name": "Synchronize",
     "percent": 14.6
    },
    {
     "name": "Telepathy",
     "percent": 6.9
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Sneasler",
     "percent": 69.8
    },
    {
     "name": "Indeedee-F",
     "percent": 53.7
    },
    {
     "name": "Basculegion",
     "percent": 48.7
    },
    {
     "name": "Indeedee",
     "percent": 40.9
    },
    {
     "name": "Golisopod-Mega",
     "percent": 27.9
    },
    {
     "name": "Pelipper",
     "percent": 25.8
    }
   ]
  }
 },
 {
  "n": "Lucario",
  "name": "Lucario",
  "slug": "lucario",
  "types": [
   "fighting",
   "steel"
  ],
  "stats": [
   70,
   110,
   70,
   115,
   70,
   90
  ],
  "bst": 525,
  "abilities": [
   "Steadfast",
   "Inner Focus",
   "Justified"
  ],
  "mega": null,
  "gem": null,
  "tier": "NUBL"
 },
 {
  "n": "Whimsicott",
  "name": "Whimsicott",
  "slug": "whimsicott",
  "types": [
   "grass",
   "fairy"
  ],
  "stats": [
   60,
   67,
   85,
   77,
   75,
   116
  ],
  "bst": 480,
  "abilities": [
   "Prankster",
   "Infiltrator",
   "Chlorophyll"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU",
  "meta": {
   "usage": 6.04,
   "rank": 27,
   "winrate": 47.385,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Tailwind",
     "percent": 99.4,
     "type": "flying",
     "power": 0
    },
    {
     "name": "Moonblast",
     "percent": 93.4,
     "type": "fairy",
     "power": 95
    },
    {
     "name": "Encore",
     "percent": 73.4,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Protect",
     "percent": 70.4,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Charm",
     "percent": 12.3,
     "type": "fairy",
     "power": 0
    },
    {
     "name": "Sunny Day",
     "percent": 11.5,
     "type": "fire",
     "power": 0
    },
    {
     "name": "Taunt",
     "percent": 5.1,
     "type": "dark",
     "power": 0
    },
    {
     "name": "Light Screen",
     "percent": 4.5,
     "type": "psychic",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Prankster",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Focus Sash",
     "percent": 77.5
    },
    {
     "name": "Fairy Feather",
     "percent": 8.1
    },
    {
     "name": "Occa Berry",
     "percent": 7.4
    },
    {
     "name": "Sitrus Berry",
     "percent": 1.7
    }
   ],
   "partners": [
    {
     "name": "Basculegion",
     "percent": 36.2
    },
    {
     "name": "Kingambit",
     "percent": 31.7
    },
    {
     "name": "Sneasler",
     "percent": 29.4
    },
    {
     "name": "Charizard-Mega-Y",
     "percent": 25.7
    },
    {
     "name": "Garchomp",
     "percent": 24.9
    },
    {
     "name": "Rillaboom",
     "percent": 22.6
    }
   ]
  }
 },
 {
  "n": "Méga-Lucario",
  "name": "Lucario-Mega",
  "slug": "lucariomega",
  "types": [
   "fighting",
   "steel"
  ],
  "stats": [
   70,
   145,
   88,
   140,
   70,
   112
  ],
  "bst": 625,
  "abilities": [
   "Adaptability"
  ],
  "mega": "Lucario",
  "gem": "Lucarionite",
  "tier": null
 },
 {
  "n": "Méga-Lucario Z",
  "name": "Lucario-Mega-Z",
  "slug": "lucariomegaz",
  "types": [
   "fighting",
   "steel"
  ],
  "stats": [
   70,
   100,
   70,
   164,
   70,
   151
  ],
  "bst": 625,
  "abilities": [
   "Aura Guard"
  ],
  "mega": "Lucario",
  "gem": "Lucarionite Z",
  "tier": null,
  "meta": {
   "usage": 5.69,
   "rank": 31,
   "winrate": 44.13,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Aura Sphere",
     "percent": 97.2,
     "type": "fighting",
     "power": 80
    },
    {
     "name": "Flash Cannon",
     "percent": 90.2,
     "type": "steel",
     "power": 80
    },
    {
     "name": "Protect",
     "percent": 50.9,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Detect",
     "percent": 45.7,
     "type": "fighting",
     "power": 0
    },
    {
     "name": "Calm Mind",
     "percent": 39.3,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Nasty Plot",
     "percent": 21.4,
     "type": "dark",
     "power": 0
    },
    {
     "name": "Dark Pulse",
     "percent": 15,
     "type": "dark",
     "power": 80
    },
    {
     "name": "Steel Beam",
     "percent": 12.2,
     "type": "steel",
     "power": 140
    }
   ],
   "abilities": [
    {
     "name": "Inner Focus",
     "percent": 89.5
    },
    {
     "name": "Steadfast",
     "percent": 7.2
    },
    {
     "name": "Justified",
     "percent": 3.3
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 72.5
    },
    {
     "name": "Incineroar",
     "percent": 55.7
    },
    {
     "name": "Salamence-Mega",
     "percent": 41.9
    },
    {
     "name": "Basculegion",
     "percent": 38.5
    },
    {
     "name": "Sneasler",
     "percent": 31.3
    },
    {
     "name": "Sylveon",
     "percent": 17.8
    }
   ]
  }
 },
 {
  "n": "Raichu",
  "name": "Raichu",
  "slug": "raichu",
  "types": [
   "electric"
  ],
  "stats": [
   60,
   90,
   55,
   90,
   80,
   110
  ],
  "bst": 485,
  "abilities": [
   "Static",
   "Lightning Rod"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU"
 },
 {
  "n": "Méga-Tyranitar",
  "name": "Tyranitar-Mega",
  "slug": "tyranitarmega",
  "types": [
   "rock",
   "dark"
  ],
  "stats": [
   100,
   164,
   150,
   95,
   120,
   71
  ],
  "bst": 700,
  "abilities": [
   "Sand Stream"
  ],
  "mega": "Tyranitar",
  "gem": "Tyranitarite",
  "tier": null,
  "meta": {
   "usage": 6.63,
   "rank": 23,
   "winrate": 50.546,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Rock Slide",
     "percent": 99.1,
     "type": "rock",
     "power": 75
    },
    {
     "name": "Protect",
     "percent": 98.3,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Knock Off",
     "percent": 97.3,
     "type": "dark",
     "power": 65
    },
    {
     "name": "Low Kick",
     "percent": 67.7,
     "type": "fighting",
     "power": 0
    },
    {
     "name": "Dragon Dance",
     "percent": 19.4,
     "type": "dragon",
     "power": 0
    },
    {
     "name": "Ice Punch",
     "percent": 5.8,
     "type": "ice",
     "power": 75
    },
    {
     "name": "High Horsepower",
     "percent": 3.6,
     "type": "ground",
     "power": 95
    },
    {
     "name": "Crunch",
     "percent": 1,
     "type": "dark",
     "power": 80
    }
   ],
   "abilities": [
    {
     "name": "Sand Stream",
     "percent": 100
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Excadrill",
     "percent": 77
    },
    {
     "name": "Salamence-Mega",
     "percent": 69.1
    },
    {
     "name": "Sneasler",
     "percent": 56.4
    },
    {
     "name": "Indeedee",
     "percent": 44.8
    },
    {
     "name": "Milotic",
     "percent": 40.7
    },
    {
     "name": "Gholdengo",
     "percent": 37.8
    }
   ]
  }
 },
 {
  "n": "Excadrill",
  "name": "Excadrill",
  "slug": "excadrill",
  "types": [
   "ground",
   "steel"
  ],
  "stats": [
   110,
   135,
   60,
   50,
   65,
   88
  ],
  "bst": 508,
  "abilities": [
   "Sand Rush",
   "Sand Force",
   "Mold Breaker"
  ],
  "mega": null,
  "gem": null,
  "tier": "UU",
  "meta": {
   "usage": 6.18,
   "rank": 26,
   "winrate": 51.488,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Iron Head",
     "percent": 98.5,
     "type": "steel",
     "power": 80
    },
    {
     "name": "Protect",
     "percent": 97.8,
     "type": "normal",
     "power": 0
    },
    {
     "name": "High Horsepower",
     "percent": 91.3,
     "type": "ground",
     "power": 95
    },
    {
     "name": "Rock Slide",
     "percent": 88,
     "type": "rock",
     "power": 75
    },
    {
     "name": "Earthquake",
     "percent": 17.3,
     "type": "ground",
     "power": 100
    },
    {
     "name": "Rock Tomb",
     "percent": 2.6,
     "type": "rock",
     "power": 60
    }
   ],
   "abilities": [
    {
     "name": "Sand Rush",
     "percent": 98.5
    },
    {
     "name": "Mold Breaker",
     "percent": 1.5
    }
   ],
   "items": [
    {
     "name": "Focus Sash",
     "percent": 88.4
    },
    {
     "name": "Life Orb",
     "percent": 9
    },
    {
     "name": "Expert Belt",
     "percent": 1.1
    }
   ],
   "partners": [
    {
     "name": "Tyranitar-Mega",
     "percent": 82.7
    },
    {
     "name": "Salamence-Mega",
     "percent": 77.1
    },
    {
     "name": "Sneasler",
     "percent": 57.6
    },
    {
     "name": "Indeedee",
     "percent": 48.7
    },
    {
     "name": "Milotic",
     "percent": 44.1
    },
    {
     "name": "Gholdengo",
     "percent": 36.3
    }
   ]
  }
 },
 {
  "n": "Torkoal",
  "name": "Torkoal",
  "slug": "torkoal",
  "types": [
   "fire"
  ],
  "stats": [
   70,
   85,
   140,
   85,
   70,
   20
  ],
  "bst": 470,
  "abilities": [
   "White Smoke",
   "Drought",
   "Shell Armor"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU",
  "meta": {
   "usage": 4.98,
   "rank": 33,
   "winrate": 45.706,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Eruption",
     "percent": 97,
     "type": "fire",
     "power": 150
    },
    {
     "name": "Protect",
     "percent": 89.7,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Weather Ball",
     "percent": 71.2,
     "type": "normal",
     "power": 50
    },
    {
     "name": "Heat Wave",
     "percent": 42.1,
     "type": "fire",
     "power": 95
    },
    {
     "name": "Earth Power",
     "percent": 40.5,
     "type": "ground",
     "power": 90
    },
    {
     "name": "Solar Beam",
     "percent": 20.6,
     "type": "grass",
     "power": 120
    },
    {
     "name": "Helping Hand",
     "percent": 19,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Yawn",
     "percent": 5,
     "type": "normal",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Drought",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Charcoal",
     "percent": 92.4
    },
    {
     "name": "Life Orb",
     "percent": 2.5
    },
    {
     "name": "Leftovers",
     "percent": 1.4
    }
   ],
   "partners": [
    {
     "name": "Farigiraf",
     "percent": 39.4
    },
    {
     "name": "Indeedee-F",
     "percent": 38.7
    },
    {
     "name": "Kingambit",
     "percent": 31.1
    },
    {
     "name": "Hatterene",
     "percent": 28.8
    },
    {
     "name": "Indeedee",
     "percent": 28.1
    },
    {
     "name": "Armarouge",
     "percent": 25.6
    }
   ]
  }
 },
 {
  "n": "Armarouge",
  "name": "Armarouge",
  "slug": "armarouge",
  "types": [
   "fire",
   "psychic"
  ],
  "stats": [
   85,
   60,
   100,
   125,
   80,
   75
  ],
  "bst": 525,
  "abilities": [
   "Flash Fire",
   "Weak Armor"
  ],
  "mega": null,
  "gem": null,
  "tier": "RUBL",
  "meta": {
   "usage": 5.73,
   "rank": 29,
   "winrate": 44.996,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Expanding Force",
     "percent": 94.8,
     "type": "psychic",
     "power": 80
    },
    {
     "name": "Armor Cannon",
     "percent": 77.7,
     "type": "fire",
     "power": 120
    },
    {
     "name": "Protect",
     "percent": 64,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Trick Room",
     "percent": 58.3,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Wide Guard",
     "percent": 40.2,
     "type": "rock",
     "power": 0
    },
    {
     "name": "Heat Wave",
     "percent": 29.2,
     "type": "fire",
     "power": 95
    },
    {
     "name": "Aura Sphere",
     "percent": 14.3,
     "type": "fighting",
     "power": 80
    },
    {
     "name": "Psychic",
     "percent": 3,
     "type": "psychic",
     "power": 90
    }
   ],
   "abilities": [
    {
     "name": "Flash Fire",
     "percent": 96.4
    },
    {
     "name": "Weak Armor",
     "percent": 3.6
    }
   ],
   "items": [
    {
     "name": "Life Orb",
     "percent": 57.9
    },
    {
     "name": "Focus Sash",
     "percent": 16.7
    },
    {
     "name": "Psychic Seed",
     "percent": 7.8
    },
    {
     "name": "Twisted Spoon",
     "percent": 6.8
    }
   ],
   "partners": [
    {
     "name": "Indeedee-F",
     "percent": 56.1
    },
    {
     "name": "Sneasler",
     "percent": 38.8
    },
    {
     "name": "Indeedee",
     "percent": 36.2
    },
    {
     "name": "Golisopod-Mega",
     "percent": 30.2
    },
    {
     "name": "Gardevoir-Mega",
     "percent": 24.7
    },
    {
     "name": "Kingambit",
     "percent": 23.3
    }
   ]
  }
 },
 {
  "n": "Indeedee Mâle",
  "name": "Indeedee",
  "slug": "indeedee",
  "types": [
   "psychic",
   "normal"
  ],
  "stats": [
   60,
   65,
   55,
   105,
   95,
   95
  ],
  "bst": 475,
  "abilities": [
   "Inner Focus",
   "Synchronize",
   "Psychic Surge"
  ],
  "mega": null,
  "gem": null,
  "tier": "PUBL",
  "meta": {
   "usage": 13.14,
   "rank": 13,
   "winrate": 46.925,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Trick Room",
     "percent": 63.7,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Helping Hand",
     "percent": 53,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Expanding Force",
     "percent": 45.1,
     "type": "psychic",
     "power": 80
    },
    {
     "name": "Psychic",
     "percent": 38,
     "type": "psychic",
     "power": 90
    },
    {
     "name": "Protect",
     "percent": 30.6,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Trick",
     "percent": 26.7,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Mystical Fire",
     "percent": 22.1,
     "type": "fire",
     "power": 75
    },
    {
     "name": "Dazzling Gleam",
     "percent": 16.2,
     "type": "fairy",
     "power": 80
    }
   ],
   "abilities": [
    {
     "name": "Psychic Surge",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Choice Scarf",
     "percent": 31.6
    },
    {
     "name": "Colbur Berry",
     "percent": 25.3
    },
    {
     "name": "Rocky Helmet",
     "percent": 12.7
    },
    {
     "name": "Psychic Seed",
     "percent": 9.5
    }
   ],
   "partners": [
    {
     "name": "Sneasler",
     "percent": 66
    },
    {
     "name": "Salamence-Mega",
     "percent": 39.7
    },
    {
     "name": "Gardevoir-Mega",
     "percent": 24.9
    },
    {
     "name": "Excadrill",
     "percent": 22.9
    },
    {
     "name": "Tyranitar-Mega",
     "percent": 22.6
    },
    {
     "name": "Basculegion",
     "percent": 21.2
    }
   ]
  }
 },
 {
  "n": "Baxcalibur",
  "name": "Baxcalibur",
  "slug": "baxcalibur",
  "types": [
   "dragon",
   "ice"
  ],
  "stats": [
   115,
   145,
   92,
   75,
   86,
   87
  ],
  "bst": 600,
  "abilities": [
   "Thermal Exchange",
   "Ice Body"
  ],
  "mega": null,
  "gem": null,
  "tier": "Uber",
  "meta": {
   "usage": null,
   "rank": 78,
   "winrate": 47.557,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Glaive Rush",
     "percent": 95.2,
     "type": "dragon",
     "power": 120
    },
    {
     "name": "Protect",
     "percent": 93.5,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Ice Shard",
     "percent": 79,
     "type": "ice",
     "power": 40
    },
    {
     "name": "Icicle Crash",
     "percent": 56.5,
     "type": "ice",
     "power": 85
    },
    {
     "name": "High Horsepower",
     "percent": 24.2,
     "type": "ground",
     "power": 95
    },
    {
     "name": "Dragon Dance",
     "percent": 12.9,
     "type": "dragon",
     "power": 0
    },
    {
     "name": "Swords Dance",
     "percent": 11.3,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Icicle Spear",
     "percent": 6.5,
     "type": "ice",
     "power": 25
    }
   ],
   "abilities": [
    {
     "name": "Thermal Exchange",
     "percent": 100
    }
   ],
   "items": [
    {
     "name": "Life Orb",
     "percent": 69.4
    },
    {
     "name": "Choice Scarf",
     "percent": 4.8
    },
    {
     "name": "Psychic Seed",
     "percent": 4.8
    },
    {
     "name": "Chople Berry",
     "percent": 3.2
    }
   ],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 50
    },
    {
     "name": "Kingambit",
     "percent": 35.5
    },
    {
     "name": "Froslass-Mega",
     "percent": 29
    },
    {
     "name": "Sneasler",
     "percent": 29
    },
    {
     "name": "Incineroar",
     "percent": 21
    },
    {
     "name": "Volcarona",
     "percent": 19.4
    }
   ]
  }
 },
 {
  "n": "Méga-Baxcalibur",
  "name": "Baxcalibur-Mega",
  "slug": "baxcaliburmega",
  "types": [
   "dragon",
   "ice"
  ],
  "stats": [
   115,
   175,
   117,
   105,
   101,
   87
  ],
  "bst": 700,
  "abilities": [
   "Thermal Exchange",
   "Ice Body"
  ],
  "mega": "Baxcalibur",
  "gem": "Baxcalibrite",
  "tier": null,
  "meta": {
   "usage": 3.35,
   "rank": 40,
   "winrate": 41.775,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Protect",
     "percent": 99,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Glaive Rush",
     "percent": 94.2,
     "type": "dragon",
     "power": 120
    },
    {
     "name": "Ice Shard",
     "percent": 80.3,
     "type": "ice",
     "power": 40
    },
    {
     "name": "Icicle Crash",
     "percent": 44.9,
     "type": "ice",
     "power": 85
    },
    {
     "name": "Swords Dance",
     "percent": 28.6,
     "type": "normal",
     "power": 0
    },
    {
     "name": "High Horsepower",
     "percent": 19,
     "type": "ground",
     "power": 95
    },
    {
     "name": "Dragon Dance",
     "percent": 17.3,
     "type": "dragon",
     "power": 0
    },
    {
     "name": "Icicle Spear",
     "percent": 4.1,
     "type": "ice",
     "power": 25
    }
   ],
   "abilities": [
    {
     "name": "Thermal Exchange",
     "percent": 98.6
    },
    {
     "name": "Ice Body",
     "percent": 1.4
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 67.3
    },
    {
     "name": "Sneasler",
     "percent": 60.5
    },
    {
     "name": "Incineroar",
     "percent": 45.6
    },
    {
     "name": "Basculegion",
     "percent": 30.3
    },
    {
     "name": "Ninetales-Alola",
     "percent": 29.9
    },
    {
     "name": "Kingambit",
     "percent": 20.7
    }
   ]
  }
 },
 {
  "n": "Heatran",
  "name": "Heatran",
  "slug": "heatran",
  "types": [
   "fire",
   "steel"
  ],
  "stats": [
   91,
   90,
   106,
   130,
   106,
   77
  ],
  "bst": 600,
  "abilities": [
   "Flash Fire",
   "Flame Body"
  ],
  "mega": null,
  "gem": null,
  "tier": "UU"
 },
 {
  "n": "Méga-Heatran",
  "name": "Heatran-Mega",
  "slug": "heatranmega",
  "types": [
   "fire",
   "steel"
  ],
  "stats": [
   91,
   120,
   106,
   175,
   141,
   67
  ],
  "bst": 700,
  "abilities": [
   "Flash Fire",
   "Flame Body"
  ],
  "mega": "Heatran",
  "gem": "Heatranite",
  "tier": null
 },
 {
  "n": "Absol",
  "name": "Absol",
  "slug": "absol",
  "types": [
   "dark"
  ],
  "stats": [
   65,
   130,
   60,
   75,
   60,
   75
  ],
  "bst": 465,
  "abilities": [
   "Pressure",
   "Super Luck",
   "Justified"
  ],
  "mega": null,
  "gem": null,
  "tier": null
 },
 {
  "n": "Méga-Absol",
  "name": "Absol-Mega",
  "slug": "absolmega",
  "types": [
   "dark"
  ],
  "stats": [
   65,
   150,
   60,
   115,
   60,
   115
  ],
  "bst": 565,
  "abilities": [
   "Magic Bounce"
  ],
  "mega": "Absol",
  "gem": "Absolite",
  "tier": null
 },
 {
  "n": "Méga-Absol Z",
  "name": "Absol-Mega-Z",
  "slug": "absolmegaz",
  "types": [
   "dark",
   "ghost"
  ],
  "stats": [
   65,
   154,
   60,
   75,
   60,
   151
  ],
  "bst": 565,
  "abilities": [
   "Sharpness"
  ],
  "mega": "Absol",
  "gem": "Absolite Z",
  "tier": null
 },
 {
  "n": "Gyarados",
  "name": "Gyarados",
  "slug": "gyarados",
  "types": [
   "water",
   "flying"
  ],
  "stats": [
   95,
   125,
   79,
   60,
   100,
   81
  ],
  "bst": 540,
  "abilities": [
   "Intimidate",
   "Moxie"
  ],
  "mega": null,
  "gem": null,
  "tier": "RUBL"
 },
 {
  "n": "Méga-Gyarados",
  "name": "Gyarados-Mega",
  "slug": "gyaradosmega",
  "types": [
   "water",
   "dark"
  ],
  "stats": [
   95,
   155,
   109,
   70,
   130,
   81
  ],
  "bst": 640,
  "abilities": [
   "Mold Breaker"
  ],
  "mega": "Gyarados",
  "gem": "Gyaradosite",
  "tier": null
 },
 {
  "n": "Dragalge",
  "name": "Dragalge",
  "slug": "dragalge",
  "types": [
   "poison",
   "dragon"
  ],
  "stats": [
   65,
   75,
   90,
   97,
   123,
   44
  ],
  "bst": 494,
  "abilities": [
   "Poison Point",
   "Poison Touch",
   "Adaptability"
  ],
  "mega": null,
  "gem": null,
  "tier": "PUBL"
 },
 {
  "n": "Méga-Dragalge",
  "name": "Dragalge-Mega",
  "slug": "dragalgemega",
  "types": [
   "poison",
   "dragon"
  ],
  "stats": [
   65,
   85,
   105,
   132,
   163,
   44
  ],
  "bst": 594,
  "abilities": [
   "Regenerator"
  ],
  "mega": "Dragalge",
  "gem": "Dragalgite",
  "tier": null
 },
 {
  "n": "Scolipede",
  "name": "Scolipede",
  "slug": "scolipede",
  "types": [
   "bug",
   "poison"
  ],
  "stats": [
   60,
   100,
   89,
   55,
   69,
   112
  ],
  "bst": 485,
  "abilities": [
   "Poison Point",
   "Swarm",
   "Speed Boost"
  ],
  "mega": null,
  "gem": null,
  "tier": null
 },
 {
  "n": "Méga-Scolipede",
  "name": "Scolipede-Mega",
  "slug": "scolipedemega",
  "types": [
   "bug",
   "poison"
  ],
  "stats": [
   60,
   140,
   149,
   75,
   99,
   62
  ],
  "bst": 585,
  "abilities": [
   "Shell Armor"
  ],
  "mega": "Scolipede",
  "gem": "Scolipite",
  "tier": null
 },
 {
  "n": "Meganium",
  "name": "Meganium",
  "slug": "meganium",
  "types": [
   "grass"
  ],
  "stats": [
   80,
   82,
   100,
   83,
   100,
   80
  ],
  "bst": 525,
  "abilities": [
   "Overgrow",
   "Leaf Guard"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU"
 },
 {
  "n": "Méga-Meganium",
  "name": "Meganium-Mega",
  "slug": "meganiummega",
  "types": [
   "grass",
   "fairy"
  ],
  "stats": [
   80,
   92,
   115,
   143,
   115,
   80
  ],
  "bst": 625,
  "abilities": [
   "Mega Sol"
  ],
  "mega": "Meganium",
  "gem": "Meganiumite",
  "tier": null,
  "meta": {
   "usage": null,
   "rank": 86,
   "winrate": 45.673,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Solar Beam",
     "percent": 97.8,
     "type": "grass",
     "power": 120
    },
    {
     "name": "Weather Ball",
     "percent": 93.5,
     "type": "normal",
     "power": 50
    },
    {
     "name": "Dazzling Gleam",
     "percent": 91.3,
     "type": "fairy",
     "power": 80
    },
    {
     "name": "Protect",
     "percent": 89.1,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Earth Power",
     "percent": 10.9,
     "type": "ground",
     "power": 90
    },
    {
     "name": "Synthesis",
     "percent": 8.7,
     "type": "grass",
     "power": 0
    },
    {
     "name": "Pollen Puff",
     "percent": 4.3,
     "type": "bug",
     "power": 90
    },
    {
     "name": "Ancient Power",
     "percent": 2.2,
     "type": "rock",
     "power": 60
    }
   ],
   "abilities": [
    {
     "name": "Overgrow",
     "percent": 55.8
    },
    {
     "name": "Leaf Guard",
     "percent": 44.2
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Pelipper",
     "percent": 52.2
    },
    {
     "name": "Archaludon",
     "percent": 34.8
    },
    {
     "name": "Sneasler",
     "percent": 34.8
    },
    {
     "name": "Indeedee",
     "percent": 26.1
    },
    {
     "name": "Indeedee-F",
     "percent": 23.9
    },
    {
     "name": "Rillaboom",
     "percent": 23.9
    }
   ]
  }
 },
 {
  "n": "Magearna",
  "name": "Magearna",
  "slug": "magearna",
  "types": [
   "steel",
   "fairy"
  ],
  "stats": [
   80,
   95,
   115,
   130,
   115,
   65
  ],
  "bst": 600,
  "abilities": [
   "Soul-Heart"
  ],
  "mega": null,
  "gem": null,
  "tier": "Uber"
 },
 {
  "n": "Méga-Magearna",
  "name": "Magearna-Mega",
  "slug": "magearnamega",
  "types": [
   "steel",
   "fairy"
  ],
  "stats": [
   80,
   125,
   115,
   170,
   115,
   95
  ],
  "bst": 700,
  "abilities": [
   "Soul-Heart"
  ],
  "mega": "Magearna",
  "gem": "Magearnite",
  "tier": null
 },
 {
  "n": "Starmie",
  "name": "Starmie",
  "slug": "starmie",
  "types": [
   "water",
   "psychic"
  ],
  "stats": [
   60,
   75,
   85,
   100,
   85,
   115
  ],
  "bst": 520,
  "abilities": [
   "Illuminate",
   "Natural Cure",
   "Analytic"
  ],
  "mega": null,
  "gem": null,
  "tier": null
 },
 {
  "n": "Méga-Starmie",
  "name": "Starmie-Mega",
  "slug": "starmiemega",
  "types": [
   "water",
   "psychic"
  ],
  "stats": [
   60,
   100,
   105,
   130,
   105,
   120
  ],
  "bst": 620,
  "abilities": [
   "Huge Power"
  ],
  "mega": "Starmie",
  "gem": "Starminite",
  "tier": null
 },
 {
  "n": "Clefable",
  "name": "Clefable",
  "slug": "clefable",
  "types": [
   "fairy"
  ],
  "stats": [
   95,
   70,
   73,
   95,
   90,
   60
  ],
  "bst": 483,
  "abilities": [
   "Cute Charm",
   "Magic Guard",
   "Unaware"
  ],
  "mega": null,
  "gem": null,
  "tier": "OU",
  "meta": {
   "usage": null,
   "rank": 93,
   "winrate": 47.135,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Follow Me",
     "percent": 94.7,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Moonblast",
     "percent": 81.6,
     "type": "fairy",
     "power": 95
    },
    {
     "name": "Protect",
     "percent": 68.4,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Life Dew",
     "percent": 28.9,
     "type": "water",
     "power": 0
    },
    {
     "name": "Helping Hand",
     "percent": 23.7,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Skill Swap",
     "percent": 18.4,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Icy Wind",
     "percent": 15.8,
     "type": "ice",
     "power": 55
    },
    {
     "name": "Dazzling Gleam",
     "percent": 13.2,
     "type": "fairy",
     "power": 80
    }
   ],
   "abilities": [
    {
     "name": "Unaware",
     "percent": 73.7
    },
    {
     "name": "Magic Guard",
     "percent": 18.4
    },
    {
     "name": "Cute Charm",
     "percent": 7.9
    }
   ],
   "items": [
    {
     "name": "Sitrus Berry",
     "percent": 52.6
    },
    {
     "name": "Leftovers",
     "percent": 34.2
    },
    {
     "name": "Rocky Helmet",
     "percent": 5.3
    },
    {
     "name": "Grassy Seed",
     "percent": 2.6
    }
   ],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 55.3
    },
    {
     "name": "Incineroar",
     "percent": 36.8
    },
    {
     "name": "Lucario-Mega-Z",
     "percent": 34.2
    },
    {
     "name": "Sneasler",
     "percent": 31.6
    },
    {
     "name": "Basculegion",
     "percent": 28.9
    },
    {
     "name": "Kingambit",
     "percent": 21.1
    }
   ]
  }
 },
 {
  "n": "Méga-Clefable",
  "name": "Clefable-Mega",
  "slug": "clefablemega",
  "types": [
   "fairy",
   "flying"
  ],
  "stats": [
   95,
   80,
   93,
   135,
   110,
   70
  ],
  "bst": 583,
  "abilities": [
   "Magic Bounce"
  ],
  "mega": "Clefable",
  "gem": "Clefablite",
  "tier": null,
  "meta": {
   "usage": null,
   "rank": 93,
   "winrate": 47.135,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Follow Me",
     "percent": 94.7,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Moonblast",
     "percent": 81.6,
     "type": "fairy",
     "power": 95
    },
    {
     "name": "Protect",
     "percent": 68.4,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Life Dew",
     "percent": 28.9,
     "type": "water",
     "power": 0
    },
    {
     "name": "Helping Hand",
     "percent": 23.7,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Skill Swap",
     "percent": 18.4,
     "type": "psychic",
     "power": 0
    },
    {
     "name": "Icy Wind",
     "percent": 15.8,
     "type": "ice",
     "power": 55
    },
    {
     "name": "Dazzling Gleam",
     "percent": 13.2,
     "type": "fairy",
     "power": 80
    }
   ],
   "abilities": [
    {
     "name": "Unaware",
     "percent": 73.7
    },
    {
     "name": "Magic Guard",
     "percent": 18.4
    },
    {
     "name": "Cute Charm",
     "percent": 7.9
    }
   ],
   "items": [
    {
     "name": "Sitrus Berry",
     "percent": 52.6
    },
    {
     "name": "Leftovers",
     "percent": 34.2
    },
    {
     "name": "Rocky Helmet",
     "percent": 5.3
    },
    {
     "name": "Grassy Seed",
     "percent": 2.6
    }
   ],
   "partners": [
    {
     "name": "Rillaboom",
     "percent": 55.3
    },
    {
     "name": "Incineroar",
     "percent": 36.8
    },
    {
     "name": "Lucario-Mega-Z",
     "percent": 34.2
    },
    {
     "name": "Sneasler",
     "percent": 31.6
    },
    {
     "name": "Basculegion",
     "percent": 28.9
    },
    {
     "name": "Kingambit",
     "percent": 21.1
    }
   ]
  }
 },
 {
  "n": "Eelektross",
  "name": "Eelektross",
  "slug": "eelektross",
  "types": [
   "electric"
  ],
  "stats": [
   85,
   115,
   80,
   105,
   80,
   50
  ],
  "bst": 515,
  "abilities": [
   "Levitate"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU"
 },
 {
  "n": "Méga-Eelektross",
  "name": "Eelektross-Mega",
  "slug": "eelektrossmega",
  "types": [
   "electric"
  ],
  "stats": [
   85,
   145,
   80,
   135,
   90,
   80
  ],
  "bst": 615,
  "abilities": [
   "Eelevate"
  ],
  "mega": "Eelektross",
  "gem": "Eelektrossite",
  "tier": null
 },
 {
  "n": "Glalie",
  "name": "Glalie",
  "slug": "glalie",
  "types": [
   "ice"
  ],
  "stats": [
   80,
   80,
   80,
   80,
   80,
   80
  ],
  "bst": 480,
  "abilities": [
   "Inner Focus",
   "Ice Body",
   "Moody"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU"
 },
 {
  "n": "Méga-Glalie",
  "name": "Glalie-Mega",
  "slug": "glaliemega",
  "types": [
   "ice"
  ],
  "stats": [
   80,
   120,
   80,
   120,
   80,
   100
  ],
  "bst": 580,
  "abilities": [
   "Refrigerate"
  ],
  "mega": "Glalie",
  "gem": "Glalitite",
  "tier": null
 },
 {
  "n": "Chandelure",
  "name": "Chandelure",
  "slug": "chandelure",
  "types": [
   "ghost",
   "fire"
  ],
  "stats": [
   60,
   55,
   90,
   145,
   90,
   80
  ],
  "bst": 520,
  "abilities": [
   "Flash Fire",
   "Flame Body",
   "Infiltrator"
  ],
  "mega": null,
  "gem": null,
  "tier": "NU"
 },
 {
  "n": "Méga-Chandelure",
  "name": "Chandelure-Mega",
  "slug": "chandeluremega",
  "types": [
   "ghost",
   "fire"
  ],
  "stats": [
   60,
   75,
   110,
   175,
   110,
   90
  ],
  "bst": 620,
  "abilities": [
   "Infiltrator"
  ],
  "mega": "Chandelure",
  "gem": "Chandelurite",
  "tier": null
 },
 {
  "n": "Delphox",
  "name": "Delphox",
  "slug": "delphox",
  "types": [
   "fire",
   "psychic"
  ],
  "stats": [
   75,
   69,
   72,
   114,
   100,
   104
  ],
  "bst": 534,
  "abilities": [
   "Blaze",
   "Magician"
  ],
  "mega": null,
  "gem": null,
  "tier": "PU"
 },
 {
  "n": "Méga-Delphox",
  "name": "Delphox-Mega",
  "slug": "delphoxmega",
  "types": [
   "fire",
   "psychic"
  ],
  "stats": [
   75,
   69,
   72,
   159,
   125,
   134
  ],
  "bst": 634,
  "abilities": [
   "Levitate"
  ],
  "mega": "Delphox",
  "gem": "Delphoxite",
  "tier": null,
  "meta": {
   "usage": 3.28,
   "rank": 41,
   "winrate": 50.237,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Heat Wave",
     "percent": 99.3,
     "type": "fire",
     "power": 95
    },
    {
     "name": "Protect",
     "percent": 98.3,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Nasty Plot",
     "percent": 73.3,
     "type": "dark",
     "power": 0
    },
    {
     "name": "Psychic",
     "percent": 67.7,
     "type": "psychic",
     "power": 90
    },
    {
     "name": "Psyshock",
     "percent": 20.8,
     "type": "psychic",
     "power": 80
    },
    {
     "name": "Expanding Force",
     "percent": 11.5,
     "type": "psychic",
     "power": 80
    },
    {
     "name": "Substitute",
     "percent": 6.6,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Encore",
     "percent": 4.5,
     "type": "normal",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Blaze",
     "percent": 90.7
    },
    {
     "name": "Magician",
     "percent": 9.3
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Sneasler",
     "percent": 60.4
    },
    {
     "name": "Incineroar",
     "percent": 46.9
    },
    {
     "name": "Rillaboom",
     "percent": 44.8
    },
    {
     "name": "Kingambit",
     "percent": 38.2
    },
    {
     "name": "Sinistcha",
     "percent": 32.3
    },
    {
     "name": "Floette-Mega",
     "percent": 18.1
    }
   ]
  }
 },
 {
  "n": "Staraptor",
  "name": "Staraptor",
  "slug": "staraptor",
  "types": [
   "normal",
   "flying"
  ],
  "stats": [
   85,
   120,
   70,
   50,
   60,
   100
  ],
  "bst": 485,
  "abilities": [
   "Intimidate",
   "Reckless"
  ],
  "mega": null,
  "gem": null,
  "tier": "NU",
  "meta": {
   "usage": null,
   "rank": 80,
   "winrate": 43.894,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Close Combat",
     "percent": 96.4,
     "type": "fighting",
     "power": 120
    },
    {
     "name": "Final Gambit",
     "percent": 92.9,
     "type": "fighting",
     "power": 0
    },
    {
     "name": "U-turn",
     "percent": 89.3,
     "type": "bug",
     "power": 70
    },
    {
     "name": "Dual Wingbeat",
     "percent": 57.1,
     "type": "flying",
     "power": 40
    },
    {
     "name": "Brave Bird",
     "percent": 42.9,
     "type": "flying",
     "power": 120
    },
    {
     "name": "Double-Edge",
     "percent": 5.4,
     "type": "normal",
     "power": 120
    },
    {
     "name": "Roost",
     "percent": 5.4,
     "type": "flying",
     "power": 0
    },
    {
     "name": "Protect",
     "percent": 5.4,
     "type": "normal",
     "power": 0
    }
   ],
   "abilities": [
    {
     "name": "Intimidate",
     "percent": 91.1
    },
    {
     "name": "Reckless",
     "percent": 8.9
    }
   ],
   "items": [
    {
     "name": "Choice Scarf",
     "percent": 92.9
    },
    {
     "name": "Quick Claw",
     "percent": 1.8
    }
   ],
   "partners": [
    {
     "name": "Farigiraf",
     "percent": 69.6
    },
    {
     "name": "Golisopod-Mega",
     "percent": 62.5
    },
    {
     "name": "Kingambit",
     "percent": 55.4
    },
    {
     "name": "Politoed",
     "percent": 41.1
    },
    {
     "name": "Pawmot",
     "percent": 28.6
    },
    {
     "name": "Torkoal",
     "percent": 19.6
    }
   ]
  }
 },
 {
  "n": "Méga-Staraptor",
  "name": "Staraptor-Mega",
  "slug": "staraptormega",
  "types": [
   "fighting",
   "flying"
  ],
  "stats": [
   85,
   140,
   100,
   60,
   90,
   110
  ],
  "bst": 585,
  "abilities": [
   "Contrary"
  ],
  "mega": "Staraptor",
  "gem": "Staraptite",
  "tier": null,
  "meta": {
   "usage": 7.06,
   "rank": 22,
   "winrate": 50.376,
   "format": "Champions Duo Règlement M-C",
   "moves": [
    {
     "name": "Close Combat",
     "percent": 99.8,
     "type": "fighting",
     "power": 120
    },
    {
     "name": "Protect",
     "percent": 98.4,
     "type": "normal",
     "power": 0
    },
    {
     "name": "Brave Bird",
     "percent": 93.4,
     "type": "flying",
     "power": 120
    },
    {
     "name": "Tailwind",
     "percent": 73.2,
     "type": "flying",
     "power": 0
    },
    {
     "name": "Roost",
     "percent": 26.5,
     "type": "flying",
     "power": 0
    },
    {
     "name": "Dual Wingbeat",
     "percent": 6.6,
     "type": "flying",
     "power": 40
    }
   ],
   "abilities": [
    {
     "name": "Intimidate",
     "percent": 98.4
    },
    {
     "name": "Reckless",
     "percent": 1.7
    }
   ],
   "items": [],
   "partners": [
    {
     "name": "Gholdengo",
     "percent": 63.1
    },
    {
     "name": "Rillaboom",
     "percent": 62.7
    },
    {
     "name": "Raichu-Mega-Y",
     "percent": 60.3
    },
    {
     "name": "Arcanine-Hisui",
     "percent": 54.8
    },
    {
     "name": "Sylveon",
     "percent": 48.2
    },
    {
     "name": "Milotic",
     "percent": 19.2
    }
   ]
  }
 },
 {
  "n": "Darkrai",
  "name": "Darkrai",
  "slug": "darkrai",
  "types": [
   "dark"
  ],
  "stats": [
   70,
   90,
   90,
   135,
   90,
   125
  ],
  "bst": 600,
  "abilities": [
   "Bad Dreams"
  ],
  "mega": null,
  "gem": null,
  "tier": "OU"
 },
 {
  "n": "Méga-Darkrai",
  "name": "Darkrai-Mega",
  "slug": "darkraimega",
  "types": [
   "dark"
  ],
  "stats": [
   70,
   120,
   130,
   165,
   130,
   85
  ],
  "bst": 700,
  "abilities": [
   "Bad Dreams"
  ],
  "mega": "Darkrai",
  "gem": "Darkranite",
  "tier": null
 },
 {
  "n": "Zeraora",
  "name": "Zeraora",
  "slug": "zeraora",
  "types": [
   "electric"
  ],
  "stats": [
   88,
   112,
   75,
   102,
   80,
   143
  ],
  "bst": 600,
  "abilities": [
   "Volt Absorb"
  ],
  "mega": null,
  "gem": null,
  "tier": null
 },
 {
  "n": "Méga-Zeraora",
  "name": "Zeraora-Mega",
  "slug": "zeraoramega",
  "types": [
   "electric"
  ],
  "stats": [
   88,
   157,
   75,
   147,
   80,
   153
  ],
  "bst": 700,
  "abilities": [
   "Volt Absorb"
  ],
  "mega": "Zeraora",
  "gem": "Zeraorite",
  "tier": null
 },
 {
  "n": "Crabominable",
  "name": "Crabominable",
  "slug": "crabominable",
  "types": [
   "fighting",
   "ice"
  ],
  "stats": [
   97,
   132,
   77,
   62,
   67,
   43
  ],
  "bst": 478,
  "abilities": [
   "Hyper Cutter",
   "Iron Fist",
   "Anger Point"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU"
 },
 {
  "n": "Feraligatr",
  "name": "Feraligatr",
  "slug": "feraligatr",
  "types": [
   "water"
  ],
  "stats": [
   85,
   105,
   100,
   79,
   83,
   78
  ],
  "bst": 530,
  "abilities": [
   "Torrent",
   "Sheer Force"
  ],
  "mega": null,
  "gem": null,
  "tier": "NUBL"
 },
 {
  "n": "Meowstic",
  "name": "Meowstic",
  "slug": "meowstic",
  "types": [
   "psychic"
  ],
  "stats": [
   74,
   48,
   76,
   83,
   81,
   104
  ],
  "bst": 466,
  "abilities": [
   "Keen Eye",
   "Infiltrator",
   "Prankster"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU"
 },
 {
  "n": "Scovilain",
  "name": "Scovillain",
  "slug": "scovillain",
  "types": [
   "grass",
   "fire"
  ],
  "stats": [
   65,
   108,
   65,
   108,
   65,
   75
  ],
  "bst": 486,
  "abilities": [
   "Chlorophyll",
   "Insomnia",
   "Moody"
  ],
  "mega": null,
  "gem": null,
  "tier": "ZU"
 }
];

const ROSTER_BY_SLUG = Object.fromEntries(ROSTER.map(e => [e.slug, e]));
const ROSTER_BY_NAME = Object.fromEntries(ROSTER.map(e => [e.name.toLowerCase(), e]));

const getRosterEntry = key => {
  const k = String(key || "").toLowerCase().trim();
  return ROSTER_BY_SLUG[k] || ROSTER_BY_NAME[k] || null;
};

const META = Object.fromEntries(ROSTER.filter(e => e.meta).map(e => [e.name, e.meta]));
const getMeta = name => META[name] || null;

/* move name -> { type, power } built from the real usage data. */
const MOVE_DATA = {};
ROSTER.forEach(entry => {
  (entry.meta?.moves || []).forEach(m => {
    if (!MOVE_DATA[m.name]) MOVE_DATA[m.name] = { type: m.type || null, power: m.power ?? null };
  });
});
const moveInfo = name => MOVE_DATA[name] || null;
const moveTypeOfName = name => MOVE_DATA[name]?.type || null;
const movePowerOfName = name => MOVE_DATA[name]?.power ?? null;

const STAT_NAMES = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];
const STAT_KEYS = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
/* statValue / evTotal live in typechart.js so they are written only once. */
