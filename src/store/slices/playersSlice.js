import { createSlice } from '@reduxjs/toolkit';

// Données initiales de test pour les joueurs
const initialState = {
  players: [
    {
      id: 'player1',
      nom: 'James',
      prenom: 'LeBron',
      numero: 23,
      poste: 'ailier',
      equipeId: 'team1',
      photo: 'https://example.com/lebron-james.png',
      taille: 206,
      poids: 113,
      dateNaissance: '1984-12-30',
      statistiquesGlobales: {
        matchsJoues: 60,
        minutesJouees: 2112,
        points: 1710,
        rebonds: 468,
        passesDecisives: 492,
        interceptions: 78,
        contres: 48,
        ballesPerdues: 210,
        fautes: 120,
        tirsReussis: 630,
        tirsTentes: 1205,
        tirsA3ptsReussis: 150,
        tirsA3ptsTentes: 415,
        lancersFrancsReussis: 300,
        lancersFrancsTentes: 406
      }
    },
    {
      id: 'player2',
      nom: 'Curry',
      prenom: 'Stephen',
      numero: 30,
      poste: 'meneur',
      equipeId: 'team2',
      photo: 'https://example.com/stephen-curry.png',
      taille: 188,
      poids: 84,
      dateNaissance: '1988-03-14',
      statistiquesGlobales: {
        matchsJoues: 58,
        minutesJouees: 1972,
        points: 1525,
        rebonds: 290,
        passesDecisives: 406,
        interceptions: 87,
        contres: 12,
        ballesPerdues: 174,
        fautes: 116,
        tirsReussis: 520,
        tirsTentes: 1120,
        tirsA3ptsReussis: 285,
        tirsA3ptsTentes: 650,
        lancersFrancsReussis: 200,
        lancersFrancsTentes: 220
      }
    },
    {
      id: 'player3',
      nom: 'Durant',
      prenom: 'Kevin',
      numero: 35,
      poste: 'ailier',
      equipeId: 'team3',
      photo: 'https://example.com/kevin-durant.png',
      taille: 208,
      poids: 109,
      dateNaissance: '1988-09-29',
      statistiquesGlobales: {
        matchsJoues: 55,
        minutesJouees: 1925,
        points: 1485,
        rebonds: 385,
        passesDecisives: 275,
        interceptions: 55,
        contres: 82,
        ballesPerdues: 165,
        fautes: 110,
        tirsReussis: 550,
        tirsTentes: 1050,
        tirsA3ptsReussis: 120,
        tirsA3ptsTentes: 300,
        lancersFrancsReussis: 265,
        lancersFrancsTentes: 290
      }
    }
  ],
  status: 'idle',
  error: null
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    // Ajouter un joueur
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    
    // Mettre à jour un joueur
    updatePlayer: (state, action) => {
      const { id } = action.payload;
      const index = state.players.findIndex(player => player.id === id);
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    
    // Supprimer un joueur
    deletePlayer: (state, action) => {
      const id = action.payload;
      state.players = state.players.filter(player => player.id !== id);
    },
    
    // Changer l'équipe d'un joueur
    changePlayerTeam: (state, action) => {
      const { playerId, teamId } = action.payload;
      const player = state.players.find(player => player.id === playerId);
      if (player) {
        player.equipeId = teamId;
      }
    },
    
    // Mettre à jour les statistiques d'un joueur
    updatePlayerStats: (state, action) => {
      const { playerId, stats } = action.payload;
      const player = state.players.find(player => player.id === playerId);
      if (player) {
        player.statistiquesGlobales = {
          ...player.statistiquesGlobales,
          ...stats
        };
      }
    }
  }
});

export const { 
  addPlayer, 
  updatePlayer, 
  deletePlayer, 
  changePlayerTeam, 
  updatePlayerStats 
} = playersSlice.actions;

export default playersSlice.reducer;
