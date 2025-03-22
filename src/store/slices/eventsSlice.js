import { createSlice } from '@reduxjs/toolkit';

// Données initiales de test pour les événements (tirs, passes, etc.)
const initialState = {
  events: [
    {
      id: 'event1',
      matchId: 'match2',
      type: 'tir',
      temps: {
        periode: 1,
        tempsRestant: 540 // 9:00 restantes
      },
      joueurId: 'player3',
      equipeId: 'team3',
      details: {
        typeTir: '3pts',
        position: {
          x: 75,
          y: 30
        },
        reussi: true,
        assisteParJoueurId: null
      }
    },
    {
      id: 'event2',
      matchId: 'match2',
      type: 'tir',
      temps: {
        periode: 2,
        tempsRestant: 420 // 7:00 restantes
      },
      joueurId: 'player1',
      equipeId: 'team1',
      details: {
        typeTir: '2pts',
        position: {
          x: 25,
          y: 20
        },
        reussi: true,
        assisteParJoueurId: null
      }
    },
    {
      id: 'event3',
      matchId: 'match2',
      type: 'tir',
      temps: {
        periode: 3,
        tempsRestant: 300 // 5:00 restantes
      },
      joueurId: 'player3',
      equipeId: 'team3',
      details: {
        typeTir: '2pts',
        position: {
          x: 50,
          y: 15
        },
        reussi: false,
        assisteParJoueurId: null
      }
    }
  ],
  status: 'idle',
  error: null
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // Ajouter un événement
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    
    // Mettre à jour un événement
    updateEvent: (state, action) => {
      const { id } = action.payload;
      const index = state.events.findIndex(event => event.id === id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    
    // Supprimer un événement
    deleteEvent: (state, action) => {
      const id = action.payload;
      state.events = state.events.filter(event => event.id !== id);
    },
    
    // Ajouter un tir
    addShot: (state, action) => {
      const shotEvent = {
        id: `event${state.events.length + 1}`,
        type: 'tir',
        ...action.payload
      };
      state.events.push(shotEvent);
    },
    
    // Filtrer les événements par match
    filterEventsByGame: (state, action) => {
      const gameId = action.payload;
      return state.events.filter(event => event.matchId === gameId);
    },
    
    // Filtrer les tirs par joueur
    filterShotsByPlayer: (state, action) => {
      const playerId = action.payload;
      return state.events.filter(
        event => event.type === 'tir' && event.joueurId === playerId
      );
    }
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
