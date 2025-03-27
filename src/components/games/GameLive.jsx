import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaStopCircle, FaPlay, FaPause, FaPlus, FaMinus } from 'react-icons/fa';
import { updateGameScoreAsync, updateGameStatusAsync, updatePlayerGameStatsAsync } from '../../store/slices/gamesSlice';
import { updateStatsAfterGame } from '../../store/slices/statsUpdater';
import { addShotAsync } from '../../store/slices/eventsSlice';

// Composants existants
import TeamRoster from './TeamRoster';
import GameControls from './GameControls';
import RecentActions from './RecentActions';
import ShotChartComponent from './ShotChartComponent';

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

const GameHeader = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TeamLogo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 0;
    margin-right: 15px;
  }
`;

const TeamName = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
    font-size: 16px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 15px 0;
  }
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 30px;
    width: 100%;
    justify-content: space-around;
  }
`;

const ScoreSeparator = styled.span`
  margin: 0 15px;
  color: #999;
`;

const GameStatus = styled.div`
  font-size: 14px;
  color: ${props => props.isLive ? '#d32f2f' : '#666'};
  font-weight: ${props => props.isLive ? '600' : 'normal'};
`;

const GameActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#1a73e8' : props.danger ? '#d32f2f' : props.success ? '#4caf50' : '#f0f0f0'};
  color: ${props => props.primary || props.danger || props.success ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : props.danger ? '#b71c1c' : props.success ? '#388e3c' : '#e0e0e0'};
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const ShotButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
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
  const [shotType, setShotType] = useState('2pts');
  const [shotResult, setShotResult] = useState('made');
  const [gameEvents, setGameEvents] = useState([]);
  const [shotEvents, setShotEvents] = useState([]);
  
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
      // Mettre à jour le statut du match
      await dispatch(updateGameStatusAsync({ gameId, status: 'terminé' })).unwrap();
      setIsLive(false);
      
      // Mettre à jour les statistiques des équipes et des joueurs
      const updatedGame = games.find(g => g.id === gameId);
      if (updatedGame) {
        await updateStatsAfterGame(updatedGame, teams, players, dispatch);
      }
      
      // Rediriger vers la page de détail du match
      navigate(`/games/${gameId}`);
    } catch (error) {
      console.error('Erreur lors de la fin du match:', error);
    }
  };
  
  // Mettre à jour le score
  const handleUpdateScore = async (team, change) => {
    try {
      if (team === 'home') {
        const newScore = Math.max(0, homeScore + change);
        setHomeScore(newScore);
        await dispatch(updateGameScoreAsync({ 
          gameId, 
          equipeLocaleScore: newScore 
        })).unwrap();
      } else {
        const newScore = Math.max(0, awayScore + change);
        setAwayScore(newScore);
        await dispatch(updateGameScoreAsync({ 
          gameId, 
          equipeVisiteurScore: newScore 
        })).unwrap();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du score:', error);
    }
  };
  
  // Mettre à jour les statistiques d'un joueur
  const handleUpdatePlayerStats = async (playerId, teamId, stats) => {
    try {
      const playerStats = {
        joueurId: playerId,
        equipeId: teamId,
        ...stats
      };
      
      await dispatch(updatePlayerGameStatsAsync({ gameId, playerStats })).unwrap();
    } catch (error) {
      console.error('Erreur lors de la mise à jour des statistiques du joueur:', error);
    }
  };
  
  // Sélectionner un joueur
  const handlePlayerSelect = (playerId, teamId) => {
    setSelectedPlayerId(playerId);
    setSelectedTeamId(teamId);
  };
  
  // Gérer le clic sur le terrain
  const handleCourtClick = (e) => {
    if (!isSelectingPosition || !selectedPlayerId) return;
    
    const courtRect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - courtRect.left) / courtRect.width) * 100;
    const y = ((e.clientY - courtRect.top) / courtRect.height) * 100;
    
    setShotPosition({ x, y });
    
    // Déterminer si le tir est à 2 ou 3 points en fonction de la position
    const isThreePointer = determineIfThreePointer(x, y);
    if (isThreePointer) {
      setShotType('3pts');
    } else {
      setShotType('2pts');
    }
  };
  
  // Déterminer si un tir est à 3 points en fonction de sa position
  const determineIfThreePointer = (x, y) => {
    // Coordonnées approximatives de la ligne à 3 points
    const centerX = 50;
    const basketY = 5.8; // Position approximative du panier en haut
    const basketBottomY = 94.2; // Position approximative du panier en bas
    
    // Distance de la ligne à 3 points (en pourcentage de la largeur du terrain)
    const threePointDistance = 23.75;
    
    // Vérifier si le tir est au-dessus du panier du haut
    if (y < 50) {
      // Calculer la distance par rapport au panier du haut
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - basketY, 2));
      return distance > threePointDistance;
    } else {
      // Calculer la distance par rapport au panier du bas
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - basketBottomY, 2));
      return distance > threePointDistance;
    }
  };
  
  // Commencer à sélectionner la position d'un tir
  const handleStartShotSelection = (type) => {
    if (!selectedPlayerId) return;
    
    setShotType(type);
    setIsSelectingPosition(type !== 'lf'); // Pour les lancers francs, pas besoin de sélectionner une position
    
    // Pour les lancers francs, ajouter directement le tir
    if (type === 'lf') {
      handleAddShot();
    }
  };
  
  // Changer le résultat du tir (réussi/manqué)
  const handleShotResultChange = (e) => {
    setShotResult(e.target.value);
  };
  
  // Ajouter un tir
  const handleAddShot = async () => {
    if (!selectedPlayerId) return;
    
    try {
      const player = players.find(p => p.id === selectedPlayerId);
      const team = teams.find(t => t.id === selectedTeamId);
      
      if (!player || !team) return;
      
      const isSuccessful = shotResult === 'made';
      
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
          positionX: shotType === 'lf' ? 50 : shotPosition?.x || 50,
          positionY: shotType === 'lf' ? 50 : shotPosition?.y || 50
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
      
      // Mettre à jour la liste des tirs
      const updatedEvents = events.filter(e => e.matchId === gameId);
      const updatedShots = updatedEvents.filter(e => e.type === 'tir');
      setShotEvents(updatedShots);
      setGameEvents(updatedEvents);
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du tir:', error);
    }
  };
  
  // Formater un événement pour l'affichage
  const formatEvent = (event) => {
    const player = players.find(p => p.id === event.joueurId);
    const playerName = player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu';
    
    if (event.type === 'tir') {
      const { typeTir, reussi } = event.details;
      const result = reussi ? 'réussi' : 'manqué';
      return `${playerName} - Tir ${typeTir} ${result}`;
    }
    
    return `${playerName} - ${event.type}`;
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
      
      <GameHeader>
        <GameInfo>
          <TeamContainer>
            <TeamLogo>
              {homeTeam?.logo ? (
                <img src={homeTeam.logo} alt={`Logo ${homeTeam.nom}`} />
              ) : (
                <span>{homeTeam?.nom?.charAt(0) || '?'}</span>
              )}
            </TeamLogo>
            <TeamName>{homeTeam?.nom || 'Équipe locale'}</TeamName>
          </TeamContainer>
          
          <ScoreContainer>
            <ScoreDisplay>
              <span>{homeScore}</span>
              <ScoreSeparator>-</ScoreSeparator>
              <span>{awayScore}</span>
            </ScoreDisplay>
            <GameStatus isLive={isLive}>
              {isLive ? 'En direct' : game.statut === 'terminé' ? 'Terminé' : 'À venir'}
            </GameStatus>
          </ScoreContainer>
          
          <TeamContainer>
            <TeamLogo>
              {awayTeam?.logo ? (
                <img src={awayTeam.logo} alt={`Logo ${awayTeam.nom}`} />
              ) : (
                <span>{awayTeam?.nom?.charAt(0) || '?'}</span>
              )}
            </TeamLogo>
            <TeamName>{awayTeam?.nom || 'Équipe visiteur'}</TeamName>
          </TeamContainer>
        </GameInfo>
        
        <GameActions>
          {!isLive && game.statut !== 'terminé' && (
            <ActionButton primary onClick={handleStartGame}>
              <FaPlay /> Démarrer le match
            </ActionButton>
          )}
          
          {isLive && (
            <>
              <ActionButton onClick={handlePauseGame}>
                <FaPause /> Mettre en pause
              </ActionButton>
              <ActionButton danger onClick={handleEndGame}>
                <FaStopCircle /> Terminer le match
              </ActionButton>
            </>
          )}
        </GameActions>
      </GameHeader>
      
      {isLive && (
        <ContentSection>
          <SectionTitle>Contrôles du score</SectionTitle>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3>{homeTeam?.nom || 'Équipe locale'}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <ActionButton onClick={() => handleUpdateScore('home', 1)}>
                  <FaPlus /> 1 pt
                </ActionButton>
                <ActionButton onClick={() => handleUpdateScore('home', 2)}>
                  <FaPlus /> 2 pts
                </ActionButton>
                <ActionButton onClick={() => handleUpdateScore('home', 3)}>
                  <FaPlus /> 3 pts
                </ActionButton>
                <ActionButton onClick={() => handleUpdateScore('home', -1)}>
                  <FaMinus /> 1 pt
                </ActionButton>
              </div>
            </div>
            
            <div>
              <h3>{awayTeam?.nom || 'Équipe visiteur'}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <ActionButton onClick={() => handleUpdateScore('away', 1)}>
                  <FaPlus /> 1 pt
                </ActionButton>
                <ActionButton onClick={() => handleUpdateScore('away', 2)}>
                  <FaPlus /> 2 pts
                </ActionButton>
                <ActionButton onClick={() => handleUpdateScore('away', 3)}>
                  <FaPlus /> 3 pts
                </ActionButton>
                <ActionButton onClick={() => handleUpdateScore('away', -1)}>
                  <FaMinus /> 1 pt
                </ActionButton>
              </div>
            </div>
          </div>
        </ContentSection>
      )}
      
      {isLive && (
        <ContentSection>
          <SectionTitle>Shotchart</SectionTitle>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Joueur sélectionné: {selectedPlayer ? `${selectedPlayer.prenom} ${selectedPlayer.nom}` : 'Aucun'}</h3>
            
            {selectedPlayer && (
              <>
                <ShotButtonsContainer>
                  <ActionButton 
                    primary={shotType === '2pts'} 
                    onClick={() => handleStartShotSelection('2pts')}
                    disabled={isSelectingPosition}
                  >
                    Tir à 2 points
                  </ActionButton>
                  <ActionButton 
                    primary={shotType === '3pts'} 
                    onClick={() => handleStartShotSelection('3pts')}
                    disabled={isSelectingPosition}
                  >
                    Tir à 3 points
                  </ActionButton>
                  <ActionButton 
                    primary={shotType === 'lf'} 
                    onClick={() => handleStartShotSelection('lf')}
                    disabled={isSelectingPosition}
                  >
                    Lancer franc
                  </ActionButton>
                </ShotButtonsContainer>
                
                {isSelectingPosition && (
                  <>
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
                    
                    {shotPosition && (
                      <ActionButton success onClick={handleAddShot}>
                        Valider le tir
                      </ActionButton>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          
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
        </ContentSection>
      )}
      
      <ContentSection>
        <SectionTitle>Équipes</SectionTitle>
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
      
      <ContentSection>
        <SectionTitle>Dernières actions</SectionTitle>
        <RecentActions 
          events={gameEvents} 
          formatEvent={formatEvent} 
        />
      </ContentSection>
    </LiveContainer>
  );
};

export default GameLive;
