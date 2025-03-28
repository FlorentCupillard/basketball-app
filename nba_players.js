const nbaPlayers = [
  // Los Angeles Lakers
  {
    "id": "lebron_james",
    "prenom": "LeBron",
    "nom": "James",
    "numero": 23,
    "equipeId": "lakers",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
    "statistiquesGlobales": {
      "points": 25.7,
      "rebonds": 7.3,
      "passesDecisives": 8.3
    }
  },
  {
    "id": "anthony_davis",
    "prenom": "Anthony",
    "nom": "Davis",
    "numero": 3,
    "equipeId": "lakers",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203076.png",
    "statistiquesGlobales": {
      "points": 24.7,
      "rebonds": 12.5,
      "passesDecisives": 3.5
    }
  },
  {
    "id": "austin_reaves",
    "prenom": "Austin",
    "nom": "Reaves",
    "numero": 15,
    "equipeId": "lakers",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1630559.png",
    "statistiquesGlobales": {
      "points": 15.9,
      "rebonds": 4.2,
      "passesDecisives": 5.5
    }
  },
  {
    "id": "dangelo_russell",
    "prenom": "D'Angelo",
    "nom": "Russell",
    "numero": 1,
    "equipeId": "lakers",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1626156.png",
    "statistiquesGlobales": {
      "points": 18.0,
      "rebonds": 3.1,
      "passesDecisives": 6.3
    }
  },
  {
    "id": "rui_hachimura",
    "prenom": "Rui",
    "nom": "Hachimura",
    "numero": 28,
    "equipeId": "lakers",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629060.png",
    "statistiquesGlobales": {
      "points": 13.6,
      "rebonds": 4.3,
      "passesDecisives": 1.0
    }
  },

  // Boston Celtics
  {
    "id": "jayson_tatum",
    "prenom": "Jayson",
    "nom": "Tatum",
    "numero": 0,
    "equipeId": "celtics",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png",
    "statistiquesGlobales": {
      "points": 26.9,
      "rebonds": 8.1,
      "passesDecisives": 4.9
    }
  },
  {
    "id": "jaylen_brown",
    "prenom": "Jaylen",
    "nom": "Brown",
    "numero": 7,
    "equipeId": "celtics",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1627759.png",
    "statistiquesGlobales": {
      "points": 23.0,
      "rebonds": 5.5,
      "passesDecisives": 3.6
    }
  },
  {
    "id": "jrue_holiday",
    "prenom": "Jrue",
    "nom": "Holiday",
    "numero": 4,
    "equipeId": "celtics",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/201950.png",
    "statistiquesGlobales": {
      "points": 12.5,
      "rebonds": 5.4,
      "passesDecisives": 4.8
    }
  },
  {
    "id": "kristaps_porzingis",
    "prenom": "Kristaps",
    "nom": "Porzingis",
    "numero": 8,
    "equipeId": "celtics",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/204001.png",
    "statistiquesGlobales": {
      "points": 20.1,
      "rebonds": 7.2,
      "passesDecisives": 2.0
    }
  },
  {
    "id": "derrick_white",
    "prenom": "Derrick",
    "nom": "White",
    "numero": 9,
    "equipeId": "celtics",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628401.png",
    "statistiquesGlobales": {
      "points": 15.2,
      "rebonds": 4.2,
      "passesDecisives": 5.2
    }
  },

  // Golden State Warriors
  {
    "id": "stephen_curry",
    "prenom": "Stephen",
    "nom": "Curry",
    "numero": 30,
    "equipeId": "warriors",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png",
    "statistiquesGlobales": {
      "points": 26.4,
      "rebonds": 4.5,
      "passesDecisives": 5.1
    }
  },
  {
    "id": "draymond_green",
    "prenom": "Draymond",
    "nom": "Green",
    "numero": 23,
    "equipeId": "warriors",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203110.png",
    "statistiquesGlobales": {
      "points": 8.6,
      "rebonds": 7.2,
      "passesDecisives": 6.0
    }
  },
  {
    "id": "andrew_wiggins",
    "prenom": "Andrew",
    "nom": "Wiggins",
    "numero": 22,
    "equipeId": "warriors",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203952.png",
    "statistiquesGlobales": {
      "points": 13.2,
      "rebonds": 4.5,
      "passesDecisives": 1.7
    }
  },
  {
    "id": "jonathan_kuminga",
    "prenom": "Jonathan",
    "nom": "Kuminga",
    "numero": 00,
    "equipeId": "warriors",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1630228.png",
    "statistiquesGlobales": {
      "points": 16.1,
      "rebonds": 4.8,
      "passesDecisives": 2.2
    }
  },
  {
    "id": "brandin_podziemski",
    "prenom": "Brandin",
    "nom": "Podziemski",
    "numero": 2,
    "equipeId": "warriors",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1631218.png",
    "statistiquesGlobales": {
      "points": 9.2,
      "rebonds": 5.8,
      "passesDecisives": 3.7
    }
  },

  // Milwaukee Bucks
  {
    "id": "giannis_antetokounmpo",
    "prenom": "Giannis",
    "nom": "Antetokounmpo",
    "numero": 34,
    "equipeId": "bucks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png",
    "statistiquesGlobales": {
      "points": 30.4,
      "rebonds": 11.5,
      "passesDecisives": 6.5
    }
  },
  {
    "id": "damian_lillard",
    "prenom": "Damian",
    "nom": "Lillard",
    "numero": 0,
    "equipeId": "bucks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203081.png",
    "statistiquesGlobales": {
      "points": 24.3,
      "rebonds": 4.4,
      "passesDecisives": 7.0
    }
  },
  {
    "id": "brook_lopez",
    "prenom": "Brook",
    "nom": "Lopez",
    "numero": 11,
    "equipeId": "bucks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/201572.png",
    "statistiquesGlobales": {
      "points": 12.5,
      "rebonds": 5.2,
      "passesDecisives": 1.6
    }
  },
  {
    "id": "bobby_portis",
    "prenom": "Bobby",
    "nom": "Portis",
    "numero": 9,
    "equipeId": "bucks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1626171.png",
    "statistiquesGlobales": {
      "points": 13.8,
      "rebonds": 7.4,
      "passesDecisives": 1.2
    }
  },
  {
    "id": "khris_middleton",
    "prenom": "Khris",
    "nom": "Middleton",
    "numero": 22,
    "equipeId": "bucks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203114.png",
    "statistiquesGlobales": {
      "points": 15.1,
      "rebonds": 4.7,
      "passesDecisives": 5.3
    }
  },

  // Miami Heat
  {
    "id": "jimmy_butler",
    "prenom": "Jimmy",
    "nom": "Butler",
    "numero": 22,
    "equipeId": "heat",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/202710.png",
    "statistiquesGlobales": {
      "points": 20.8,
      "rebonds": 5.3,
      "passesDecisives": 5.0
    }
  },
  {
    "id": "bam_adebayo",
    "prenom": "Bam",
    "nom": "Adebayo",
    "numero": 13,
    "equipeId": "heat",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628389.png",
    "statistiquesGlobales": {
      "points": 19.3,
      "rebonds": 10.4,
      "passesDecisives": 3.9
    }
  },
  {
    "id": "tyler_herro",
    "prenom": "Tyler",
    "nom": "Herro",
    "numero": 14,
    "equipeId": "heat",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629639.png",
    "statistiquesGlobales": {
      "points": 20.8,
      "rebonds": 5.3,
      "passesDecisives": 4.5
    }
  },
  {
    "id": "terry_rozier",
    "prenom": "Terry",
    "nom": "Rozier",
    "numero": 2,
    "equipeId": "heat",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1626179.png",
    "statistiquesGlobales": {
      "points": 16.4,
      "rebonds": 4.0,
      "passesDecisives": 4.6
    }
  },
  {
    "id": "duncan_robinson",
    "prenom": "Duncan",
    "nom": "Robinson",
    "numero": 55,
    "equipeId": "heat",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629130.png",
    "statistiquesGlobales": {
      "points": 10.5,
      "rebonds": 2.5,
      "passesDecisives": 2.0
    }
  },

  // Denver Nuggets
  {
    "id": "nikola_jokic",
    "prenom": "Nikola",
    "nom": "Jokić",
    "numero": 15,
    "equipeId": "nuggets",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png",
    "statistiquesGlobales": {
      "points": 26.4,
      "rebonds": 12.4,
      "passesDecisives": 9.0
    }
  },
  {
    "id": "jamal_murray",
    "prenom": "Jamal",
    "nom": "Murray",
    "numero": 27,
    "equipeId": "nuggets",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1627750.png",
    "statistiquesGlobales": {
      "points": 21.2,
      "rebonds": 4.1,
      "passesDecisives": 6.5
    }
  },
  {
    "id": "michael_porter",
    "prenom": "Michael",
    "nom": "Porter Jr.",
    "numero": 1,
    "equipeId": "nuggets",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629008.png",
    "statistiquesGlobales": {
      "points": 16.7,
      "rebonds": 7.0,
      "passesDecisives": 1.5
    }
  },
  {
    "id": "aaron_gordon",
    "prenom": "Aaron",
    "nom": "Gordon",
    "numero": 50,
    "equipeId": "nuggets",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203932.png",
    "statistiquesGlobales": {
      "points": 13.9,
      "rebonds": 6.4,
      "passesDecisives": 3.4
    }
  },
  {
    "id": "kentavious_caldwell_pope",
    "prenom": "Kentavious",
    "nom": "Caldwell-Pope",
    "numero": 5,
    "equipeId": "nuggets",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203484.png",
    "statistiquesGlobales": {
      "points": 10.1,
      "rebonds": 2.4,
      "passesDecisives": 2.4
    }
  },

  // Dallas Mavericks
  {
    "id": "luka_doncic",
    "prenom": "Luka",
    "nom": "Dončić",
    "numero": 77,
    "equipeId": "mavericks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png",
    "statistiquesGlobales": {
      "points": 33.9,
      "rebonds": 9.2,
      "passesDecisives": 9.8
    }
  },
  {
    "id": "kyrie_irving",
    "prenom": "Kyrie",
    "nom": "Irving",
    "numero": 11,
    "equipeId": "mavericks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png",
    "statistiquesGlobales": {
      "points": 25.6,
      "rebonds": 5.0,
      "passesDecisives": 5.2
    }
  },
  {
    "id": "pj_washington",
    "prenom": "P.J.",
    "nom": "Washington",
    "numero": 25,
    "equipeId": "mavericks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629023.png",
    "statistiquesGlobales": {
      "points": 12.8,
      "rebonds": 5.5,
      "passesDecisives": 1.8
    }
  },
  {
    "id": "daniel_gafford",
    "prenom": "Daniel",
    "nom": "Gafford",
    "numero": 21,
    "equipeId": "mavericks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1629655.png",
    "statistiquesGlobales": {
      "points": 10.9,
      "rebonds": 7.1,
      "passesDecisives": 1.5
    }
  },
  {
    "id": "dereck_lively",
    "prenom": "Dereck",
    "nom": "Lively II",
    "numero": 2,
    "equipeId": "mavericks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1631171.png",
    "statistiquesGlobales": {
      "points": 8.8,
      "rebonds": 6.9,
      "passesDecisives": 1.1
    }
  },

  // New York Knicks
  {
    "id": "jalen_brunson",
    "prenom": "Jalen",
    "nom": "Brunson",
    "numero": 11,
    "equipeId": "knicks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628973.png",
    "statistiquesGlobales": {
      "points": 28.7,
      "rebonds": 3.6,
      "passesDecisives": 6.7
    }
  },
  {
    "id": "julius_randle",
    "prenom": "Julius",
    "nom": "Randle",
    "numero": 30,
    "equipeId": "knicks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/203944.png",
    "statistiquesGlobales": {
      "points": 24.0,
      "rebonds": 9.2,
      "passesDecisives": 5.0
    }
  },
  {
    "id": "josh_hart",
    "prenom": "Josh",
    "nom": "Hart",
    "numero": 3,
    "equipeId": "knicks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628404.png",
    "statistiquesGlobales": {
      "points": 9.4,
      "rebonds": 8.3,
      "passesDecisives": 4.1
    }
  },
  {
    "id": "donte_divincenzo",
    "prenom": "Donte",
    "nom": "DiVincenzo",
    "numero": 0,
    "equipeId": "knicks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628978.png",
    "statistiquesGlobales": {
      "points": 15.5,
      "rebonds": 3.7,
      "passesDecisives": 2.7
    }
  },
  {
    "id": "og_anunoby",
    "prenom": "OG",
    "nom": "Anunoby",
    "numero": 8,
    "equipeId": "knicks",
    "photo": "https://cdn.nba.com/headshots/nba/latest/1040x760/1628384.png",
    "statistiquesGlobales": {
      "points": 14.1,
      "rebonds": 4.2,
      "passesDecisives": 1.5
    }
  }
];

module.exports = nbaPlayers;
