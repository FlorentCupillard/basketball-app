import { updateTeamAsync } from './teamsSlice';
import { updatePlayerAsync } from './playersSlice';

/**
 * Met à jour les statistiques des équipes et des joueurs en fonction des résultats d'un match
 * @param {Object} game - Le match terminé
 * @param {Array} teams - Liste des équipes
 * @param {Array} players - Liste des joueurs
 * @param {Function} dispatch - Fonction dispatch de Redux
 */
export const updateStatsAfterGame = async (game, teams, players, dispatch) => {
  if (game.statut !== 'terminé') {
    console.log('Le match n\'est pas terminé, pas de mise à jour des statistiques');
    return;
  }

  // Récupérer les équipes concernées
  const homeTeam = teams.find(team => team.id === game.equipeLocale.id);
  const awayTeam = teams.find(team => team.id === game.equipeVisiteur.id);

  if (!homeTeam || !awayTeam) {
    console.error('Équipes non trouvées pour le match', game.id);
    return;
  }

  // Déterminer le vainqueur
  const homeWin = game.equipeLocale.score > game.equipeVisiteur.score;
  const awayWin = game.equipeLocale.score < game.equipeVisiteur.score;
  const draw = game.equipeLocale.score === game.equipeVisiteur.score;

  // Mettre à jour les statistiques de l'équipe locale
  const updatedHomeTeam = {
    ...homeTeam,
    statistiquesEquipe: {
      ...homeTeam.statistiquesEquipe,
      matchsJoues: (homeTeam.statistiquesEquipe.matchsJoues || 0) + 1,
      victoires: homeWin ? (homeTeam.statistiquesEquipe.victoires || 0) + 1 : (homeTeam.statistiquesEquipe.victoires || 0),
      defaites: awayWin ? (homeTeam.statistiquesEquipe.defaites || 0) + 1 : (homeTeam.statistiquesEquipe.defaites || 0),
      pointsMarques: (homeTeam.statistiquesEquipe.pointsMarques || 0) + game.equipeLocale.score,
      pointsEncaisses: (homeTeam.statistiquesEquipe.pointsEncaisses || 0) + game.equipeVisiteur.score
    }
  };

  // Mettre à jour les statistiques de l'équipe visiteur
  const updatedAwayTeam = {
    ...awayTeam,
    statistiquesEquipe: {
      ...awayTeam.statistiquesEquipe,
      matchsJoues: (awayTeam.statistiquesEquipe.matchsJoues || 0) + 1,
      victoires: awayWin ? (awayTeam.statistiquesEquipe.victoires || 0) + 1 : (awayTeam.statistiquesEquipe.victoires || 0),
      defaites: homeWin ? (awayTeam.statistiquesEquipe.defaites || 0) + 1 : (awayTeam.statistiquesEquipe.defaites || 0),
      pointsMarques: (awayTeam.statistiquesEquipe.pointsMarques || 0) + game.equipeVisiteur.score,
      pointsEncaisses: (awayTeam.statistiquesEquipe.pointsEncaisses || 0) + game.equipeLocale.score
    }
  };

  // Dispatch des actions pour mettre à jour les équipes
  try {
    await dispatch(updateTeamAsync({ id: homeTeam.id, team: updatedHomeTeam })).unwrap();
    await dispatch(updateTeamAsync({ id: awayTeam.id, team: updatedAwayTeam })).unwrap();
    console.log('Statistiques des équipes mises à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des statistiques des équipes:', error);
  }

  // Mettre à jour les statistiques des joueurs
  if (game.statistiquesJoueurs && game.statistiquesJoueurs.length > 0) {
    for (const playerStats of game.statistiquesJoueurs) {
      const player = players.find(p => p.id === playerStats.joueurId);
      
      if (player) {
        // Calculer les nouvelles statistiques globales
        const updatedPlayer = {
          ...player,
          statistiquesGlobales: {
            ...player.statistiquesGlobales,
            points: calculateAverage(
              player.statistiquesGlobales.points || 0,
              playerStats.points || 0,
              player.statistiquesGlobales.matchsJoues || 0
            ),
            rebonds: calculateAverage(
              player.statistiquesGlobales.rebonds || 0,
              playerStats.rebonds || 0,
              player.statistiquesGlobales.matchsJoues || 0
            ),
            passesDecisives: calculateAverage(
              player.statistiquesGlobales.passesDecisives || 0,
              playerStats.passesDecisives || 0,
              player.statistiquesGlobales.matchsJoues || 0
            ),
            interceptions: calculateAverage(
              player.statistiquesGlobales.interceptions || 0,
              playerStats.interceptions || 0,
              player.statistiquesGlobales.matchsJoues || 0
            ),
            contres: calculateAverage(
              player.statistiquesGlobales.contres || 0,
              playerStats.contres || 0,
              player.statistiquesGlobales.matchsJoues || 0
            ),
            matchsJoues: (player.statistiquesGlobales.matchsJoues || 0) + 1
          }
        };

        // Dispatch de l'action pour mettre à jour le joueur
        try {
          await dispatch(updatePlayerAsync({ id: player.id, player: updatedPlayer })).unwrap();
          console.log(`Statistiques du joueur ${player.prenom} ${player.nom} mises à jour avec succès`);
        } catch (error) {
          console.error(`Erreur lors de la mise à jour des statistiques du joueur ${player.prenom} ${player.nom}:`, error);
        }
      }
    }
  }
};

/**
 * Calcule la nouvelle moyenne en tenant compte du nombre de matchs joués
 * @param {number} currentAvg - Moyenne actuelle
 * @param {number} newValue - Nouvelle valeur
 * @param {number} gamesPlayed - Nombre de matchs joués avant ce match
 * @returns {number} - Nouvelle moyenne
 */
const calculateAverage = (currentAvg, newValue, gamesPlayed) => {
  if (gamesPlayed === 0) {
    return newValue;
  }
  
  // Calculer la somme totale actuelle
  const currentTotal = currentAvg * gamesPlayed;
  
  // Ajouter la nouvelle valeur
  const newTotal = currentTotal + newValue;
  
  // Calculer la nouvelle moyenne
  return parseFloat((newTotal / (gamesPlayed + 1)).toFixed(1));
};
