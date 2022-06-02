const nonFenrisFactions = [
    ["Polania", "Riverwalk", "Submerge", "Camaraderie", "Speed"],
    ["Saxony", "Riverwalk", "Underpass", "Disarm", "Speed"],
    ["Crimea", "Riverwalk", "Wayfare", "Scout", "Speed"],
    ["Nordic", "Riverwalk", "Seaworth", "Artillery", "Speed"],
    ["Rusviet", "Riverwalk", "Township", "People's Army", "Speed"],
    ["Albion", "Burrow", "Rally", "Sword", "Shield"],
    ["Togawa", "Toka", "Suiton", "Ronin", "Shinobi"],
];

const fenrisFactions = [
    ["Vesna", "Riverwalk", "-", "-", "Speed"],
    ["Fenris", "Leap", "Horrify", "Death Ray", "Fanatical"],
];

const playerMats = [
    "Industrial",
    "Engineering",
    "Patriotic",
    "Mechanical",
    "Agricultural",
    "Innovative",
    "Militant"
];

const vesnaMods = [
    "Stealth",
    "Underpass",
    "Township",
    "Regroup",
    "Suiton",
    "Shield",
    "Submerge",
    "Scout",
    "Disarm",
    "Camaraderie",
    "Ronin",
    "Feint",
    "Wayfare",
    "Seaworthy",
    "Artillery",
    "People's Army",
    "Tactics",
    "Sword",
]


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }