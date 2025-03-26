import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { teamsApi } from '../../api/apiService';

// Thunks pour les opérations asynchrones
export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (_, { rejectWithValue }) => {
    try {
      return await teamsApi.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTeamAsync = createAsyncThunk(
  'teams/addTeam',
  async (team, { rejectWithValue }) => {
    try {
      return await teamsApi.create(team);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTeamAsync = createAsyncThunk(
  'teams/updateTeam',
  async ({ id, team }, { rejectWithValue }) => {
    try {
      return await teamsApi.update(id, team);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTeamAsync = createAsyncThunk(
  'teams/deleteTeam',
  async (id, { rejectWithValue }) => {
    try {
      await teamsApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  teams: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    // Gardons les reducers synchrones pour la compatibilité
    addTeam: (state, action) => {
      state.teams.push(action.payload);
    },
    updateTeam: (state, action) => {
      const { id } = action.payload;
      const index = state.teams.findIndex(team => team.id === id);
      if (index !== -1) {
        state.teams[index] = action.payload;
      }
    },
    deleteTeam: (state, action) => {
      const id = action.payload;
      state.teams = state.teams.filter(team => team.id !== id);
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion de fetchTeams
      .addCase(fetchTeams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Gestion de addTeamAsync
      .addCase(addTeamAsync.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      })
      // Gestion de updateTeamAsync
      .addCase(updateTeamAsync.fulfilled, (state, action) => {
        const index = state.teams.findIndex(team => team.id === action.payload.id);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })
      // Gestion de deleteTeamAsync
      .addCase(deleteTeamAsync.fulfilled, (state, action) => {
        state.teams = state.teams.filter(team => team.id !== action.payload);
      });
  }
});

export const { addTeam, updateTeam, deleteTeam } = teamsSlice.actions;

export default teamsSlice.reducer;
