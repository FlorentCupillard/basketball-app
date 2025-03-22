import { configureStore } from '@reduxjs/toolkit';
import teamsReducer from './slices/teamsSlice';
import playersReducer from './slices/playersSlice';
import gamesReducer from './slices/gamesSlice';
import eventsReducer from './slices/eventsSlice';

const store = configureStore({
  reducer: {
    teams: teamsReducer,
    players: playersReducer,
    games: gamesReducer,
    events: eventsReducer,
  },
});

export default store;
