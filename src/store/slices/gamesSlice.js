import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { gamesApi } from '../../api/apiService';

// Thunks pour les opérations asynchrones
export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (_, { rejectWithValue }) => {
    try {
      const games = await gamesApi.getAll();
      console.log('Games fetched from API:', games); // Ajout de log pour déboguer
      return games;
    } catch (error) {
      console.error('Error fetching games:', error); // Ajout de log d'erreur
      return rejectWithValue(error.message);
    }
  }
);

export const addGameAsync = createAsyncThunk(
  'games/addGame',
  async (game, { rejectWithValue }) => {
    try {
      return await gamesApi.create(game);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGameAsync = createAsyncThunk(
  'games/updateGame',
  async ({ id, game }, { rejectWithValue }) => {
    try {
      return await gamesApi.update(id, game);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGameScoreAsync = createAsyncThunk(
  'games/updateGameScore',
  async ({ gameId, equipeLocaleScore, equipeVisiteurScore }, { rejectWithValue }) => {
    try {
      const game = await gamesApi.getById(gameId);
      const updatedGame = { ...game };
      
      if (equipeLocaleScore !== undefined) {
        updatedGame.equipeLocale.score = equipeLocaleScore;
      }
      if (equipeVisiteurScore !== undefined) {
        updatedGame.equipeVisiteur.score = equipeVisiteurScore;
      }
      
      return await gamesApi.update(gameId, updatedGame);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateGameStatusAsync = createAsyncThunk(
  'games/updateGameStatus',
  async ({ gameId, status }, { rejectWithValue }) => {
    try {
      const game = await gamesApi.getById(gameId);
      const updatedGame = { ...game, statut: status };
      return await gamesApi.update(gameId, updatedGame);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlayerGameStatsAsync = createAsyncThunk(
  'games/updatePlayerGameStats',
  async ({ gameId, playerStats }, { rejectWithValue }) => {
    try {
      const game = await gamesApi.getById(gameId);
      const updatedGame = { ...game };
      
      const playerIndex = updatedGame.statistiquesJoueurs.findIndex(
        stats => stats.joueurId === playerStats.joueurId
      );
      
      if (playerIndex !== -1) {
        updatedGame.statistiquesJoueurs[playerIndex] = {
          ...updatedGame.statistiquesJoueurs[playerIndex],
          ...playerStats
        };
      } else {
        updatedGame.statistiquesJoueurs.push(playerStats);
      }
      
      return await gamesApi.update(gameId, updatedGame);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteGameAsync = createAsyncThunk(
  'games/deleteGame',
  async (id, { rejectWithValue }) => {
    try {
      await gamesApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  games: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    // Gardons les reducers synchrones pour la compatibilité
    addGame: (state, action) => {
      state.games.push(action.payload);
    },
    
    updateGame: (state, action) => {
      const { id } = action.payload;
      const index = state.games.findIndex(game => game.id === id);
      if (index !== -1) {
        state.games[index] = action.payload;
      }
    },
    
    deleteGame: (state, action) => {
      const id = action.payload;
      state.games = state.games.filter(game => game.id !== id);
    },
    
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
    
    addPeriod: (state, action) => {
      const { gameId, period } = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game) {
        game.periodes.push(period);
      }
    },
    
    updateGameStatus: (state, action) => {
      const { gameId, status } = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game) {
        game.statut = status;
      }
    },
    
    addEventToGame: (state, action) => {
      const { gameId, eventId } = action.payload;
      const game = state.games.find(game => game.id === gameId);
      if (game && !game.evenements.includes(eventId)) {
        game.evenements.push(eventId);
      }
    },
    
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
  },
  extraReducers: (builder) => {
    builder
      // Gestion de fetchGames
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
        console.log('Games loading...'); // Ajout de log pour déboguer
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('Games loaded successfully:', action.payload); // Ajout de log pour déboguer
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Games loading failed:', action.payload); // Ajout de log d'erreur
        state.error = action.payload;
      })
      // Gestion de addGameAsync
      .addCase(addGameAsync.fulfilled, (state, action) => {
        state.games.push(action.payload);
      })
      // Gestion de updateGameAsync
      .addCase(updateGameAsync.fulfilled, (state, action) => {
        const index = state.games.findIndex(game => game.id === action.payload.id);
        if (index !== -1) {
          state.games[index] = action.payload;
        }
      })
      // Gestion de updateGameScoreAsync
      .addCase(updateGameScoreAsync.fulfilled, (state, action) => {
        const index = state.games.findIndex(game => game.id === action.payload.id);
        if (index !== -1) {
          state.games[index] = action.payload;
        }
      })
      // Gestion de updateGameStatusAsync
      .addCase(updateGameStatusAsync.fulfilled, (state, action) => {
        const index = state.games.findIndex(game => game.id === action.payload.id);
        if (index !== -1) {
          state.games[index] = action.payload;
        }
      })
      // Gestion de updatePlayerGameStatsAsync
      .addCase(updatePlayerGameStatsAsync.fulfilled, (state, action) => {
        const index = state.games.findIndex(game => game.id === action.payload.id);
        if (index !== -1) {
          state.games[index] = action.payload;
        }
      })
      // Gestion de deleteGameAsync
      .addCase(deleteGameAsync.fulfilled, (state, action) => {
        state.games = state.games.filter(game => game.id !== action.payload);
      });
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
