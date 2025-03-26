// Service pour interagir avec l'API JSON Server
const API_URL = 'http://localhost:3001';

// Fonctions génériques pour les requêtes API
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération des données (${endpoint}):`, error);
    throw error;
  }
};

const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de l'ajout des données (${endpoint}):`, error);
    throw error;
  }
};

const updateData = async (endpoint, id, data) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la mise à jour des données (${endpoint}/${id}):`, error);
    throw error;
  }
};

const deleteData = async (endpoint, id) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la suppression des données (${endpoint}/${id}):`, error);
    throw error;
  }
};

// API pour les équipes
export const teamsApi = {
  getAll: () => fetchData('teams'),
  getById: (id) => fetchData(`teams/${id}`),
  create: (team) => postData('teams', team),
  update: (id, team) => updateData('teams', id, team),
  delete: (id) => deleteData('teams', id),
};

// API pour les joueurs
export const playersApi = {
  getAll: () => fetchData('players'),
  getById: (id) => fetchData(`players/${id}`),
  getByTeam: (teamId) => fetchData(`players?equipeId=${teamId}`),
  create: (player) => postData('players', player),
  update: (id, player) => updateData('players', id, player),
  delete: (id) => deleteData('players', id),
};

// API pour les matchs
export const gamesApi = {
  getAll: () => fetchData('games'),
  getById: (id) => fetchData(`games/${id}`),
  create: (game) => postData('games', game),
  update: (id, game) => updateData('games', id, game),
  updateScore: (id, scoreData) => updateData('games', id, scoreData),
  updateStatus: (id, statusData) => updateData('games', id, statusData),
  updatePlayerStats: (id, gameData) => updateData('games', id, gameData),
  delete: (id) => deleteData('games', id),
};

// API pour les événements
export const eventsApi = {
  getAll: () => fetchData('events'),
  getByGame: (gameId) => fetchData(`events?matchId=${gameId}`),
  create: (event) => postData('events', event),
  update: (id, event) => updateData('events', id, event),
  delete: (id) => deleteData('events', id),
};

export default {
  teams: teamsApi,
  players: playersApi,
  games: gamesApi,
  events: eventsApi,
};
