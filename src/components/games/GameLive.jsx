import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addShot } from '../../store/slices/eventsSlice';
import { updatePlayerGameStatsAsync, updateGameScore, updateGameStatus } from '../../store/slices/gamesSlice';
import { FaBasketballBall, FaHandPaper, FaPlus } from 'react-icons/fa';

// Composants importés
import TeamRoster from './TeamRoster';
import ShotChartComponent from './ShotChartComponent';
import RecentActions from './RecentActions';
import GameControls from './GameControls';

const GameLiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const TeamScore = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamName = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Score = styled.div`
  font-size: 32px;
  font-weight: 700;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameTime = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const GamePeriod = styled.div`
  font-size: 16px;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const RosterSection = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TeamRosterContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

const ShotChartSection = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HelpText = styled.div`
  background-color: #e8f0fe;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  color: #1a73e8;
  border-left: 4px solid #1a73e8;
`;

const GameLive = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer les données du match, des équipes et des joueurs depuis le store Redux
  const game = useSelector(state => state.games.games.find(g => g.id === gameId));
  const teams = useSelector(state => state.teams.teams);
  const players = useSelector(state => state.players.players);
  const events = useSelector(state => state.events.events.filter(e => e.matchId === gameId));
  
  // États locaux pour le suivi du match
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10:00 en secondes
  const [homeScore, setHomeScore] = useState(game ? game.equipeLocale.score : 0);
  const [awayScore, setAwayScore] = useState(game ? game.equipeVisiteur.score : 0);
  
  // États locaux pour l'enregistrement des actions
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [shotType, setShotType] = useState('2pts');
  const [shotResult, setShotResult] = useState('made');
  const [shotPosition, setShotPosition] = useState(null);
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  
  // Filtrer les joueurs par équipe
  const homePlayers = players.filter(player => player.equipeId === game?.equipeLocale?.id);
  const awayPlayers = players.filter(player => player.equipeId === game?.equipeVisiteur?.id);
  
  // Filtrer les événements de tir
  const shotEvents = events.filter(event => event.type === 'tir');
  
  // Obtenir les noms des équipes
  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.nom : 'Équipe non assignée';
  };
  
  // Gérer la fin du match
  const handleFinishGame = () => {
    // Sauvegarder le score final
    dispatch(updateGameScore({
      gameId,
      equipeLocaleScore: homeScore,
      equipeVisiteurScore: awayScore
    }));
    
    // Changer le statut du match à "terminé"
    dispatch(updateGameStatus({
      gameId,
      status: 'terminé'
    }));
    
    // Rediriger vers la page de détails du match
    navigate(`/games/${gameId}`);
  };
  
  // Formater le temps restant (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Gérer la sélection d'un joueur
  const handlePlayerSelect = (playerId) => {
    setSelectedPlayerId(playerId);
    // Activer automatiquement le mode de sélection de position
    setIsSelectingPosition(true);
  };
  
  // Gérer l'ajout d'un rebond
  const handleAddRebound = (playerId) => {
    const player = players.find(p => p.id === playerId);
    const teamId = player.equipeId;
    
    const newRebound = {
      id: `rebound_${Date.now()}`,
      matchId: gameId,
      joueurId: playerId,
      equipeId: teamId,
      type: 'rebond',
      timestamp: new Date().toISOString(),
      periode: currentPeriod,
      tempsRestant: timeRemaining
    };
    
    // Ajouter l'événement
    dispatch({ type: 'events/addEvent', payload: newRebound });
    
    // Mettre à jour les statistiques du joueur
    const playerStats = game.statistiquesJoueurs.find(stats => stats.joueurId === playerId) || {
      joueurId: playerId,
      equipeId: teamId,
      points: 0,
      rebonds: 0,
      passesDecisives: 0
    };
    
    dispatch(updatePlayerGameStatsAsync({
      gameId,
      playerStats: {
        ...playerStats,
        rebonds: (playerStats.rebonds || 0) + 1
      }
    }));
  };
  
  // Gérer l'ajout d'une passe décisive
  const handleAddAssist = (playerId) => {
    const player = players.find(p => p.id === playerId);
    const teamId = player.equipeId;
    
    const newAssist = {
      id: `assist_${Date.now()}`,
      matchId: gameId,
      joueurId: playerId,
      equipeId: teamId,
      type: 'passe',
      timestamp: new Date().toISOString(),
      periode: currentPeriod,
      tempsRestant: timeRemaining
    };
    
    // Ajouter l'événement
    dispatch({ type: 'events/addEvent', payload: newAssist });
    
    // Mettre à jour les statistiques du joueur
    const playerStats = game.statistiquesJoueurs.find(stats => stats.joueurId === playerId) || {
      joueurId: playerId,
      equipeId: teamId,
      points: 0,
      rebonds: 0,
      passesDecisives: 0
    };
    
    dispatch(updatePlayerGameStatsAsync({
      gameId,
      playerStats: {
        ...playerStats,
        passesDecisives: (playerStats.passesDecisives || 0) + 1
      }
    }));
  };
  
  // Gérer le changement de type de tir
  const handleShotTypeChange = (e) => {
    setShotType(e.target.value);
  };
  
  // Gérer le changement de résultat du tir
  const handleShotResultChange = (e) => {
    setShotResult(e.target.value);
  };
  
  // Gérer le clic sur le bouton de sélection de position
  const handleSelectPositionClick = () => {
    if (!selectedPlayerId) {
      alert('Veuillez sélectionner un joueur avant d\'enregistrer un tir.');
      return;
    }
    
    setIsSelectingPosition(true);
  };
  
  // Déterminer le type de tir en fonction de la position
  const determineShotType = (x, y) => {
    // Coordonnées approximatives pour la ligne à 3 points
    const centerX = 50;
    const topY = 10;
    const bottomY = 90;
    
    // Distance du centre du terrain (pour les tirs du milieu de terrain)
    const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - 50, 2));
    
    // Vérifier si le tir est à l'intérieur de la zone à 2 points
    if ((y < topY || y > bottomY) && distanceFromCenter < 40) {
      return '2pts';
    }
    
    // Vérifier si le tir est à l'extérieur de la ligne à 3 points
    if (distanceFromCenter > 35) {
      return '3pts';
    }
    
    return '2pts';
  };
  
  // Gérer le clic sur le terrain
  const handleCourtClick = (e) => {
    if (!isSelectingPosition) return;
    
    // Obtenir les coordonnées relatives du clic sur le terrain
    const courtRect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - courtRect.left) / courtRect.width) * 100;
    const y = ((e.clientY - courtRect.top) / courtRect.height) * 100;
    
    // Déterminer automatiquement le type de tir en fonction de la position
    const newShotType = determineShotType(x, y);
    if (newShotType !== shotType) {
      setShotType(newShotType);
    }
    
    setShotPosition({ x, y });
    
    // Créer un nouvel événement de tir
    const player = players.find(p => p.id === selectedPlayerId);
    const teamId = player.equipeId;
    const isMade = shotResult === 'made';
    
    // Calculer les points marqués
    let points = 0;
    if (isMade) {
      if (newShotType === '3pts') points = 3;
      else if (newShotType === '2pts') points = 2;
      else if (newShotType === 'lf') points = 1;
    }
    
    // Mettre à jour le score
    if (isMade) {
      if (teamId === game.equipeLocale.id) {
        setHomeScore(prevScore => prevScore + points);
        // Persister le score dans le store Redux
        dispatch(updateGameScore({
          gameId,
          equipeLocaleScore: homeScore + points
        }));
      } else {
        setAwayScore(prevScore => prevScore + points);
        // Persister le score dans le store Redux
        dispatch(updateGameScore({
          gameId,
          equipeVisiteurScore: awayScore + points
        }));
      }
    }
    
    // Créer l'événement de tir
    const newShot = {
      id: `shot_${Date.now()}`,
      matchId: gameId,
      joueurId: selectedPlayerId,
      equipeId: teamId,
      type: 'tir',
      typeShot: newShotType,
      reussi: isMade,
      positionX: x,
      positionY: y,
      timestamp: new Date().toISOString(),
      periode: currentPeriod,
      tempsRestant: timeRemaining
    };
    
    // Dispatcher l'action pour ajouter le tir
    dispatch(addShot(newShot));
    
    // Mettre à jour les statistiques du joueur
    const playerStats = game.statistiquesJoueurs.find(stats => stats.joueurId === selectedPlayerId) || {
      joueurId: selectedPlayerId,
      equipeId: teamId,
      points: 0,
      rebonds: 0,
      passesDecisives: 0,
      tirs: {
        tentes: 0,
        reussis: 0
      },
      tirs3pts: {
        tentes: 0,
        reussis: 0
      }
    };
    
    const updatedStats = {
      ...playerStats,
      points: (playerStats.points || 0) + (isMade ? points : 0)
    };
    
    // Mettre à jour les statistiques de tirs
    if (newShotType === '3pts') {
      updatedStats.tirs3pts = {
        tentes: (playerStats.tirs3pts?.tentes || 0) + 1,
        reussis: (playerStats.tirs3pts?.reussis || 0) + (isMade ? 1 : 0)
      };
    } else {
      updatedStats.tirs = {
        tentes: (playerStats.tirs?.tentes || 0) + 1,
        reussis: (playerStats.tirs?.reussis || 0) + (isMade ? 1 : 0)
      };
    }
    
    dispatch(updatePlayerGameStatsAsync({
      gameId,
      playerStats: updatedStats
    }));
    
    // Réinitialiser l'état de sélection de position
    setIsSelectingPosition(false);
    setShotPosition(null);
  };
  
  // Formater l'événement pour l'affichage
  const formatEvent = (event) => {
    const player = players.find(p => p.id === event.joueurId);
    const playerName = player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu';
    const teamName = getTeamName(event.equipeId);
    
    // Formater le temps restant
    const timeStr = formatTime(event.tempsRestant || 0);
    // Formater la période (quart temps)
    const periodeStr = event.periode ? `Q${event.periode}` : 'Q?';
    
    // Informations de base de l'action
    let actionText = '';
    if (event.type === 'tir') {
      actionText = `${event.reussi ? 'Tir réussi' : 'Tir manqué'} à ${event.typeShot}`;
    } else if (event.type === 'rebond') {
      actionText = 'Rebond';
    } else if (event.type === 'passe') {
      actionText = 'Passe décisive';
    } else {
      actionText = event.type;
    }
    
    // Retourner le texte formaté avec période et temps
    return `[${periodeStr} ${timeStr}] ${playerName} (${teamName}) - ${actionText}`;
  };
  
  // Mettre à jour le titre de la page
  useEffect(() => {
    if (game) {
      document.title = `Match en direct: ${getTeamName(game.equipeLocale.id)} vs ${getTeamName(game.equipeVisiteur.id)}`;
    }
    
    return () => {
      document.title = 'Basketball Manager';
    };
  }, [game]);
  
  if (!game) {
    return <div>Match non trouvé</div>;
  }
  
  return (
    <GameLiveContainer>
      <GameHeader>
        <TeamScore>
          <TeamName>{getTeamName(game.equipeLocale.id)}</TeamName>
          <Score>{homeScore}</Score>
        </TeamScore>
        
        <GameInfo>
          <GameTime>{formatTime(timeRemaining)}</GameTime>
          <GamePeriod>{currentPeriod}e Quart-temps</GamePeriod>
        </GameInfo>
        
        <TeamScore>
          <TeamName>{getTeamName(game.equipeVisiteur.id)}</TeamName>
          <Score>{awayScore}</Score>
        </TeamScore>
      </GameHeader>
      
      <GameControls 
        currentPeriod={currentPeriod}
        timeRemaining={timeRemaining}
        onPeriodChange={setCurrentPeriod}
        onTimeChange={setTimeRemaining}
        onFinishGame={handleFinishGame}
        gameId={gameId}
      />
      
      <HelpText>
        <strong>Comment utiliser cette interface :</strong> 
        <ol>
          <li>Sélectionnez un joueur dans la liste</li>
          <li>Pour ajouter un rebond ou une passe décisive, cliquez sur les boutons correspondants</li>
          <li>Pour enregistrer un tir, sélectionnez un joueur puis cliquez directement sur le terrain</li>
        </ol>
      </HelpText>
      
      <GameContent>
        <RosterSection>
          <TeamRosterContainer>
            <TeamRoster 
              title={getTeamName(game.equipeLocale.id)}
              titleColor="#1a73e8"
              players={homePlayers}
              selectedPlayerId={selectedPlayerId}
              onPlayerSelect={handlePlayerSelect}
              onAddRebound={handleAddRebound}
              onAddAssist={handleAddAssist}
              gameStats={game.statistiquesJoueurs}
            />
          </TeamRosterContainer>
          
          <TeamRosterContainer>
            <TeamRoster 
              title={getTeamName(game.equipeVisiteur.id)}
              titleColor="#f44336"
              players={awayPlayers}
              selectedPlayerId={selectedPlayerId}
              onPlayerSelect={handlePlayerSelect}
              onAddRebound={handleAddRebound}
              onAddAssist={handleAddAssist}
              gameStats={game.statistiquesJoueurs}
            />
          </TeamRosterContainer>
        </RosterSection>
        
        <ShotChartSection>
          <ShotChartComponent 
            shotEvents={shotEvents}
            isSelectingPosition={isSelectingPosition}
            shotPosition={shotPosition}
            shotResult={shotResult}
            selectedPlayerId={selectedPlayerId}
            players={players}
            onCourtClick={handleCourtClick}
            onShotResultChange={handleShotResultChange}
          />
          
          <RecentActions 
            events={events}
            formatEvent={formatEvent}
          />
        </ShotChartSection>
      </GameContent>
    </GameLiveContainer>
  );
};

export default GameLive;
