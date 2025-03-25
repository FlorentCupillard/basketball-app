import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaBasketballBall, FaTrophy, FaCalendarAlt, FaChartBar, FaUser } from 'react-icons/fa';

const PlayerDetailContainer = styled.div`
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

const PlayerHeader = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 15px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const PlayerPhoto = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const PlayerTeam = styled.div`
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
`;

const PlayerPosition = styled.div`
  font-size: 16px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
`;

const PlayerNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1a73e8;
  margin-left: auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
  }
`;

const PlayerStats = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 10px 15px;
  border-radius: 8px;
  min-width: 80px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1a73e8;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
`;

const PlayerActions = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 15px;
    width: 100%;
    justify-content: center;
  }
`;

const ActionButton = styled(Link)`
  background-color: ${props => props.primary ? '#1a73e8' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : '#e0e0e0'};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  
  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#1a73e8' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => props.active ? '#1557b0' : '#f0f0f0'};
  }
  
  @media (max-width: 768px) {
    min-width: 100px;
    text-align: center;
  }
`;

const ContentSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GamesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GameItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  background-color: #f8f8f8;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

const GameDate = styled.div`
  min-width: 100px;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const GameTeams = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;

const GameTeam = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: contain;
    background-color: white;
  }
`;

const GameScore = styled.div`
  font-weight: 600;
  min-width: 80px;
  text-align: center;
  
  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const GameStatus = styled.div`
  min-width: 80px;
  text-align: right;
  font-size: 14px;
  color: ${props => {
    switch(props.status) {
      case 'à venir':
        return '#1565c0';
      case 'en cours':
        return '#c62828';
      case 'terminé':
        return '#2e7d32';
      default:
        return '#616161';
    }
  }};
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StatCardValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1a73e8;
  margin-bottom: 5px;
`;

const StatCardLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const ShotChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
  font-style: italic;
`;

const PlayerDetail = () => {
  const { playerId } = useParams();
  const players = useSelector(state => state.players.players);
  const teams = useSelector(state => state.teams.teams);
  const games = useSelector(state => state.games.games);
  const events = useSelector(state => state.events.events);
  
  const [activeTab, setActiveTab] = useState('stats');
  const [player, setPlayer] = useState(null);
  const [playerTeam, setPlayerTeam] = useState(null);
  const [playerGames, setPlayerGames] = useState([]);
  const [playerShots, setPlayerShots] = useState([]);
  
  useEffect(() => {
    // Trouver le joueur correspondant
    const foundPlayer = players.find(p => p.id === playerId);
    if (foundPlayer) {
      setPlayer(foundPlayer);
      
      // Trouver l'équipe du joueur
      const team = teams.find(t => t.id === foundPlayer.equipeId);
      if (team) {
        setPlayerTeam(team);
      }
      
      // Trouver les matchs du joueur (matchs de son équipe)
      if (foundPlayer.equipeId) {
        const playerTeamGames = games.filter(game => 
          game.equipeLocaleId === foundPlayer.equipeId || 
          game.equipeVisiteurId === foundPlayer.equipeId
        );
        setPlayerGames(playerTeamGames);
      }
      
      // Trouver les tirs du joueur
      const shots = events.filter(event => 
        event.type === 'tir' && 
        event.joueurId === playerId
      );
      setPlayerShots(shots);
    }
  }, [playerId, players, teams, games, events]);
  
  // Obtenir le nom de l'équipe à partir de l'ID
  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.nom : 'Équipe inconnue';
  };
  
  // Obtenir le logo de l'équipe à partir de l'ID
  const getTeamLogo = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.logo : '';
  };
  
  // Formater la date du match
  const formatGameDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  // Déterminer le statut du match
  const getGameStatus = (game) => {
    const now = new Date();
    const gameDate = new Date(game.date);
    
    if (game.termine) {
      return 'terminé';
    } else if (gameDate <= now) {
      return 'en cours';
    } else {
      return 'à venir';
    }
  };
  
  // Calculer les statistiques avancées
  const calculateAdvancedStats = () => {
    if (!player || !playerShots.length) return {};
    
    const totalShots = playerShots.length;
    const madeShots = playerShots.filter(shot => shot.reussi).length;
    const shotPercentage = totalShots > 0 ? (madeShots / totalShots) * 100 : 0;
    
    const twoPointShots = playerShots.filter(shot => shot.typeShot === '2pts');
    const twoPointMade = twoPointShots.filter(shot => shot.reussi).length;
    const twoPointPercentage = twoPointShots.length > 0 ? (twoPointMade / twoPointShots.length) * 100 : 0;
    
    const threePointShots = playerShots.filter(shot => shot.typeShot === '3pts');
    const threePointMade = threePointShots.filter(shot => shot.reussi).length;
    const threePointPercentage = threePointShots.length > 0 ? (threePointMade / threePointShots.length) * 100 : 0;
    
    const freeThrows = playerShots.filter(shot => shot.typeShot === 'lf');
    const freeThrowsMade = freeThrows.filter(shot => shot.reussi).length;
    const freeThrowPercentage = freeThrows.length > 0 ? (freeThrowsMade / freeThrows.length) * 100 : 0;
    
    return {
      totalShots,
      madeShots,
      shotPercentage: shotPercentage.toFixed(1),
      twoPointShots: twoPointShots.length,
      twoPointMade,
      twoPointPercentage: twoPointPercentage.toFixed(1),
      threePointShots: threePointShots.length,
      threePointMade,
      threePointPercentage: threePointPercentage.toFixed(1),
      freeThrows: freeThrows.length,
      freeThrowsMade,
      freeThrowPercentage: freeThrowPercentage.toFixed(1)
    };
  };
  
  const advancedStats = calculateAdvancedStats();
  
  if (!player) {
    return (
      <PlayerDetailContainer>
        <BackButton to="/players"><FaArrowLeft /> Retour à la liste des joueurs</BackButton>
        <EmptyState>Joueur non trouvé</EmptyState>
      </PlayerDetailContainer>
    );
  }
  
  return (
    <PlayerDetailContainer>
      <BackButton to="/players"><FaArrowLeft /> Retour à la liste des joueurs</BackButton>
      
      <PlayerHeader>
        <PlayerPhoto>
          <img src={player.photo} alt={`Photo ${player.prenom} ${player.nom}`} />
        </PlayerPhoto>
        
        <PlayerInfo>
          <PlayerName>{player.prenom} {player.nom}</PlayerName>
          <PlayerTeam><FaBasketballBall /> {playerTeam ? playerTeam.nom : 'Équipe inconnue'}</PlayerTeam>
          <PlayerPosition><FaUser /> {player.poste.charAt(0).toUpperCase() + player.poste.slice(1)}</PlayerPosition>
          
          <PlayerStats>
            <StatItem>
              <StatValue>{player.statistiquesGlobales.points}</StatValue>
              <StatLabel>Points</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{player.statistiquesGlobales.rebonds}</StatValue>
              <StatLabel>Rebonds</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{player.statistiquesGlobales.passesDecisives}</StatValue>
              <StatLabel>Passes</StatLabel>
            </StatItem>
          </PlayerStats>
        </PlayerInfo>
        
        <PlayerNumber>#{player.numero}</PlayerNumber>
        
        <PlayerActions>
          <ActionButton to={`/players/${player.id}/edit`}><FaEdit /> Modifier</ActionButton>
        </PlayerActions>
      </PlayerHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
        >
          <FaChartBar /> Statistiques
        </Tab>
        <Tab 
          active={activeTab === 'games'} 
          onClick={() => setActiveTab('games')}
        >
          <FaCalendarAlt /> Matchs
        </Tab>
        <Tab 
          active={activeTab === 'shots'} 
          onClick={() => setActiveTab('shots')}
        >
          <FaBasketballBall /> Tirs
        </Tab>
      </TabsContainer>
      
      {activeTab === 'stats' && (
        <ContentSection>
          <SectionTitle><FaChartBar /> Statistiques détaillées</SectionTitle>
          
          <StatsGrid>
            <StatCard>
              <StatCardValue>{player.statistiquesGlobales.points}</StatCardValue>
              <StatCardLabel>Points par match</StatCardLabel>
            </StatCard>
            <StatCard>
              <StatCardValue>{player.statistiquesGlobales.rebonds}</StatCardValue>
              <StatCardLabel>Rebonds par match</StatCardLabel>
            </StatCard>
            <StatCard>
              <StatCardValue>{player.statistiquesGlobales.passesDecisives}</StatCardValue>
              <StatCardLabel>Passes décisives par match</StatCardLabel>
            </StatCard>
            <StatCard>
              <StatCardValue>{advancedStats.shotPercentage}%</StatCardValue>
              <StatCardLabel>% de réussite au tir</StatCardLabel>
            </StatCard>
            <StatCard>
              <StatCardValue>{advancedStats.twoPointPercentage}%</StatCardValue>
              <StatCardLabel>% de réussite à 2 points</StatCardLabel>
            </StatCard>
            <StatCard>
              <StatCardValue>{advancedStats.threePointPercentage}%</StatCardValue>
              <StatCardLabel>% de réussite à 3 points</StatCardLabel>
            </StatCard>
          </StatsGrid>
        </ContentSection>
      )}
      
      {activeTab === 'games' && (
        <ContentSection>
          <SectionTitle><FaCalendarAlt /> Matchs récents</SectionTitle>
          
          {playerGames.length > 0 ? (
            <GamesList>
              {playerGames.map(game => (
                <GameItem key={game.id} to={`/games/${game.id}`}>
                  <GameDate>
                    <FaCalendarAlt /> {formatGameDate(game.date)}
                  </GameDate>
                  
                  <GameTeams>
                    <GameTeam>
                      <img src={getTeamLogo(game.equipeLocaleId)} alt={getTeamName(game.equipeLocaleId)} />
                      {getTeamName(game.equipeLocaleId)}
                    </GameTeam>
                    
                    <GameScore>
                      {game.termine ? `${game.scoreLocal} - ${game.scoreVisiteur}` : 'VS'}
                    </GameScore>
                    
                    <GameTeam>
                      <img src={getTeamLogo(game.equipeVisiteurId)} alt={getTeamName(game.equipeVisiteurId)} />
                      {getTeamName(game.equipeVisiteurId)}
                    </GameTeam>
                  </GameTeams>
                  
                  <GameStatus status={getGameStatus(game)}>
                    {getGameStatus(game)}
                  </GameStatus>
                </GameItem>
              ))}
            </GamesList>
          ) : (
            <EmptyState>Aucun match trouvé pour ce joueur</EmptyState>
          )}
        </ContentSection>
      )}
      
      {activeTab === 'shots' && (
        <ContentSection>
          <SectionTitle><FaBasketballBall /> Carte des tirs</SectionTitle>
          
          {playerShots.length > 0 ? (
            <ShotChartContainer>
              <StatsGrid>
                <StatCard>
                  <StatCardValue>{advancedStats.madeShots} / {advancedStats.totalShots}</StatCardValue>
                  <StatCardLabel>Tirs réussis / Tirs tentés</StatCardLabel>
                </StatCard>
                <StatCard>
                  <StatCardValue>{advancedStats.shotPercentage}%</StatCardValue>
                  <StatCardLabel>% de réussite au tir</StatCardLabel>
                </StatCard>
                <StatCard>
                  <StatCardValue>{advancedStats.twoPointMade} / {advancedStats.twoPointShots}</StatCardValue>
                  <StatCardLabel>Tirs à 2 points</StatCardLabel>
                </StatCard>
                <StatCard>
                  <StatCardValue>{advancedStats.threePointMade} / {advancedStats.threePointShots}</StatCardValue>
                  <StatCardLabel>Tirs à 3 points</StatCardLabel>
                </StatCard>
              </StatsGrid>
              
              <EmptyState>Visualisation de la carte des tirs à venir</EmptyState>
            </ShotChartContainer>
          ) : (
            <EmptyState>Aucun tir enregistré pour ce joueur</EmptyState>
          )}
        </ContentSection>
      )}
    </PlayerDetailContainer>
  );
};

export default PlayerDetail;
