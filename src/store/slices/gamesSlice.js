import { createSlice } from '@reduxjs/toolkit';

// Données initiales de test pour les matchs
const initialState = {
  games: [
    {
      id: 'match1',
      date: '2025-03-25T20:00:00',
      lieuId: 'lieu1',
      equipeLocale: {
        id: 'team1',
        score: 0
      },
      equipeVisiteur: {
        id: 'team2',
        score: 0
      },
      statut: 'à venir',
      periodes: [],
      evenements: [],
      statistiquesJoueurs: []
    },
    {
      id: 'match2',
      date: '2025-03-20T19:00:00',
      lieuId: 'lieu2',
      equipeLocale: {
        id: 'team3',
        score: 105
      },
      equipeVisiteur: {
        id: 'team1',
        score: 98
      },
      statut: 'terminé',
      periodes: [
        { numero: 1, scoreLocal: 28, scoreVisiteur: 25 },
        { numero: 2, scoreLocal: 24, scoreVisiteur: 22 },
        { numero: 3, scoreLocal: 26, scoreVisiteur: 30 },
        { numero: 4, scoreLocal: 27, scoreVisiteur: 21 }
      ],
      evenements: ['event1', 'event2', 'event3'],
      statistiquesJoueurs: [
        {
          joueurId: 'player3',
          equipeId: 'team3',
          minutesJouees: 36,
          points: 32,
          rebonds: 8,
          passesDecisives: 5,
          interceptions: 1,
          contres: 2,
          ballesPerdues: 3,
          fautes: 2,
          tirsReussis: 12,
          tirsTentes: 20,
          tirsA3ptsReussis: 4,
          tirsA3ptsTentes: 8,
          lancersFrancsReussis: 4,
          lancersFrancsTentes: 5
        },
        {
          joueurId: 'player1',
          equipeId: 'team1',
          minutesJouees: 38,
          points: 28,
          rebonds: 10,
          passesDecisives: 7,
          interceptions: 2,
          contres: 1,
          ballesPerdues: 4,
          fautes: 3,
          tirsReussis: 10,
          tirsTentes: 22,
          tirsA3ptsReussis: 2,
          tirsA3ptsTentes: 6,
          lancersFrancsReussis: 6,
          lancersFrancsTentes: 8
        }
      ]
    }
  ],
  status: 'idle',
  error: null
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    // Ajouter un match
    addGame: (state, action) => {
      state.games.push(action.payload);
    },
    
    // Mettre à jour un match
    updateGame: (state, action) => {
      const { id } = action.payload;
      const index = state.games.findIndex(game => game.id === id);
      if (index !== -1) {
        state.games[index] = action.payload;
      }
    },
    
    // Supprimer un match
    deleteGame: (state, action) => {
      const id = action.payload;
      state.games = state.games.filter(game => game.id !== id);
    },
    
    // Mettre à jour le score d'un match
    updateGameScore: (state, action) => {
      const { gameId, equipeLocaleScore, equipeVisiteurScore } = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game) {
        if (equipeLocaleScore !== undefined) {
          game.equipeLocale.score = equipeLocaleScore;
        }
        if (equipeVisiteurScore !== undefined) {
          game.equipeVisiteur.score = equipeVisiteurScore;
        }
      }
    },
    
    // Ajouter une période à un match
    addPeriod: (state, action) => {
      const { gameId, period } = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game) {
        game.periodes.push(period);
      }
    },
    
    // Mettre à jour le statut d'un match
    updateGameStatus: (state, action) => {
      const { gameId, status } = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game) {
        game.statut = status;
      }
    },
    
    // Ajouter un événement à un match
    addEventToGame: (state, action) => {
      const { gameId, eventId } = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game && !game.evenements.includes(eventId)) {
        game.evenements.push(eventId);
      }
    },
    
    // Ajouter ou mettre à jour les statistiques d'un joueur pour un match
    updatePlayerGameStats: (state, action) => {
      const { gameId, playerStats } = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game) {
        const playerIndex = game.statistiquesJoueurs.findIndex(
          stats => stats.joueurId === playerStats.joueurId
        );
        
        if (playerIndex !== -1) {
          game.statistiquesJoueurs[playerIndex] = {
            ...game.statistiquesJoueurs[playerIndex],
            ...playerStats
          };
        } else {
          game.statistiquesJoueurs.push(playerStats);
        }
      }
    }
  }
});

export const { 
  addGame, 
  updateGame, 
  deleteGame, 
  updateGameScore, 
  addPeriod, 
  updateGameStatus, 
  addEventToGame, 
  updatePlayerGameStats 
} = gamesSlice.actions;

export default gamesSlice.reducer;
