import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaUsers, FaBasketballBall, FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const TeamDetailContainer = styled.div`
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

const TeamHeader = styled.div`
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

const TeamLogo = styled.div`
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

const TeamInfo = styled.div`
  flex: 1;
`;

const TeamName = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const TeamStats = styled.div`
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

const TeamActions = styled.div`
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

const PlayersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlayerCard = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.3s, box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PlayerPhoto = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
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
  font-size: 16px;
  margin-bottom: 5px;
`;

const PlayerPosition = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const PlayerStats = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
  font-size: 13px;
  color: #555;
`;

const PlayerStatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
  font-style: italic;
`;

const TeamDetail = () => {
  const { teamId } = useParams();
  const teams = useSelector(state => state.teams.teams);
  const players = useSelector(state => state.players.players);
  const games = useSelector(state => state.games.games);
  
  const [activeTab, setActiveTab] = useState('players');
  const [team, setTeam] = useState(null);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [teamGames, setTeamGames] = useState([]);
  
  useEffect(() => {
    // Trouver l'équipe correspondante
    const foundTeam = teams.find(t => t.id === teamId);
    if (foundTeam) {
      setTeam(foundTeam);
      
      // Filtrer les joueurs de cette équipe
      const filteredPlayers = players.filter(player => player.equipeId === teamId);
      setTeamPlayers(filteredPlayers);
      
      // Filtrer les matchs de cette équipe
      const filteredGames = games.filter(game => 
        game.equipeLocale.id === teamId || game.equipeVisiteur.id === teamId
      );
      setTeamGames(filteredGames);
    }
  }, [teamId, teams, players, games]);
  
  if (!team) {
    return (
      <TeamDetailContainer>
        <BackButton to="/teams">
          <FaArrowLeft /> Retour aux équipes
        </BackButton>
        <EmptyState>Équipe non trouvée</EmptyState>
      </TeamDetailContainer>
    );
  }
  
  // Obtenir le nom de l'équipe à partir de l'ID
  const getTeamName = (id) => {
    const team = teams.find(t => t.id === id);
    return team ? team.nom : 'Équipe inconnue';
  };
  
  // Obtenir le logo de l'équipe à partir de l'ID
  const getTeamLogo = (id) => {
    const team = teams.find(t => t.id === id);
    return team ? team.logo : 'https://example.com/default-team-logo.png';
  };
  
  return (
    <TeamDetailContainer>
      <BackButton to="/teams">
        <FaArrowLeft /> Retour aux équipes
      </BackButton>
      
      <TeamHeader>
        <TeamLogo>
          <img src={team.logo} alt={`Logo ${team.nom}`} />
        </TeamLogo>
        
        <TeamInfo>
          <TeamName>{team.nom}</TeamName>
          <div>{team.ville}</div>
          
          <TeamStats>
            <StatItem>
              <StatValue>{team.statistiquesEquipe?.matchsJoues || 0}</StatValue>
              <StatLabel>Matchs</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{team.statistiquesEquipe?.victoires || 0}</StatValue>
              <StatLabel>Victoires</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{team.statistiquesEquipe?.defaites || 0}</StatValue>
              <StatLabel>Défaites</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{team.statistiquesEquipe?.pointsMarques || 0}</StatValue>
              <StatLabel>Points</StatLabel>
            </StatItem>
          </TeamStats>
        </TeamInfo>
        
        <TeamActions>
          <ActionButton to={`/teams/${team.id}/edit`}>
            <FaEdit /> Modifier
          </ActionButton>
        </TeamActions>
      </TeamHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'players'} 
          onClick={() => setActiveTab('players')}
        >
          <FaUsers /> Joueurs
        </Tab>
        <Tab 
          active={activeTab === 'games'} 
          onClick={() => setActiveTab('games')}
        >
          <FaBasketballBall /> Matchs
        </Tab>
        <Tab 
          active={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
        >
          <FaTrophy /> Statistiques
        </Tab>
      </TabsContainer>
      
      {activeTab === 'players' && (
        <ContentSection>
          <SectionTitle>
            <FaUsers /> Joueurs de l'équipe
          </SectionTitle>
          
          {teamPlayers.length > 0 ? (
            <PlayersList>
              {teamPlayers.map(player => (
                <PlayerCard key={player.id} to={`/players/${player.id}`}>
                  <PlayerPhoto>
                    <img src={player.photo} alt={`Photo de ${player.prenom} ${player.nom}`} />
                  </PlayerPhoto>
                  <PlayerInfo>
                    <PlayerName>{player.prenom} {player.nom}</PlayerName>
                    <PlayerPosition>{player.poste}</PlayerPosition>
                    <PlayerStats>
                      <PlayerStatItem>
                        {player.statistiquesGlobales?.pointsParMatch || 0} PPM
                      </PlayerStatItem>
                      <PlayerStatItem>
                        {player.statistiquesGlobales?.rebondsParMatch || 0} RPM
                      </PlayerStatItem>
                      <PlayerStatItem>
                        {player.statistiquesGlobales?.passesDecisivesParMatch || 0} APM
                      </PlayerStatItem>
                    </PlayerStats>
                  </PlayerInfo>
                </PlayerCard>
              ))}
            </PlayersList>
          ) : (
            <EmptyState>Aucun joueur dans cette équipe</EmptyState>
          )}
        </ContentSection>
      )}
      
      {activeTab === 'games' && (
        <ContentSection>
          <SectionTitle>
            <FaBasketballBall /> Matchs de l'équipe
          </SectionTitle>
          
          {teamGames.length > 0 ? (
            <GamesList>
              {teamGames.map(game => {
                const isHomeTeam = game.equipeLocale.id === team.id;
                const opponent = isHomeTeam ? game.equipeVisiteur : game.equipeLocale;
                const opponentName = getTeamName(opponent.id);
                const opponentLogo = getTeamLogo(opponent.id);
                
                return (
                  <GameItem key={game.id} to={`/games/${game.id}`}>
                    <GameDate>
                      <FaCalendarAlt /> {new Date(game.date).toLocaleDateString('fr-FR')}
                    </GameDate>
                    
                    <GameTeams>
                      {isHomeTeam ? (
                        <>
                          <GameTeam>
                            <img src={team.logo} alt={`Logo ${team.nom}`} />
                            <div>{team.nom}</div>
                          </GameTeam>
                          <div>vs</div>
                          <GameTeam>
                            <img src={opponentLogo} alt={`Logo ${opponentName}`} />
                            <div>{opponentName}</div>
                          </GameTeam>
                        </>
                      ) : (
                        <>
                          <GameTeam>
                            <img src={opponentLogo} alt={`Logo ${opponentName}`} />
                            <div>{opponentName}</div>
                          </GameTeam>
                          <div>vs</div>
                          <GameTeam>
                            <img src={team.logo} alt={`Logo ${team.nom}`} />
                            <div>{team.nom}</div>
                          </GameTeam>
                        </>
                      )}
                    </GameTeams>
                    
                    <GameScore>
                      {isHomeTeam ? (
                        `${game.equipeLocale.score} - ${game.equipeVisiteur.score}`
                      ) : (
                        `${game.equipeVisiteur.score} - ${game.equipeLocale.score}`
                      )}
                    </GameScore>
                    
                    <GameStatus status={game.statut}>
                      {game.statut}
                    </GameStatus>
                  </GameItem>
                );
              })}
            </GamesList>
          ) : (
            <EmptyState>Aucun match pour cette équipe</EmptyState>
          )}
        </ContentSection>
      )}
      
      {activeTab === 'stats' && (
        <ContentSection>
          <SectionTitle>
            <FaTrophy /> Statistiques de l'équipe
          </SectionTitle>
          
          <StatGrid>
            <StatCard>
              <StatValue>{team.statistiquesEquipe?.matchsJoues || 0}</StatValue>
              <StatLabel>Matchs joués</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{team.statistiquesEquipe?.victoires || 0}</StatValue>
              <StatLabel>Victoires</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{team.statistiquesEquipe?.defaites || 0}</StatValue>
              <StatLabel>Défaites</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>
                {team.statistiquesEquipe?.matchsJoues ? 
                  ((team.statistiquesEquipe.victoires / team.statistiquesEquipe.matchsJoues) * 100).toFixed(1) : 
                  0
                }%
              </StatValue>
              <StatLabel>% Victoires</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{team.statistiquesEquipe?.pointsMarques || 0}</StatValue>
              <StatLabel>Points marqués</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{team.statistiquesEquipe?.pointsEncaisses || 0}</StatValue>
              <StatLabel>Points encaissés</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>
                {team.statistiquesEquipe?.matchsJoues ? 
                  (team.statistiquesEquipe.pointsMarques / team.statistiquesEquipe.matchsJoues).toFixed(1) : 
                  0
                }
              </StatValue>
              <StatLabel>Points par match</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>
                {team.statistiquesEquipe?.matchsJoues ? 
                  (team.statistiquesEquipe.pointsEncaisses / team.statistiquesEquipe.matchsJoues).toFixed(1) : 
                  0
                }
              </StatValue>
              <StatLabel>Points encaissés par match</StatLabel>
            </StatCard>
          </StatGrid>
        </ContentSection>
      )}
    </TeamDetailContainer>
  );
};

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
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default TeamDetail;
