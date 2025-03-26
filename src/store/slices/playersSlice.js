import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { playersApi } from '../../api/apiService';

// Thunks pour les opérations asynchrones
export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async (_, { rejectWithValue }) => {
    try {
      return await playersApi.getAll();
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
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion de fetchPlayers
      .addCase(fetchPlayers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
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
      // Gestion de deletePlayerAsync
      .addCase(deletePlayerAsync.fulfilled, (state, action) => {
        state.players = state.players.filter(player => player.id !== action.payload);
      });
  }
});

export const { addPlayer, updatePlayer, deletePlayer } = playersSlice.actions;

export default playersSlice.reducer;
