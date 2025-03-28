import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { updateGameScoreAsync, updateGameStatusAsync } from '../../store/slices/gamesSlice';
import { updateStatsAfterGame } from '../../store/slices/statsUpdater';
import { addShotAsync } from '../../store/slices/eventsSlice';
import { updatePlayerStatsAsync } from '../../store/slices/playersSlice';

// Composants extraits
import TeamRoster from './TeamRoster';
import RecentActions from './RecentActions';
import ShotChartComponent from './ShotChartComponent';
import GameHeader from './actions/GameHeader';
import GameControls from './actions/GameControls';
import ContentSection from './actions/ContentSection';
import ShotActions from './actions/ShotActions';
import PlayerStats from './actions/PlayerStats';

const LiveContainer = styled.div`
  width: 100%;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #1a73e8;
  text-decoration: none;
  margin-bottom: 20px;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const GameLive = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const games = useSelector(state => state.games.games);
  const teams = useSelector(state => state.teams.teams);
  const players = useSelector(state => state.players.players);
  const events = useSelector(state => state.events.events);
  
  const [game, setGame] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // États pour la shotchart
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  const [shotPosition, setShotPosition] = useState(null);
  const [shotType, setShotType] = useState(null);
  const [shotResult, setShotResult] = useState('made');
  const [gameEvents, setGameEvents] = useState([]);
  const [shotEvents, setShotEvents] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [gameTime, setGameTime] = useState("10:00");
  
  // Charger les données du match
  useEffect(() => {
    setIsLoading(true);
    const foundGame = games.find(g => g.id === gameId);
    if (foundGame) {
      setGame(foundGame);
      setHomeScore(foundGame.equipeLocale.score);
      setAwayScore(foundGame.equipeVisiteur.score);
      setIsLive(foundGame.statut === 'en cours');
      
      // Trouver les équipes
      const home = teams.find(t => t.id === foundGame.equipeLocale.id);
      const away = teams.find(t => t.id === foundGame.equipeVisiteur.id);
      setHomeTeam(home);
      setAwayTeam(away);
      
      // Filtrer les événements du match
      const matchEvents = events.filter(e => e.matchId === gameId);
      setGameEvents(matchEvents);
      
      // Filtrer les tirs
      const shots = matchEvents.filter(e => e.type === 'tir');
      setShotEvents(shots);
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [gameId, games, teams, events]);
  
  // Démarrer le match
  const handleStartGame = async () => {
    try {
      await dispatch(updateGameStatusAsync({ gameId, status: 'en cours' })).unwrap();
      setIsLive(true);
    } catch (error) {
      console.error('Erreur lors du démarrage du match:', error);
    }
  };
  
  // Mettre en pause le match
  const handlePauseGame = async () => {
    try {
      await dispatch(updateGameStatusAsync({ gameId, status: 'pause' })).unwrap();
      setIsLive(false);
    } catch (error) {
      console.error('Erreur lors de la mise en pause du match:', error);
    }
  };
  
  // Terminer le match
  const handleEndGame = async () => {
    try {
      await dispatch(updateGameStatusAsync({ gameId, status: 'terminé' })).unwrap();
      
      // Mettre à jour les statistiques globales des joueurs
      await dispatch(updateStatsAfterGame({ gameId })).unwrap();
      
      setIsLive(false);
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.error('Erreur lors de la fin du match:', error);
    }
  };
  
  // Mettre à jour le score
  const handleUpdateScore = async (team, points) => {
    try {
      if (team === 'home') {
        const newScore = homeScore + points;
        await dispatch(updateGameScoreAsync({ 
          gameId, 
          team: 'home', 
          equipeLocaleScore: newScore 
        })).unwrap();
        setHomeScore(newScore);
      } else {
        const newScore = awayScore + points;
        await dispatch(updateGameScoreAsync({ 
          gameId, 
          team: 'away', 
          equipeVisiteurScore: newScore 
        })).unwrap();
        setAwayScore(newScore);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du score:', error);
    }
  };
  
  // Mettre à jour les statistiques d'un joueur
  const handleUpdatePlayerStats = async (playerId, teamId, stats) => {
    try {
      await dispatch(updatePlayerStatsAsync({ 
        playerId, 
        stats 
      })).unwrap();
    } catch (error) {
      console.error('Erreur lors de la mise à jour des statistiques du joueur:', error);
    }
  };
  
  // Sélectionner un joueur
  const handlePlayerSelect = (playerId, teamId) => {
    setSelectedPlayerId(playerId);
    setSelectedTeamId(teamId);
    // Réinitialiser les états de tir
    setIsSelectingPosition(false);
    setShotPosition(null);
    setShotType(null);
  };
  
  // Gérer le clic sur le terrain
  const handleCourtClick = (e) => {
    if (!isSelectingPosition || !selectedPlayerId || !shotType) return;
    
    const courtRect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - courtRect.left) / courtRect.width) * 100;
    const y = ((e.clientY - courtRect.top) / courtRect.height) * 100;
    
    setShotPosition({ x, y });
  };
  
  // Sélectionner le type de tir
  const handleShotTypeSelect = (type) => {
    setShotType(type);
    setIsSelectingPosition(true);
    setShotPosition(null);
  };
  
  // Valider un tir après avoir sélectionné la position
  const handleValidateShot = async (isSuccessful) => {
    if (!selectedPlayerId || !shotType || !shotPosition) return;
    
    try {
      const player = players.find(p => p.id === selectedPlayerId);
      const team = teams.find(t => t.id === selectedTeamId);
      
      if (!player || !team) return;
      
      // Créer l'événement de tir
      const shotEvent = {
        matchId: gameId,
        type: 'tir',
        joueurId: selectedPlayerId,
        equipeId: selectedTeamId,
        timestamp: new Date().toISOString(),
        details: {
          typeTir: shotType,
          reussi: isSuccessful,
          positionX: shotPosition.x,
          positionY: shotPosition.y
        }
      };
      
      // Ajouter l'événement
      await dispatch(addShotAsync(shotEvent)).unwrap();
      
      // Mettre à jour les statistiques du joueur
      const pointsValue = shotType === '3pts' ? 3 : shotType === '2pts' ? 2 : 1;
      const pointsToAdd = isSuccessful ? pointsValue : 0;
      
      // Mettre à jour les statistiques du joueur
      const statsUpdate = {
        points: (player.statistiquesMatch?.points || 0) + pointsToAdd,
      };
      
      // Ajouter les statistiques spécifiques au type de tir
      if (shotType === '2pts') {
        statsUpdate.tirs2ptsReussis = isSuccessful ? (player.statistiquesMatch?.tirs2ptsReussis || 0) + 1 : (player.statistiquesMatch?.tirs2ptsReussis || 0);
        statsUpdate.tirs2ptsTentes = (player.statistiquesMatch?.tirs2ptsTentes || 0) + 1;
      } else if (shotType === '3pts') {
        statsUpdate.tirs3ptsReussis = isSuccessful ? (player.statistiquesMatch?.tirs3ptsReussis || 0) + 1 : (player.statistiquesMatch?.tirs3ptsReussis || 0);
        statsUpdate.tirs3ptsTentes = (player.statistiquesMatch?.tirs3ptsTentes || 0) + 1;
      } else if (shotType === 'lf') {
        statsUpdate.lfReussis = isSuccessful ? (player.statistiquesMatch?.lfReussis || 0) + 1 : (player.statistiquesMatch?.lfReussis || 0);
        statsUpdate.lfTentes = (player.statistiquesMatch?.lfTentes || 0) + 1;
      }
      
      await handleUpdatePlayerStats(selectedPlayerId, selectedTeamId, statsUpdate);
      
      // Mettre à jour le score de l'équipe si le tir est réussi
      if (isSuccessful) {
        const isHomeTeam = selectedTeamId === homeTeam?.id;
        await handleUpdateScore(isHomeTeam ? 'home' : 'away', pointsValue);
      }
      
      // Réinitialiser les états
      setIsSelectingPosition(false);
      setShotPosition(null);
      setShotType(null);
      
      // Mettre à jour la liste des tirs
      const updatedEvents = [...events, shotEvent];
      const matchEvents = updatedEvents.filter(e => e.matchId === gameId);
      const updatedShots = matchEvents.filter(e => e.type === 'tir');
      setShotEvents(updatedShots);
      setGameEvents(matchEvents);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du tir:', error);
    }
  };
  
  // Annuler la sélection de tir
  const handleCancelShot = () => {
    setIsSelectingPosition(false);
    setShotPosition(null);
    setShotType(null);
  };
  
  // Formater un événement pour l'affichage
  const formatEvent = (event) => {
    const player = players.find(p => p.id === event.joueurId);
    const playerName = player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu';
    const team = teams.find(t => t.id === event.equipeId);
    const teamName = team ? team.nom : 'Équipe inconnue';
    const timestamp = new Date(event.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    if (event.type === 'tir') {
      const { typeTir, reussi } = event.details;
      const result = reussi ? 'réussi' : 'manqué';
      return `${timestamp} - ${playerName} (${teamName}) - Tir ${typeTir} ${result}`;
    }
    
    return `${timestamp} - ${playerName} (${teamName}) - ${event.type}`;
  };
  
  if (isLoading) {
    return (
      <LiveContainer>
        <BackButton to="/games">
          <FaArrowLeft /> Retour aux matchs
        </BackButton>
        <div>Chargement des données du match...</div>
      </LiveContainer>
    );
  }
  
  if (!game) {
    return (
      <LiveContainer>
        <BackButton to="/games">
          <FaArrowLeft /> Retour aux matchs
        </BackButton>
        <div>Match non trouvé.</div>
      </LiveContainer>
    );
  }
  
  // Obtenir le joueur sélectionné
  const selectedPlayer = players.find(p => p.id === selectedPlayerId);
  
  return (
    <LiveContainer>
      <BackButton to="/games">
        <FaArrowLeft /> Retour aux matchs
      </BackButton>
      
      <GameHeader
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        homeScore={homeScore}
        awayScore={awayScore}
        isLive={isLive}
        currentPeriod={currentPeriod}
        gameTime={gameTime}
      >
        <GameControls
          isLive={isLive}
          onStartGame={handleStartGame}
          onPauseGame={handlePauseGame}
          onEndGame={handleEndGame}
        />
      </GameHeader>
      
      {isLive && (
        <>
          <ContentSection title="Équipes">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3>{homeTeam?.nom || 'Équipe locale'}</h3>
                <TeamRoster 
                  teamId={homeTeam?.id} 
                  isLive={isLive}
                  onUpdatePlayerStats={handleUpdatePlayerStats}
                  onPlayerSelect={(playerId) => handlePlayerSelect(playerId, homeTeam?.id)}
                  selectedPlayerId={selectedPlayerId}
                />
              </div>
              
              <div>
                <h3>{awayTeam?.nom || 'Équipe visiteur'}</h3>
                <TeamRoster 
                  teamId={awayTeam?.id} 
                  isLive={isLive}
                  onUpdatePlayerStats={handleUpdatePlayerStats}
                  onPlayerSelect={(playerId) => handlePlayerSelect(playerId, awayTeam?.id)}
                  selectedPlayerId={selectedPlayerId}
                />
              </div>
            </div>
          </ContentSection>
          
          <ContentSection title="Actions de tir">
            <div style={{ marginBottom: '20px' }}>
              <h3>Joueur sélectionné: {selectedPlayer ? `${selectedPlayer.prenom} ${selectedPlayer.nom}` : 'Aucun'}</h3>
              
              {selectedPlayer && (
                <>
                  <ShotActions
                    selectedPlayer={selectedPlayer}
                    isSelectingPosition={isSelectingPosition}
                    shotPosition={shotPosition}
                    shotType={shotType}
                    onShotTypeSelect={handleShotTypeSelect}
                    onValidateShot={handleValidateShot}
                    onCancel={handleCancelShot}
                  />
                  
                  <PlayerStats player={selectedPlayer} />
                </>
              )}
            </div>
            
            <ShotChartComponent
              shotEvents={shotEvents}
              isSelectingPosition={isSelectingPosition}
              shotPosition={shotPosition}
              shotResult={shotResult === 'made'}
              selectedPlayerId={selectedPlayerId}
              players={players}
              onCourtClick={handleCourtClick}
              onShotResultChange={(e) => setShotResult(e.target.value)}
            />
          </ContentSection>
          
          <ContentSection title="Dernières actions">
            <RecentActions 
              events={gameEvents} 
              formatEvent={formatEvent} 
            />
          </ContentSection>
        </>
      )}
    </LiveContainer>
  );
};

export default GameLive;
