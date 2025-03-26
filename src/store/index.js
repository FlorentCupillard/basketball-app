import { configureStore } from '@reduxjs/toolkit';
import teamsReducer, { fetchTeams } from './slices/teamsSlice';
import playersReducer, { fetchPlayers } from './slices/playersSlice';
import gamesReducer, { fetchGames } from './slices/gamesSlice';
import eventsReducer, { fetchEvents } from './slices/eventsSlice';

const store = configureStore({
  reducer: {
    teams: teamsReducer,
    players: playersReducer,
    games: gamesReducer,
    events: eventsReducer
  }
});

// Initialiser les données depuis l'API
store.dispatch(fetchTeams());
store.dispatch(fetchPlayers());
store.dispatch(fetchGames());
store.dispatch(fetchEvents());

export default store;
