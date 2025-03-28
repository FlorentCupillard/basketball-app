import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { playersApi } from '../../api/apiService';

// Thunks pour les opérations asynchrones
export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async (_, { rejectWithValue }) => {
    try {
      const players = await playersApi.getAll();
      console.log('Players fetched from API:', players); // Ajout de log pour déboguer
      return players;
    } catch (error) {
      console.error('Error fetching players:', error); // Ajout de log d'erreur
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPlayersByTeam = createAsyncThunk(
  'players/fetchPlayersByTeam',
  async (teamId, { rejectWithValue }) => {
    try {
      return await playersApi.getByTeam(teamId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPlayerAsync = createAsyncThunk(
  'players/addPlayer',
  async (player, { rejectWithValue }) => {
    try {
      return await playersApi.create(player);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlayerAsync = createAsyncThunk(
  'players/updatePlayer',
  async ({ id, player }, { rejectWithValue }) => {
    try {
      return await playersApi.update(id, player);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlayerStatsAsync = createAsyncThunk(
  'players/updatePlayerStats',
  async ({ playerId, stats }, { rejectWithValue }) => {
    try {
      const player = await playersApi.getById(playerId);
      
      // Mettre à jour les statistiques du match
      const updatedPlayer = { 
        ...player,
        statistiquesMatch: {
          ...(player.statistiquesMatch || {}),
          ...stats
        }
      };
      
      return await playersApi.update(playerId, updatedPlayer);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePlayerAsync = createAsyncThunk(
  'players/deletePlayer',
  async (id, { rejectWithValue }) => {
    try {
      await playersApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  players: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    // Gardons les reducers synchrones pour la compatibilité
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    
    updatePlayer: (state, action) => {
      const { id } = action.payload;
      const index = state.players.findIndex(player => player.id === id);
      if (index !== -1) {
        state.players[index] = action.payload;
      }
    },
    
    deletePlayer: (state, action) => {
      const id = action.payload;
      state.players = state.players.filter(player => player.id !== id);
    },
    
    updatePlayerStats: (state, action) => {
      const { playerId, stats } = action.payload;
      const player = state.players.find(player => player.id === playerId);
      if (player) {
        player.statistiquesMatch = {
          ...(player.statistiquesMatch || {}),
          ...stats
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion de fetchPlayers
      .addCase(fetchPlayers.pending, (state) => {
        state.status = 'loading';
        console.log('Players loading...'); // Ajout de log pour déboguer
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Players loaded successfully:', action.payload); // Ajout de log pour déboguer
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Players loading failed:', action.payload); // Ajout de log d'erreur
        state.error = action.payload;
      })
      // Gestion de fetchPlayersByTeam
      .addCase(fetchPlayersByTeam.fulfilled, (state, action) => {
        // Ne pas remplacer tous les joueurs, juste filtrer pour l'affichage
        // Les joueurs spécifiques à l'équipe sont gérés dans le composant
      })
      // Gestion de addPlayerAsync
      .addCase(addPlayerAsync.fulfilled, (state, action) => {
        state.players.push(action.payload);
      })
      // Gestion de updatePlayerAsync
      .addCase(updatePlayerAsync.fulfilled, (state, action) => {
        const index = state.players.findIndex(player => player.id === action.payload.id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
      })
      // Gestion de updatePlayerStatsAsync
      .addCase(updatePlayerStatsAsync.fulfilled, (state, action) => {
        const index = state.players.findIndex(player => player.id === action.payload.id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
      })
      // Gestion de deletePlayerAsync
      .addCase(deletePlayerAsync.fulfilled, (state, action) => {
        state.players = state.players.filter(player => player.id !== action.payload);
      });
  }
});

export const { 
  addPlayer, 
  updatePlayer, 
  deletePlayer, 
  updatePlayerStats 
} = playersSlice.actions;

export default playersSlice.reducer;
