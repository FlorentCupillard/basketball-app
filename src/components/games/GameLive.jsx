import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BasketballCourt from '../court/BasketballCourt';
import { addShot } from '../../store/slices/eventsSlice';
import { updatePlayerGameStats } from '../../store/slices/gamesSlice';

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
  gap: 20px;
  margin-bottom: 20px;
`;

const GameActions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CourtContainer = styled.div`
  flex: 2;
  position: relative;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

const ActionTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const PlayerSelector = styled.div`
  margin-bottom: 15px;
`;

const ShotTypeSelector = styled.div`
  margin-bottom: 15px;
`;

const ShotResultSelector = styled.div`
  margin-bottom: 15px;
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
  
  @media (max-width: 768px) {
    padding: ${props => props.isSelecting ? '10px' : '0'};
    font-size: 14px;
  }
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

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const RecentActions = styled.div`
  margin-top: 20px;
`;

const ActionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
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
  const [homeScore, setHomeScore] = useState(game ? game.equipeLocale.score : 0);
  const [awayScore, setAwayScore] = useState(game ? game.equipeVisiteur.score : 0);
  
  // États locaux pour l'enregistrement des tirs
  const [selectedTeamId, setSelectedTeamId] = useState(game ? game.equipeLocale.id : '');
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [shotType, setShotType] = useState('2pts');
  const [shotResult, setShotResult] = useState('made');
  const [shotPosition, setShotPosition] = useState(null);
  const [isSelectingPosition, setIsSelectingPosition] = useState(false);
  
  // Filtrer les joueurs par équipe sélectionnée
  const teamPlayers = players.filter(player => player.equipeId === selectedTeamId);
  
  // Obtenir les noms des équipes
  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.nom : 'Équipe inconnue';
  };
  
  // Formater le temps restant (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Gérer le changement d'équipe
  const handleTeamChange = (e) => {
    setSelectedTeamId(e.target.value);
    setSelectedPlayerId('');
  };
  
  // Gérer le changement de joueur
  const handlePlayerChange = (e) => {
    setSelectedPlayerId(e.target.value);
  };
  
  // Gérer le changement de type de tir
  const handleShotTypeChange = (e) => {
    setShotType(e.target.value);
  };
  
  // Gérer le changement de résultat du tir
  const handleShotResultChange = (e) => {
    setShotResult(e.target.value);
  };
  
  // Commencer la sélection de la position du tir
  const handleStartPositionSelection = () => {
    setIsSelectingPosition(true);
    setShotPosition(null);
  };
  
  // Gérer le clic sur le terrain pour positionner le tir
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
    
    // Vibration tactile sur mobile pour feedback
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    
    // Animation de feedback visuel
    const feedbackElement = document.createElement('div');
    feedbackElement.style.position = 'absolute';
    feedbackElement.style.left = `${e.clientX}px`;
    feedbackElement.style.top = `${e.clientY}px`;
    feedbackElement.style.width = '30px';
    feedbackElement.style.height = '30px';
    feedbackElement.style.borderRadius = '50%';
    feedbackElement.style.backgroundColor = 'rgba(26, 115, 232, 0.3)';
    feedbackElement.style.transform = 'translate(-50%, -50%) scale(0)';
    feedbackElement.style.transition = 'all 0.3s ease';
    feedbackElement.style.zIndex = '1000';
    document.body.appendChild(feedbackElement);
    
    setTimeout(() => {
      feedbackElement.style.transform = 'translate(-50%, -50%) scale(1.5)';
      feedbackElement.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
      document.body.removeChild(feedbackElement);
    }, 300);
    
    setShotPosition({ x, y });
    setIsSelectingPosition(false);
  };
  
  // Déterminer le type de tir en fonction de la position sur le terrain
  const determineShotType = (x, y) => {
    // Coordonnées du centre du terrain
    const centerX = 50;
    const centerY = 50;
    
    // Distance par rapport au panier (en haut ou en bas selon la position y)
    const basketY = y < centerY ? 0 : 100;
    const distanceToBasket = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - basketY, 2));
    
    // Vérifier si c'est un lancer franc (proche du panier et aligné)
    const isAlignedWithBasket = Math.abs(x - centerX) < 5;
    const isCloseToBasket = Math.abs(y - basketY) < 20 && Math.abs(y - basketY) > 10;
    
    if (isAlignedWithBasket && isCloseToBasket) {
      return 'lf';
    }
    
    // Vérifier si c'est un tir à 3 points (loin du panier)
    const threePointDistance = 35; // Ajuster cette valeur selon les dimensions du terrain
    if (distanceToBasket > threePointDistance) {
      return '3pts';
    }
    
    // Par défaut, c'est un tir à 2 points
    return '2pts';
  };
  
  // Enregistrer le tir
  const handleSaveShot = () => {
    if (!selectedPlayerId || !shotPosition) return;
    
    const isMade = shotResult === 'made';
    const points = shotType === '3pts' ? 3 : 2;
    
    // Créer un nouvel événement de tir
    const newShot = {
      matchId: gameId,
      type: 'tir',
      temps: {
        periode: currentPeriod,
        tempsRestant: timeRemaining
      },
      joueurId: selectedPlayerId,
      equipeId: selectedTeamId,
      details: {
        typeTir: shotType,
        position: shotPosition,
        reussi: isMade,
        assisteParJoueurId: null // À implémenter plus tard
      }
    };
    
    // Mettre à jour le score si le tir est réussi
    if (isMade) {
      if (selectedTeamId === game.equipeLocale.id) {
        setHomeScore(homeScore + points);
      } else {
        setAwayScore(awayScore + points);
      }
    }
    
    // Mettre à jour les statistiques du joueur pour ce match
    const playerStats = {
      joueurId: selectedPlayerId,
      equipeId: selectedTeamId
    };
    
    if (shotType === '2pts') {
      playerStats.tirsReussis = isMade ? 1 : 0;
      playerStats.tirsTentes = 1;
    } else {
      playerStats.tirsA3ptsReussis = isMade ? 1 : 0;
      playerStats.tirsA3ptsTentes = 1;
    }
    
    playerStats.points = isMade ? points : 0;
    
    // Dispatcher les actions Redux
    dispatch(addShot(newShot));
    dispatch(updatePlayerGameStats({ gameId, playerStats }));
    
    // Réinitialiser les champs
    setShotPosition(null);
  };
  
  // Trier les événements par ordre chronologique inverse
  const sortedEvents = [...events].sort((a, b) => {
    if (a.temps.periode !== b.temps.periode) {
      return b.temps.periode - a.temps.periode;
    }
    return b.temps.tempsRestant - a.temps.tempsRestant;
  });
  
  // Obtenir le nom du joueur
  const getPlayerName = (playerId) => {
    const player = players.find(p => p.id === playerId);
    return player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu';
  };
  
  // Formater la description d'un événement
  const formatEventDescription = (event) => {
    if (event.type === 'tir') {
      const playerName = getPlayerName(event.joueurId);
      const teamName = getTeamName(event.equipeId);
      const result = event.details.reussi ? 'réussit' : 'manque';
      return `${formatTime(event.temps.tempsRestant)} - ${playerName} (${teamName}) ${result} un tir à ${event.details.typeTir}`;
    }
    return 'Événement inconnu';
  };
  
  // Filtrer les tirs pour n'afficher que ceux du match actuel
  const shotEvents = events.filter(event => event.type === 'tir');
  
  useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = `Match en direct - ${getTeamName(game?.equipeLocale.id)} vs ${getTeamName(game?.equipeVisiteur.id)}`;
    
    // Réinitialiser le titre quand le composant est démonté
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
      
      <HelpText>
        <strong>Comment ajouter un tir :</strong> 
        1. Sélectionnez l'équipe et le joueur 
        2. Choisissez le type de tir (2 ou 3 points) et le résultat (réussi ou manqué) 
        3. Cliquez sur "Positionner le tir" puis cliquez sur le terrain à l'endroit exact du tir 
        4. Cliquez sur "Enregistrer le tir" pour sauvegarder
      </HelpText>
      
      <GameContent>
        <GameActions>
          <ActionCard>
            <ActionTitle>Enregistrer un tir</ActionTitle>
            
            <PlayerSelector>
              <label>Équipe</label>
              <Select value={selectedTeamId} onChange={handleTeamChange}>
                <option value="">Sélectionner une équipe</option>
                <option value={game.equipeLocale.id}>{getTeamName(game.equipeLocale.id)}</option>
                <option value={game.equipeVisiteur.id}>{getTeamName(game.equipeVisiteur.id)}</option>
              </Select>
            </PlayerSelector>
            
            <PlayerSelector>
              <label>Joueur</label>
              <Select value={selectedPlayerId} onChange={handlePlayerChange} disabled={!selectedTeamId}>
                <option value="">Sélectionner un joueur</option>
                {teamPlayers.map(player => (
                  <option key={player.id} value={player.id}>
                    {player.prenom} {player.nom} (#{player.numero})
                  </option>
                ))}
              </Select>
            </PlayerSelector>
            
            <ShotTypeSelector>
              <label>Type de tir</label>
              <RadioGroup>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="shotType" 
                    value="2pts" 
                    checked={shotType === '2pts'} 
                    onChange={handleShotTypeChange} 
                  />
                  2 points
                </RadioLabel>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="shotType" 
                    value="3pts" 
                    checked={shotType === '3pts'} 
                    onChange={handleShotTypeChange} 
                  />
                  3 points
                </RadioLabel>
              </RadioGroup>
            </ShotTypeSelector>
            
            <ShotResultSelector>
              <label>Résultat</label>
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
            </ShotResultSelector>
            
            <ShotInstructions isSelecting={isSelectingPosition}>
              {isSelectingPosition 
                ? "CLIQUEZ SUR LE TERRAIN pour positionner le tir" 
                : shotPosition 
                  ? "Position sélectionnée. Vous pouvez enregistrer le tir ou choisir une nouvelle position." 
                  : "Cliquez sur 'Positionner le tir' pour sélectionner l'emplacement sur le terrain"
              }
            </ShotInstructions>
            
            <div>
              <Button 
                onClick={handleStartPositionSelection} 
                disabled={!selectedPlayerId}
                style={{ marginRight: '10px' }}
              >
                Positionner le tir
              </Button>
              <Button 
                primary 
                onClick={handleSaveShot} 
                disabled={!selectedPlayerId || !shotPosition}
              >
                Enregistrer le tir
              </Button>
            </div>
          </ActionCard>
          
          <RecentActions>
            <ActionTitle>Dernières actions</ActionTitle>
            <ActionsList>
              {sortedEvents.slice(0, 10).map((event, index) => (
                <ActionItem key={index}>
                  {formatEventDescription(event)}
                </ActionItem>
              ))}
              {sortedEvents.length === 0 && (
                <ActionItem>Aucune action enregistrée</ActionItem>
              )}
            </ActionsList>
          </RecentActions>
        </GameActions>
        
        <CourtContainer onClick={handleCourtClick}>
          <BasketballCourt>
            {/* Afficher les tirs déjà enregistrés */}
            {shotEvents.map((shot, index) => (
              <ShotMarker
                key={index}
                x={shot.details.position.x}
                y={shot.details.position.y}
                made={shot.details.reussi}
              />
            ))}
            
            {/* Afficher le marqueur de position temporaire lors de la sélection */}
            {isSelectingPosition && <TempPositionMarker />}
            
            {/* Afficher le marqueur de position sélectionnée */}
            {shotPosition && (
              <ShotMarker
                x={shotPosition.x}
                y={shotPosition.y}
                made={shotResult === 'made'}
                isTemp={true}
              />
            )}
          </BasketballCourt>
        </CourtContainer>
      </GameContent>
    </GameLiveContainer>
  );
};

export default GameLive;
