import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaStopCircle, FaPlay, FaPause, FaPlus, FaMinus } from 'react-icons/fa';
import { updateGameScoreAsync, updateGameStatusAsync, updatePlayerGameStatsAsync } from '../../store/slices/gamesSlice';
import { updateStatsAfterGame } from '../../store/slices/statsUpdater';

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
  background-color: ${props => props.primary ? '#1a73e8' : props.danger ? '#d32f2f' : '#f0f0f0'};
  color: ${props => props.primary || props.danger ? 'white' : '#333'};
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
    background-color: ${props => props.primary ? '#1557b0' : props.danger ? '#b71c1c' : '#e0e0e0'};
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

const GameLive = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const games = useSelector(state => state.games.games);
  const teams = useSelector(state => state.teams.teams);
  const players = useSelector(state => state.players.players);
  
  const [game, setGame] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
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
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [gameId, games, teams]);
  
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
      
      <ContentSection>
        <SectionTitle>Équipes</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3>{homeTeam?.nom || 'Équipe locale'}</h3>
            <TeamRoster 
              teamId={homeTeam?.id} 
              isLive={isLive}
              onUpdatePlayerStats={handleUpdatePlayerStats}
            />
          </div>
          
          <div>
            <h3>{awayTeam?.nom || 'Équipe visiteur'}</h3>
            <TeamRoster 
              teamId={awayTeam?.id} 
              isLive={isLive}
              onUpdatePlayerStats={handleUpdatePlayerStats}
            />
          </div>
        </div>
      </ContentSection>
      
      {game.evenements && game.evenements.length > 0 && (
        <ContentSection>
          <SectionTitle>Dernières actions</SectionTitle>
          <RecentActions gameId={gameId} />
        </ContentSection>
      )}
    </LiveContainer>
  );
};

export default GameLive;
