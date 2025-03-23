import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaEdit, FaChartBar, FaBasketballBall } from 'react-icons/fa';

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
  
  useEffect(() => {
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
    }
  }, [gameId, games, teams, events]);
  
  if (!game || !homeTeam || !awayTeam) {
    return <div>Chargement des détails du match...</div>;
  }
  
  // Calculer les statistiques du match
  const totalShots = gameEvents.filter(e => e.type === 'tir').length;
  const madeShots = gameEvents.filter(e => e.type === 'tir' && e.reussi).length;
  const shotPercentage = totalShots > 0 ? Math.round((madeShots / totalShots) * 100) : 0;
  
  const threePtShots = gameEvents.filter(e => e.type === 'tir' && e.typeShot === '3pts').length;
  const madeThreePtShots = gameEvents.filter(e => e.type === 'tir' && e.typeShot === '3pts' && e.reussi).length;
  const threePtPercentage = threePtShots > 0 ? Math.round((madeThreePtShots / threePtShots) * 100) : 0;
  
  // Obtenir les joueurs des deux équipes qui ont participé au match
  const homePlayers = players.filter(p => p.equipeId === homeTeam.id);
  const awayPlayers = players.filter(p => p.equipeId === awayTeam.id);
  
  // Obtenir les statistiques des joueurs pour ce match
  const getPlayerStats = (playerId) => {
    const playerEvents = gameEvents.filter(e => e.joueurId === playerId);
    const points = playerEvents.filter(e => e.type === 'tir' && e.reussi)
      .reduce((total, event) => {
        if (event.typeShot === '3pts') return total + 3;
        if (event.typeShot === '2pts') return total + 2;
        if (event.typeShot === 'lf') return total + 1;
        return total;
      }, 0);
    
    return {
      points,
      shots: playerEvents.filter(e => e.type === 'tir').length,
      madeShots: playerEvents.filter(e => e.type === 'tir' && e.reussi).length
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
              {new Date(game.date).toLocaleDateString('fr-FR')} - {new Date(game.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
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
          {!game.termine && (
            <ActionButton to={`/games/${game.id}/live`} primary>
              <FaPlay /> {game.enCours ? 'Suivre en direct' : 'Commencer le match'}
            </ActionButton>
          )}
          <ActionButton to={`/games/${game.id}/edit`}>
            <FaEdit /> Modifier
          </ActionButton>
          <ActionButton to={`/shot-chart?game=${game.id}`}>
            <FaChartBar /> Voir la carte des tirs
          </ActionButton>
        </GameActions>
      </GameHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'summary'} 
          onClick={() => setActiveTab('summary')}
        >
          Résumé
        </Tab>
        <Tab 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
        >
          Statistiques
        </Tab>
        <Tab 
          active={activeTab === 'players'} 
          onClick={() => setActiveTab('players')}
        >
          Joueurs
        </Tab>
        <Tab 
          active={activeTab === 'timeline'} 
          onClick={() => setActiveTab('timeline')}
        >
          Chronologie
        </Tab>
        <Tab 
          active={activeTab === 'shots'} 
          onClick={() => setActiveTab('shots')}
        >
          Tirs
        </Tab>
      </TabsContainer>
      
      {activeTab === 'summary' && (
        <ContentSection>
          <SectionTitle>Résumé du match</SectionTitle>
          
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
              <StatValue>{threePtPercentage}%</StatValue>
              <StatLabel>% à 3 points</StatLabel>
            </StatCard>
          </StatGrid>
        </ContentSection>
      )}
      
      {activeTab === 'stats' && (
        <ContentSection>
          <SectionTitle>Statistiques détaillées</SectionTitle>
          
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
              <StatLabel>Tirs à 3pts tentés</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{madeThreePtShots}</StatValue>
              <StatLabel>Tirs à 3pts réussis</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{threePtPercentage}%</StatValue>
              <StatLabel>% à 3 points</StatLabel>
            </StatCard>
          </StatGrid>
        </ContentSection>
      )}
      
      {activeTab === 'players' && (
        <ContentSection>
          <SectionTitle>{homeTeam.nom}</SectionTitle>
          <PlayersList>
            {homePlayers.map(player => {
              const stats = getPlayerStats(player.id);
              return (
                <PlayerCard key={player.id}>
                  <PlayerPhoto>
                    <img src={player.photo} alt={`${player.prenom} ${player.nom}`} />
                  </PlayerPhoto>
                  <PlayerInfo>
                    <PlayerName>{player.prenom} {player.nom} #{player.numero}</PlayerName>
                    <PlayerStats>{stats.points} pts, {stats.madeShots}/{stats.shots} tirs</PlayerStats>
                  </PlayerInfo>
                </PlayerCard>
              );
            })}
          </PlayersList>
          
          <SectionTitle style={{ marginTop: '20px' }}>{awayTeam.nom}</SectionTitle>
          <PlayersList>
            {awayPlayers.map(player => {
              const stats = getPlayerStats(player.id);
              return (
                <PlayerCard key={player.id}>
                  <PlayerPhoto>
                    <img src={player.photo} alt={`${player.prenom} ${player.nom}`} />
                  </PlayerPhoto>
                  <PlayerInfo>
                    <PlayerName>{player.prenom} {player.nom} #{player.numero}</PlayerName>
                    <PlayerStats>{stats.points} pts, {stats.madeShots}/{stats.shots} tirs</PlayerStats>
                  </PlayerInfo>
                </PlayerCard>
              );
            })}
          </PlayersList>
        </ContentSection>
      )}
      
      {activeTab === 'timeline' && (
        <ContentSection>
          <SectionTitle>Chronologie des événements</SectionTitle>
          
          <EventsList>
            {gameEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((event, index) => {
              const player = players.find(p => p.id === event.joueurId);
              const team = teams.find(t => t.id === event.equipeId);
              
              let description = '';
              if (event.type === 'tir') {
                description = `${player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu'} (${team ? team.nom : 'Équipe inconnue'}) - Tir ${event.typeShot} ${event.reussi ? 'réussi' : 'manqué'}`;
              } else {
                description = `Événement: ${event.type}`;
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
          <SectionTitle>Carte des tirs</SectionTitle>
          
          <ShotChartContainer>
            <svg viewBox="0 0 500 470" width="100%" height="auto">
              {/* Terrain de basket */}
              <rect x="0" y="0" width="500" height="470" fill="#f8f8f8" stroke="#333" strokeWidth="2" />
              
              {/* Ligne médiane */}
              <line x1="0" y1="235" x2="500" y2="235" stroke="#333" strokeWidth="2" />
              <circle cx="250" cy="235" r="30" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Cercle central */}
              <circle cx="250" cy="235" r="60" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Zone restrictive bas */}
              <rect x="175" y="370" width="150" height="100" fill="none" stroke="#333" strokeWidth="2" />
              <line x1="175" y1="420" x2="325" y2="420" stroke="#333" strokeWidth="2" />
              
              {/* Zone restrictive haut */}
              <rect x="175" y="0" width="150" height="100" fill="none" stroke="#333" strokeWidth="2" />
              <line x1="175" y1="50" x2="325" y2="50" stroke="#333" strokeWidth="2" />
              
              {/* Cercle bas */}
              <circle cx="250" cy="370" r="60" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Cercle haut */}
              <circle cx="250" cy="100" r="60" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Ligne à 3 points bas */}
              <path d="M 100,470 A 150,150 0 0,1 400,470" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Ligne à 3 points haut */}
              <path d="M 100,0 A 150,150 0 0,0 400,0" fill="none" stroke="#333" strokeWidth="2" />
              
              {/* Panier bas */}
              <circle cx="250" cy="440" r="5" fill="#333" />
              <line x1="230" y1="440" x2="270" y2="440" stroke="#333" strokeWidth="3" />
              
              {/* Panier haut */}
              <circle cx="250" cy="30" r="5" fill="#333" />
              <line x1="230" y1="30" x2="270" y2="30" stroke="#333" strokeWidth="3" />
              
              {/* Afficher les tirs */}
              {gameEvents.filter(e => e.type === 'tir').map((shot, index) => (
                <g key={index}>
                  <circle 
                    cx={shot.positionX * 500} 
                    cy={shot.positionY * 470} 
                    r={8}
                    fill={shot.reussi ? '#4CAF50' : '#F44336'}
                  />
                </g>
              ))}
            </svg>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4CAF50' }}></div>
                <span>Tirs réussis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F44336' }}></div>
                <span>Tirs manqués</span>
              </div>
            </div>
          </ShotChartContainer>
        </ContentSection>
      )}
    </GameDetailContainer>
  );
};

export default GameDetail;
