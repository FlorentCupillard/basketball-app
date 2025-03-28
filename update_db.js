const nbaTeams = require('./nba_teams');
const nbaPlayers = require('./nba_players');
const fs = require('fs');

// Lire le fichier db.json existant
const dbPath = './data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Remplacer les équipes et les joueurs par les nouvelles données NBA
db.teams = nbaTeams;
db.players = nbaPlayers;

// Mettre à jour les références dans les matchs
// Créer un nouveau match entre les Lakers et les Celtics
const newGame = {
  "id": "match_lakers_celtics",
  "date": "2025-04-15T20:00:00",
  "lieuId": "lieu1",
  "equipeLocale": {
    "id": "lakers",
    "score": 0
  },
  "equipeVisiteur": {
    "id": "celtics",
    "score": 0
  },
  "statut": "à venir",
  "periodes": [],
  "evenements": [],
  "statistiquesJoueurs": []
};

// Ajouter le nouveau match à la liste des matchs
db.games.push(newGame);

// Écrire les données mises à jour dans le fichier db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

console.log('Le fichier db.json a été mis à jour avec succès avec les données NBA !');
