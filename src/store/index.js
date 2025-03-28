import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './slices/teamsSlice';
import playersReducer from './slices/playersSlice';
import gamesReducer from './slices/gamesSlice';
import eventsReducer from './slices/eventsSlice';

export const store = configureStore({
  reducer: {
    teams: teamsReducer,
    players: playersReducer,
    games: gamesReducer,
    events: eventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Initialiser les données au démarrage de l'application
export const initializeStore = async (store) => {
  try {
    // Charger les données initiales
    await store.dispatch({ type: 'teams/fetchTeams' });
    await store.dispatch({ type: 'players/fetchPlayers' });
    await store.dispatch({ type: 'games/fetchGames' });
    await store.dispatch({ type: 'events/fetchEvents' });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du store:', error);
  }
};

export default store;
