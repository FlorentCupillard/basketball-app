import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaEdit, FaChartBar, FaBasketballBall, FaUser, FaUsers, FaCalendarAlt, FaClock, FaChartLine } from 'react-icons/fa';

const GameDetailContainer = styled.div`
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
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const GameStatus = styled.div`
  display: inline-block;
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  background-color: ${props => {
    switch(props.status) {
      case 'upcoming':
        return '#e3f2fd';
      case 'live':
        return '#ffebee';
      case 'completed':
        return '#e8f5e9';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'upcoming':
        return '#1565c0';
      case 'live':
        return '#c62828';
      case 'completed':
        return '#2e7d32';
      default:
        return '#616161';
    }
  }};
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

const GameDate = styled.div`
  font-size: 14px;
  color: #666;
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

const ActionButton = styled(Link)`
  background-color: ${props => props.primary ? '#1a73e8' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : '#e0e0e0'};
  }
  
  @media (max-width: 768px) {
    width: 100%;
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

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1a73e8;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const PlayersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlayerCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PlayerPhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const PlayerStats = styled.div`
  font-size: 12px;
  color: #666;
`;

const EventsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  background-color: #f8f8f8;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
`;

const EventTime = styled.div`
  font-weight: 600;
  min-width: 60px;
`;

const EventIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.type === 'tir' ? (props.success ? '#4CAF50' : '#F44336') : '#1a73e8'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

const EventDescription = styled.div`
  flex: 1;
`;

const ShotChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const PlayerLink = styled(Link)`
  color: #1a73e8;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TeamPlayersList = styled.div`
  margin-top: 20px;
`;

const TeamPlayersTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GameDetail = () => {
  const { gameId } = useParams();
  const games = useSelector(state => state.games.games);
  const teams = useSelector(state => state.teams.teams);
  const players = useSelector(state => state.players.players);
  const events = useSelector(state => state.events.events);
  
  const [activeTab, setActiveTab] = useState('summary');
  const [game, setGame] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [gameEvents, setGameEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    // Trouver le match correspondant à l'ID
    const foundGame = games.find(g => g.id === gameId);
    if (foundGame) {
      setGame(foundGame);
      
      // Trouver les équipes
      const home = teams.find(t => t.id === foundGame.equipeLocaleId);
      const away = teams.find(t => t.id === foundGame.equipeVisiteurId);
      setHomeTeam(home);
      setAwayTeam(away);
      
      // Filtrer les événements du match
      const matchEvents = events.filter(e => e.matchId === gameId);
      setGameEvents(matchEvents);
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [gameId, games, teams, events]);
  
  if (isLoading) {
    return (
      <GameDetailContainer>
        <BackButton to="/games">
          <FaArrowLeft /> Retour aux matchs
        </BackButton>
        <ContentSection>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div>Chargement des détails du match...</div>
          </div>
        </ContentSection>
      </GameDetailContainer>
    );
  }
  
  if (!game || !homeTeam || !awayTeam) {
    return (
      <GameDetailContainer>
        <BackButton to="/games">
          <FaArrowLeft /> Retour aux matchs
        </BackButton>
        <ContentSection>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div>Match non trouvé</div>
          </div>
        </ContentSection>
      </GameDetailContainer>
    );
  }
  
  // Formater la date du match
  const formatGameDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  // Calculer les statistiques du match
  const totalShots = gameEvents.filter(e => e.type === 'tir').length;
  const madeShots = gameEvents.filter(e => e.type === 'tir' && e.reussi).length;
  const shotPercentage = totalShots > 0 ? Math.round((madeShots / totalShots) * 100) : 0;
  
  const threePtShots = gameEvents.filter(e => e.type === 'tir' && e.typeShot === '3pts').length;
  const madeThreePtShots = gameEvents.filter(e => e.type === 'tir' && e.typeShot === '3pts' && e.reussi).length;
  const threePtPercentage = threePtShots > 0 ? Math.round((madeThreePtShots / threePtShots) * 100) : 0;
  
  const twoPtShots = gameEvents.filter(e => e.type === 'tir' && e.typeShot === '2pts').length;
  const madeTwoPtShots = gameEvents.filter(e => e.type === 'tir' && e.typeShot === '2pts' && e.reussi).length;
  const twoPtPercentage = twoPtShots > 0 ? Math.round((madeTwoPtShots / twoPtShots) * 100) : 0;
  
  // Filtrer les joueurs par équipe
  const homePlayers = players.filter(p => p.equipeId === homeTeam.id);
  const awayPlayers = players.filter(p => p.equipeId === awayTeam.id);
  
  // Obtenir les statistiques d'un joueur pour ce match
  const getPlayerStats = (playerId) => {
    // Vérifier d'abord si les statistiques sont déjà enregistrées
    if (game && game.statistiquesJoueurs && game.statistiquesJoueurs.length > 0) {
      const savedStats = game.statistiquesJoueurs.find(stats => stats.joueurId === playerId);
      if (savedStats) {
        return {
          points: savedStats.points || 0,
          shots: (savedStats.tirs?.tentes || 0) + (savedStats.tirs3pts?.tentes || 0),
          madeShots: (savedStats.tirs?.reussis || 0) + (savedStats.tirs3pts?.reussis || 0),
          rebounds: savedStats.rebonds || 0,
          assists: savedStats.passesDecisives || 0
        };
      }
    }
    
    // Fallback: calculer à partir des événements si les statistiques ne sont pas enregistrées
    const playerEvents = gameEvents.filter(e => e.joueurId === playerId);
    const points = playerEvents.reduce((total, event) => {
      if (event.type === 'tir' && event.reussi) {
        if (event.typeShot === '3pts') return total + 3;
        if (event.typeShot === '2pts') return total + 2;
        if (event.typeShot === 'lf') return total + 1;
      }
      return total;
    }, 0);
    
    return {
      points,
      shots: playerEvents.filter(e => e.type === 'tir').length,
      madeShots: playerEvents.filter(e => e.type === 'tir' && e.reussi).length,
      rebounds: playerEvents.filter(e => e.type === 'rebond').length,
      assists: playerEvents.filter(e => e.type === 'passe').length
    };
  };
  
  return (
    <GameDetailContainer>
      <BackButton to="/games">
        <FaArrowLeft /> Retour aux matchs
      </BackButton>
      
      <GameHeader>
        <GameStatus 
          status={game.enCours ? 'live' : (game.termine ? 'completed' : 'upcoming')}
        >
          {game.enCours ? 'En cours' : (game.termine ? 'Terminé' : 'À venir')}
        </GameStatus>
        
        <GameInfo>
          <TeamContainer>
            <TeamLogo>
              <img src={homeTeam.logo} alt={`Logo ${homeTeam.nom}`} />
            </TeamLogo>
            <TeamName>{homeTeam.nom}</TeamName>
          </TeamContainer>
          
          <ScoreContainer>
            <ScoreDisplay>
              {game.scoreLocal}
              <ScoreSeparator>-</ScoreSeparator>
              {game.scoreVisiteur}
            </ScoreDisplay>
            <GameDate>
              <FaCalendarAlt style={{ marginRight: '5px' }} /> {formatGameDate(game.date)} - {new Date(game.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </GameDate>
          </ScoreContainer>
          
          <TeamContainer>
            <TeamLogo>
              <img src={awayTeam.logo} alt={`Logo ${awayTeam.nom}`} />
            </TeamLogo>
            <TeamName>{awayTeam.nom}</TeamName>
          </TeamContainer>
        </GameInfo>
        
        <GameActions>
          <ActionButton to={`/games/${game.id}/edit`}>
            <FaEdit /> Modifier
          </ActionButton>
          <ActionButton to={`/games/${game.id}/live`} primary>
            <FaPlay /> Mode Live
          </ActionButton>
        </GameActions>
      </GameHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'summary'} 
          onClick={() => setActiveTab('summary')}
        >
          <FaChartBar style={{ marginRight: '5px' }} /> Résumé
        </Tab>
        <Tab 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
        >
          <FaChartLine style={{ marginRight: '5px' }} /> Statistiques
        </Tab>
        <Tab 
          active={activeTab === 'players'} 
          onClick={() => setActiveTab('players')}
        >
          <FaUsers style={{ marginRight: '5px' }} /> Joueurs
        </Tab>
        <Tab 
          active={activeTab === 'timeline'} 
          onClick={() => setActiveTab('timeline')}
        >
          <FaClock style={{ marginRight: '5px' }} /> Chronologie
        </Tab>
        <Tab 
          active={activeTab === 'shots'} 
          onClick={() => setActiveTab('shots')}
        >
          <FaBasketballBall style={{ marginRight: '5px' }} /> Tirs
        </Tab>
      </TabsContainer>
      
      {activeTab === 'summary' && (
        <ContentSection>
          <SectionTitle><FaChartBar style={{ marginRight: '5px' }} /> Résumé du match</SectionTitle>
          
          <StatGrid>
            <StatCard>
              <StatValue>{totalShots}</StatValue>
              <StatLabel>Tirs tentés</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{madeShots}</StatValue>
              <StatLabel>Tirs réussis</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{shotPercentage}%</StatValue>
              <StatLabel>% de réussite</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{threePtShots}</StatValue>
              <StatLabel>Tirs à 3pts</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{madeThreePtShots}</StatValue>
              <StatLabel>3pts réussis</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{gameEvents.length}</StatValue>
              <StatLabel>Événements</StatLabel>
            </StatCard>
          </StatGrid>
          
          <TeamPlayersList>
            <TeamPlayersTitle><FaUsers style={{ marginRight: '5px' }} /> Meilleurs joueurs</TeamPlayersTitle>
            <PlayersList>
              {players
                .filter(p => p.equipeId === homeTeam.id || p.equipeId === awayTeam.id)
                .sort((a, b) => {
                  const statsA = getPlayerStats(a.id);
                  const statsB = getPlayerStats(b.id);
                  return statsB.points - statsA.points;
                })
                .slice(0, 4)
                .map(player => {
                  const stats = getPlayerStats(player.id);
                  const team = player.equipeId === homeTeam.id ? homeTeam : awayTeam;
                  return (
                    <PlayerCard key={player.id}>
                      <PlayerPhoto>
                        <img src={player.photo} alt={`${player.prenom} ${player.nom}`} />
                      </PlayerPhoto>
                      <PlayerInfo>
                        <PlayerName>
                          <PlayerLink to={`/players/${player.id}`}>
                            {player.prenom} {player.nom}
                          </PlayerLink>
                          <span style={{ color: '#666', fontSize: '12px', marginLeft: '5px' }}>
                            ({team.nom})
                          </span>
                        </PlayerName>
                        <PlayerStats>{stats.points} pts, {stats.madeShots}/{stats.shots} tirs</PlayerStats>
                      </PlayerInfo>
                    </PlayerCard>
                  );
                })}
            </PlayersList>
          </TeamPlayersList>
        </ContentSection>
      )}
      
      {activeTab === 'stats' && (
        <ContentSection>
          <SectionTitle><FaChartLine style={{ marginRight: '5px' }} /> Statistiques détaillées</SectionTitle>
          
          <StatGrid>
            <StatCard>
              <StatValue>{totalShots}</StatValue>
              <StatLabel>Tirs tentés</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{madeShots}</StatValue>
              <StatLabel>Tirs réussis</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{shotPercentage}%</StatValue>
              <StatLabel>% de réussite</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{twoPtShots}</StatValue>
              <StatLabel>Tirs à 2pts</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{madeTwoPtShots}</StatValue>
              <StatLabel>2pts réussis</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{twoPtPercentage}%</StatValue>
              <StatLabel>% à 2pts</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{threePtShots}</StatValue>
              <StatLabel>Tirs à 3pts</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{madeThreePtShots}</StatValue>
              <StatLabel>3pts réussis</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{threePtPercentage}%</StatValue>
              <StatLabel>% à 3pts</StatLabel>
            </StatCard>
          </StatGrid>
        </ContentSection>
      )}
      
      {activeTab === 'players' && (
        <ContentSection>
          <SectionTitle><FaUsers style={{ marginRight: '5px' }} /> {homeTeam.nom}</SectionTitle>
          <PlayersList>
            {homePlayers.map(player => {
              const stats = getPlayerStats(player.id);
              return (
                <PlayerCard key={player.id}>
                  <PlayerPhoto>
                    <img src={player.photo} alt={`${player.prenom} ${player.nom}`} />
                  </PlayerPhoto>
                  <PlayerInfo>
                    <PlayerName>
                      <PlayerLink to={`/players/${player.id}`}>
                        {player.prenom} {player.nom} #{player.numero}
                      </PlayerLink>
                    </PlayerName>
                    <PlayerStats>{stats.points} pts, {stats.madeShots}/{stats.shots} tirs, {stats.rebounds} reb, {stats.assists} passes</PlayerStats>
                  </PlayerInfo>
                </PlayerCard>
              );
            })}
          </PlayersList>
          
          <SectionTitle style={{ marginTop: '20px' }}><FaUsers style={{ marginRight: '5px' }} /> {awayTeam.nom}</SectionTitle>
          <PlayersList>
            {awayPlayers.map(player => {
              const stats = getPlayerStats(player.id);
              return (
                <PlayerCard key={player.id}>
                  <PlayerPhoto>
                    <img src={player.photo} alt={`${player.prenom} ${player.nom}`} />
                  </PlayerPhoto>
                  <PlayerInfo>
                    <PlayerName>
                      <PlayerLink to={`/players/${player.id}`}>
                        {player.prenom} {player.nom} #{player.numero}
                      </PlayerLink>
                    </PlayerName>
                    <PlayerStats>{stats.points} pts, {stats.madeShots}/{stats.shots} tirs, {stats.rebounds} reb, {stats.assists} passes</PlayerStats>
                  </PlayerInfo>
                </PlayerCard>
              );
            })}
          </PlayersList>
        </ContentSection>
      )}
      
      {activeTab === 'timeline' && (
        <ContentSection>
          <SectionTitle><FaClock style={{ marginRight: '5px' }} /> Chronologie des événements</SectionTitle>
          
          <EventsList>
            {gameEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((event, index) => {
              const player = players.find(p => p.id === event.joueurId);
              const team = teams.find(t => t.id === event.equipeId);
              
              let description = '';
              if (event.type === 'tir') {
                description = `${player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu'} (${team ? team.nom : 'Équipe inconnue'}) - ${event.reussi ? 'Tir réussi' : 'Tir manqué'} à ${event.typeShot}`;
              } else {
                description = `${player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu'} (${team ? team.nom : 'Équipe inconnue'}) - ${event.type}`;
              }
              
              return (
                <EventItem key={index}>
                  <EventTime>{new Date(event.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</EventTime>
                  <EventIcon type={event.type} success={event.reussi}>
                    <FaBasketballBall />
                  </EventIcon>
                  <EventDescription>{description}</EventDescription>
                </EventItem>
              );
            })}
            
            {gameEvents.length === 0 && (
              <div>Aucun événement enregistré pour ce match.</div>
            )}
          </EventsList>
        </ContentSection>
      )}
      
      {activeTab === 'shots' && (
        <ContentSection>
          <SectionTitle><FaBasketballBall style={{ marginRight: '5px' }} /> Carte des tirs</SectionTitle>
          
          <ShotChartContainer>
            <svg viewBox="0 0 500 470" width="100%" height="auto">
              {/* Terrain de basket */}
              <rect x="0" y="0" width="500" height="470" fill="#f8f8f8" stroke="#333" strokeWidth="2" />
              
              {/* Ligne médiane */}
              <line x1="0" y1="235" x2="500" y2="235" stroke="#333" strokeWidth="2" />
              
              {/* Cercle central */}
              <circle cx="250" cy="235" r="30" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Panier haut */}
              <circle cx="250" cy="60" r="15" fill="none" stroke="#333" strokeWidth="2" />
              <rect x="200" y="0" width="100" height="60" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Panier bas */}
              <circle cx="250" cy="410" r="15" fill="none" stroke="#333" strokeWidth="2" />
              <rect x="200" y="410" width="100" height="60" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Ligne à 3 points haut */}
              <path d="M 100,0 A 150,150 0 0 1 400,0" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Ligne à 3 points bas */}
              <path d="M 100,470 A 150,150 0 0 0 400,470" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Tirs */}
              {gameEvents.filter(e => e.type === 'tir').map((shot, index) => {
                const player = players.find(p => p.id === shot.joueurId);
                const team = teams.find(t => t.id === shot.equipeId);
                
                return (
                  <g key={index}>
                    <circle 
                      cx={shot.positionX} 
                      cy={shot.positionY} 
                      r="8" 
                      fill={shot.reussi ? "#4CAF50" : "#F44336"} 
                      stroke="#fff" 
                      strokeWidth="1"
                    />
                    <title>
                      {player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu'} ({team ? team.nom : 'Équipe inconnue'})
                      {shot.reussi ? ' - Tir réussi' : ' - Tir manqué'} à {shot.typeShot}
                    </title>
                  </g>
                );
              })}
            </svg>
            
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></div>
                <span>Tir réussi</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F44336' }}></div>
                <span>Tir manqué</span>
              </div>
            </div>
          </ShotChartContainer>
        </ContentSection>
      )}
    </GameDetailContainer>
  );
};

export default GameDetail;
