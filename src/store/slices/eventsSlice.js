import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventsApi } from '../../api/apiService';

// Thunks pour les opérations asynchrones
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      return await eventsApi.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEventsByGame = createAsyncThunk(
  'events/fetchEventsByGame',
  async (gameId, { rejectWithValue }) => {
    try {
      return await eventsApi.getByGame(gameId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEventAsync = createAsyncThunk(
  'events/addEvent',
  async (event, { rejectWithValue }) => {
    try {
      return await eventsApi.create(event);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addShotAsync = createAsyncThunk(
  'events/addShot',
  async (shotEvent, { rejectWithValue }) => {
    try {
      const event = {
        id: `event${Date.now()}`,
        type: 'tir',
        ...shotEvent
      };
      return await eventsApi.create(event);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateEventAsync = createAsyncThunk(
  'events/updateEvent',
  async ({ id, event }, { rejectWithValue }) => {
    try {
      return await eventsApi.update(id, event);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEventAsync = createAsyncThunk(
  'events/deleteEvent',
  async (id, { rejectWithValue }) => {
    try {
      await eventsApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  events: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // Gardons les reducers synchrones pour la compatibilité
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    
    updateEvent: (state, action) => {
      const { id } = action.payload;
      const index = state.events.findIndex(event => event.id === id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    
    deleteEvent: (state, action) => {
      const id = action.payload;
      state.events = state.events.filter(event => event.id !== id);
    },
    
    addShot: (state, action) => {
      const shotEvent = {
        id: `event${state.events.length + 1}`,
        type: 'tir',
        ...action.payload
      };
      state.events.push(shotEvent);
    },
    
    filterEventsByGame: (state, action) => {
      const gameId = action.payload;
      return state.events.filter(event => event.matchId === gameId);
    },
    
    filterShotsByPlayer: (state, action) => {
      const playerId = action.payload;
      return state.events.filter(
        event => event.type === 'tir' && event.joueurId === playerId
      );
    }
  },
  extraReducers: (builder) => {
    builder
      // Gestion de fetchEvents
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Gestion de fetchEventsByGame
      .addCase(fetchEventsByGame.fulfilled, (state, action) => {
        // Ne pas remplacer tous les événements, juste filtrer pour l'affichage
        // Les événements spécifiques au match sont gérés dans le composant
      })
      // Gestion de addEventAsync
      .addCase(addEventAsync.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      // Gestion de addShotAsync
      .addCase(addShotAsync.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      // Gestion de updateEventAsync
      .addCase(updateEventAsync.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      // Gestion de deleteEventAsync
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event.id !== action.payload);
      });
  }
});

export const { 
  addEvent, 
  updateEvent, 
  deleteEvent, 
  addShot, 
  filterEventsByGame, 
  filterShotsByPlayer 
} = eventsSlice.actions;

export default eventsSlice.reducer;
