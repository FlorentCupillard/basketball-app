import { createSlice } from '@reduxjs/toolkit';

// Données initiales de test pour les équipes
const initialState = {
  teams: [
    {
      id: 'team1',
      nom: 'Los Angeles Lakers',
      logo: 'https://example.com/lakers-logo.png',
      joueurs: ['player1', 'player4', 'player7'],
      statistiquesEquipe: {
        matchsJoues: 65,
        victoires: 42,
        defaites: 23,
        pointsMarques: 7527,
        pointsEncaisses: 7033
      }
    },
    {
      id: 'team2',
      nom: 'Golden State Warriors',
      logo: 'https://example.com/warriors-logo.png',
      joueurs: ['player2', 'player5', 'player8'],
      statistiquesEquipe: {
        matchsJoues: 64,
        victoires: 38,
        defaites: 26,
        pointsMarques: 7360,
        pointsEncaisses: 7125
      }
    },
    {
      id: 'team3',
      nom: 'Boston Celtics',
      logo: 'https://example.com/celtics-logo.png',
      joueurs: ['player3', 'player6', 'player9'],
      statistiquesEquipe: {
        matchsJoues: 65,
        victoires: 40,
        defaites: 25,
        pointsMarques: 7410,
        pointsEncaisses: 7080
      }
    }
  ],
  status: 'idle',
  error: null
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    // Ajouter une équipe
    addTeam: (state, action) => {
      state.teams.push(action.payload);
    },
    
    // Mettre à jour une équipe
    updateTeam: (state, action) => {
      const { id } = action.payload;
      const index = state.teams.findIndex(team => team.id === id);
      if (index !== -1) {
        state.teams[index] = action.payload;
      }
    },
    
    // Supprimer une équipe
    deleteTeam: (state, action) => {
      const id = action.payload;
      state.teams = state.teams.filter(team => team.id !== id);
    },
    
    // Ajouter un joueur à une équipe
    addPlayerToTeam: (state, action) => {
      const { teamId, playerId } = action.payload;
      const team = state.teams.find(team => team.id === teamId);
      if (team && !team.joueurs.includes(playerId)) {
        team.joueurs.push(playerId);
      }
    },
    
    // Retirer un joueur d'une équipe
    removePlayerFromTeam: (state, action) => {
      const { teamId, playerId } = action.payload;
      const team = state.teams.find(team => team.id === teamId);
      if (team) {
        team.joueurs = team.joueurs.filter(id => id !== playerId);
      }
    },
    
    // Mettre à jour les statistiques d'une équipe
    updateTeamStats: (state, action) => {
      const { teamId, stats } = action.payload;
      const team = state.teams.find(team => team.id === teamId);
      if (team) {
        team.statistiquesEquipe = {
          ...team.statistiquesEquipe,
          ...stats
        };
      }
    }
  }
});

export const { 
  addTeam, 
  updateTeam, 
  deleteTeam, 
  addPlayerToTeam, 
  removePlayerFromTeam, 
  updateTeamStats 
} = teamsSlice.actions;

export default teamsSlice.reducer;
