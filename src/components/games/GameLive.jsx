import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BasketballCourt from '../court/BasketballCourt';
import { addShot } from '../../store/slices/eventsSlice';
import { updatePlayerGameStats } from '../../store/slices/gamesSlice';
import { FaBasketballBall, FaPlus, FaHandPaper } from 'react-icons/fa';

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

const TeamRoster = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

const TeamRosterTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: ${props => props.color || '#333'};
`;

const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background-color: ${props => props.selected ? '#e8f0fe' : '#f8f8f8'};
  border: ${props => props.selected ? '2px solid #1a73e8' : '1px solid #eee'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.selected ? '#e8f0fe' : '#f0f0f0'};
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const PlayerNumber = styled.div`
  font-size: 12px;
  color: #666;
`;

const PlayerActions = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.color || '#f0f0f0'};
  color: ${props => props.textColor || '#333'};
  border: none;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.hoverColor || '#e0e0e0'};
  }
`;

const ShotChartSection = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CourtContainer = styled.div`
  flex: 2;
  position: relative;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecentActionsContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

const RecentActionsTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ActionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const ActionItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ShotMarker = styled.div`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: ${props => props.isTemp ? '16px' : '12px'};
  height: ${props => props.isTemp ? '16px' : '12px'};
  border-radius: 50%;
  background-color: ${props => props.made ? 'green' : 'red'};
  transform: translate(-50%, -50%);
  border: ${props => props.isTemp ? '2px solid white' : '1px solid white'};
  box-shadow: 0 0 ${props => props.isTemp ? '4px' : '2px'} rgba(0, 0, 0, 0.5);
  z-index: ${props => props.isTemp ? '10' : '5'};
  transition: all 0.2s ease;
`;

const TempPositionMarker = styled.div`
  position: absolute;
  left: ${props => props.x || '50%'};
  top: ${props => props.y || '50%'};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3px dashed #1a73e8;
  background-color: rgba(26, 115, 232, 0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
  animation: pulse 1.5s infinite, follow 0.1s linear;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.4);
      transform: translate(-50%, -50%) scale(1);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(26, 115, 232, 0);
      transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(26, 115, 232, 0);
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes follow {
    from { opacity: 0.7; }
    to { opacity: 1; }
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

const ShotInstructions = styled.div`
  margin-bottom: 15px;
  font-style: italic;
  color: ${props => props.isSelecting ? '#1a73e8' : '#666'};
  background-color: ${props => props.isSelecting ? '#e8f0fe' : 'transparent'};
  padding: ${props => props.isSelecting ? '12px' : '0'};
  border-radius: 8px;
  border: ${props => props.isSelecting ? '2px dashed #1a73e8' : 'none'};
  text-align: center;
  font-weight: ${props => props.isSelecting ? 'bold' : 'normal'};
  animation: ${props => props.isSelecting ? 'pulse 1.5s infinite' : 'none'};
  box-shadow: ${props => props.isSelecting ? '0 2px 8px rgba(26, 115, 232, 0.2)' : 'none'};
  transition: all 0.3s ease;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(26, 115, 232, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(26, 115, 232, 0);
    }
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#1a73e8' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : '#e0e0e0'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const GameLive = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  
  // Récupérer les données du match, des équipes et des joueurs depuis le store Redux
  const game = useSelector(state => state.games.games.find(g => g.id === gameId));
  const teams = useSelector(state => state.teams.teams);
  const players = useSelector(state => state.players.players);
  const events = useSelector(state => state.events.events.filter(e => e.matchId === gameId));
  
  // États locaux pour le suivi du match
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10:00 en secondes
  const [homeScore, setHomeScore] = useState(game ? game.scoreLocal : 0);
  const [awayScore, setAwayScore] = useState(game ? game.scoreVisiteur : 0);
  
  // États locaux pour l'enregistrement des actions
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [shotType, setShotType] = useState('2pts');
  const [shotResult, setShotResult] = useState('made');
  const [shotPosition, setShotPosition] = useState(null);
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  
  // Filtrer les joueurs par équipe
  const homePlayers = players.filter(player => player.equipeId === game?.equipeLocaleId);
  const awayPlayers = players.filter(player => player.equipeId === game?.equipeVisiteurId);
  
  // Filtrer les événements de tir
  const shotEvents = events.filter(event => event.type === 'tir');
  
  // Obtenir les noms des équipes
  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.nom : 'Équipe non assignée';
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
    
    dispatch({ type: 'events/addEvent', payload: newRebound });
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
    
    dispatch({ type: 'events/addEvent', payload: newAssist });
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
      if (teamId === game.equipeLocaleId) {
        setHomeScore(prevScore => prevScore + points);
      } else {
        setAwayScore(prevScore => prevScore + points);
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
    
    // Réinitialiser l'état de sélection de position
    setIsSelectingPosition(false);
    setShotPosition(null);
  };
  
  // Formater l'événement pour l'affichage
  const formatEvent = (event) => {
    const player = players.find(p => p.id === event.joueurId);
    const playerName = player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu';
    const teamName = getTeamName(event.equipeId);
    
    if (event.type === 'tir') {
      return `${playerName} (${teamName}) - ${event.reussi ? 'Tir réussi' : 'Tir manqué'} à ${event.typeShot}`;
    } else if (event.type === 'rebond') {
      return `${playerName} (${teamName}) - Rebond`;
    } else if (event.type === 'passe') {
      return `${playerName} (${teamName}) - Passe décisive`;
    }
    
    return `${playerName} (${teamName}) - ${event.type}`;
  };
  
  // Mettre à jour le titre de la page
  useEffect(() => {
    if (game) {
      document.title = `Match en direct: ${getTeamName(game.equipeLocaleId)} vs ${getTeamName(game.equipeVisiteurId)}`;
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
          <TeamName>{getTeamName(game.equipeLocaleId)}</TeamName>
          <Score>{homeScore}</Score>
        </TeamScore>
        
        <GameInfo>
          <GameTime>{formatTime(timeRemaining)}</GameTime>
          <GamePeriod>{currentPeriod}e Quart-temps</GamePeriod>
        </GameInfo>
        
        <TeamScore>
          <TeamName>{getTeamName(game.equipeVisiteurId)}</TeamName>
          <Score>{awayScore}</Score>
        </TeamScore>
      </GameHeader>
      
      <HelpText>
        <strong>Comment utiliser cette interface :</strong> 
        <ol>
          <li>Sélectionnez un joueur dans la liste</li>
          <li>Pour ajouter un rebond ou une passe décisive, cliquez sur les boutons correspondants</li>
          <li>Pour enregistrer un tir, cliquez sur "Sélectionner position" puis cliquez sur le terrain</li>
        </ol>
      </HelpText>
      
      <GameContent>
        <RosterSection>
          <TeamRoster>
            <TeamRosterTitle color="#1a73e8">{getTeamName(game.equipeLocaleId)}</TeamRosterTitle>
            <PlayersList>
              {homePlayers.map(player => (
                <PlayerItem 
                  key={player.id} 
                  selected={selectedPlayerId === player.id}
                  onClick={() => handlePlayerSelect(player.id)}
                >
                  <PlayerInfo>
                    <PlayerName>{player.prenom} {player.nom}</PlayerName>
                    <PlayerNumber>#{player.numero}</PlayerNumber>
                  </PlayerInfo>
                  <PlayerActions>
                    <ActionButton 
                      color="#e8f5e9" 
                      hoverColor="#c8e6c9" 
                      textColor="#2e7d32"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddRebound(player.id);
                      }}
                    >
                      <FaHandPaper size={12} /> Rebond
                    </ActionButton>
                    <ActionButton 
                      color="#e3f2fd" 
                      hoverColor="#bbdefb" 
                      textColor="#1565c0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddAssist(player.id);
                      }}
                    >
                      <FaPlus size={12} /> Passe
                    </ActionButton>
                  </PlayerActions>
                </PlayerItem>
              ))}
            </PlayersList>
          </TeamRoster>
          
          <TeamRoster>
            <TeamRosterTitle color="#f44336">{getTeamName(game.equipeVisiteurId)}</TeamRosterTitle>
            <PlayersList>
              {awayPlayers.map(player => (
                <PlayerItem 
                  key={player.id} 
                  selected={selectedPlayerId === player.id}
                  onClick={() => handlePlayerSelect(player.id)}
                >
                  <PlayerInfo>
                    <PlayerName>{player.prenom} {player.nom}</PlayerName>
                    <PlayerNumber>#{player.numero}</PlayerNumber>
                  </PlayerInfo>
                  <PlayerActions>
                    <ActionButton 
                      color="#e8f5e9" 
                      hoverColor="#c8e6c9" 
                      textColor="#2e7d32"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddRebound(player.id);
                      }}
                    >
                      <FaHandPaper size={12} /> Rebond
                    </ActionButton>
                    <ActionButton 
                      color="#e3f2fd" 
                      hoverColor="#bbdefb" 
                      textColor="#1565c0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddAssist(player.id);
                      }}
                    >
                      <FaPlus size={12} /> Passe
                    </ActionButton>
                  </PlayerActions>
                </PlayerItem>
              ))}
            </PlayersList>
          </TeamRoster>
        </RosterSection>
        
        <ShotChartSection>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <RadioGroup>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="shotResult" 
                    value="made" 
                    checked={shotResult === 'made'} 
                    onChange={handleShotResultChange}
                  />
                  Réussi
                </RadioLabel>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="shotResult" 
                    value="missed" 
                    checked={shotResult === 'missed'} 
                    onChange={handleShotResultChange}
                  />
                  Manqué
                </RadioLabel>
              </RadioGroup>
              
              <Button 
                primary 
                disabled={!selectedPlayerId || isSelectingPosition}
                onClick={handleSelectPositionClick}
              >
                <FaBasketballBall style={{ marginRight: '5px' }} />
                Sélectionner position
              </Button>
            </div>
            
            <ShotInstructions isSelecting={isSelectingPosition}>
              {isSelectingPosition 
                ? `Cliquez sur le terrain pour indiquer la position du tir de ${players.find(p => p.id === selectedPlayerId)?.prenom} ${players.find(p => p.id === selectedPlayerId)?.nom}`
                : 'Sélectionnez un joueur et cliquez sur "Sélectionner position" pour enregistrer un tir'}
            </ShotInstructions>
            
            <CourtContainer onClick={handleCourtClick}>
              <BasketballCourt>
                {/* Afficher les tirs déjà enregistrés */}
                {shotEvents.map((shot, index) => (
                  <ShotMarker
                    key={index}
                    x={shot.positionX}
                    y={shot.positionY}
                    made={shot.reussi}
                  />
                ))}
                
                {/* Afficher le marqueur temporaire lors de la sélection de position */}
                {isSelectingPosition && shotPosition && (
                  <ShotMarker
                    x={shotPosition.x}
                    y={shotPosition.y}
                    made={shotResult === 'made'}
                    isTemp={true}
                  />
                )}
                
                {/* Afficher le curseur de position */}
                {isSelectingPosition && (
                  <TempPositionMarker />
                )}
              </BasketballCourt>
            </CourtContainer>
          </div>
          
          <RecentActionsContainer>
            <RecentActionsTitle>Dernières actions</RecentActionsTitle>
            <ActionsList>
              {events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10).map((event, index) => (
                <ActionItem key={index}>
                  {formatEvent(event)}
                </ActionItem>
              ))}
              
              {events.length === 0 && (
                <div style={{ padding: '20px 0', textAlign: 'center', color: '#666' }}>
                  Aucune action enregistrée
                </div>
              )}
            </ActionsList>
          </RecentActionsContainer>
        </ShotChartSection>
      </GameContent>
    </GameLiveContainer>
  );
};

export default GameLive;
