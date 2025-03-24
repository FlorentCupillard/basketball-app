import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus, FaFilter, FaSearch, FaCalendarAlt, FaPlay } from 'react-icons/fa';

const GameListContainer = styled.div`
  width: 100%;
`;

const GameListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const GameListTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const AddGameButton = styled(Link)`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background-color: #1557b0;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  
  @media (max-width: 768px) {
    width: 100%;
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
    flex: 1;
    min-width: 100px;
    text-align: center;
  }
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
`;

const GameCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const GameDate = styled.div`
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const GameStatus = styled.div`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
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
  
  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

const GameContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
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
  }
`;

const TeamLogo = styled.div`
  width: 60px;
  height: 60px;
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
    margin-bottom: 0;
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
`;

const TeamName = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
  }
`;

const ScoreSeparator = styled.span`
  margin: 0 10px;
  color: #999;
`;

const GameTime = styled.div`
  font-size: 14px;
  color: #666;
`;

const GameActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  gap: 10px;
  
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const ActionButton = styled(Link)`
  background-color: ${props => props.primary ? '#1a73e8' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : '#e0e0e0'};
  }
  
  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

const GameList = () => {
  const games = useSelector(state => state.games.games);
  const teams = useSelector(state => state.teams.teams);
  
  // État local pour l'onglet actif
  const [activeTab, setActiveTab] = React.useState('upcoming');
  
  // Obtenir le nom de l'équipe à partir de l'ID
  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.nom : 'Équipe inconnue';
  };
  
  // Obtenir le logo de l'équipe à partir de l'ID
  const getTeamLogo = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.logo : 'https://example.com/default-team-logo.png';
  };
  
  // Filtrer les matchs en fonction de l'onglet actif
  const filteredGames = games.filter(game => {
    const now = new Date();
    const gameDate = new Date(game.date);
    
    switch(activeTab) {
      case 'upcoming':
        return gameDate > now && game.statut === 'à venir';
      case 'live':
        return game.statut === 'en cours';
      case 'completed':
        return game.statut === 'terminé';
      default:
        return true;
    }
  });
  
  // Changer l'onglet actif
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <GameListContainer>
      <GameListHeader>
        <GameListTitle>Matchs</GameListTitle>
        <AddGameButton to="/games/create"><FaPlus /> Ajouter</AddGameButton>
      </GameListHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'upcoming'} 
          onClick={() => handleTabChange('upcoming')}
        >
          À venir
        </Tab>
        <Tab 
          active={activeTab === 'live'} 
          onClick={() => handleTabChange('live')}
        >
          En direct
        </Tab>
        <Tab 
          active={activeTab === 'completed'} 
          onClick={() => handleTabChange('completed')}
        >
          Terminés
        </Tab>
      </TabsContainer>
      
      <GamesGrid>
        {filteredGames.map(game => (
          <GameCard key={game.id}>
            <GameHeader>
              <GameDate>
                <FaCalendarAlt /> {new Date(game.date).toLocaleDateString('fr-FR')}
              </GameDate>
              <GameStatus status={game.statut === 'en cours' ? 'live' : (game.statut === 'terminé' ? 'completed' : 'upcoming')}>
                {game.statut === 'en cours' ? 'En cours' : (game.statut === 'terminé' ? 'Terminé' : 'À venir')}
              </GameStatus>
            </GameHeader>
            
            <GameContent>
              <TeamContainer>
                <TeamLogo>
                  <img src={getTeamLogo(game.equipeLocale.id)} alt={`Logo ${getTeamName(game.equipeLocale.id)}`} />
                </TeamLogo>
                <TeamName>{getTeamName(game.equipeLocale.id)}</TeamName>
              </TeamContainer>
              
              <ScoreContainer>
                <ScoreDisplay>
                  {game.equipeLocale.score}
                  <ScoreSeparator>-</ScoreSeparator>
                  {game.equipeVisiteur.score}
                </ScoreDisplay>
                <GameTime>
                  {game.statut === 'en cours' ? 'En direct' : (game.statut === 'terminé' ? 'Terminé' : new Date(game.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))}
                </GameTime>
              </ScoreContainer>
              
              <TeamContainer>
                <TeamLogo>
                  <img src={getTeamLogo(game.equipeVisiteur.id)} alt={`Logo ${getTeamName(game.equipeVisiteur.id)}`} />
                </TeamLogo>
                <TeamName>{getTeamName(game.equipeVisiteur.id)}</TeamName>
              </TeamContainer>
            </GameContent>
            
            <GameActions>
              <ActionButton to={`/games/${game.id}`}>Détails</ActionButton>
              {game.statut !== 'terminé' && (
                <ActionButton to={`/games/${game.id}/live`} primary>
                  <FaPlay /> {game.statut === 'en cours' ? 'Suivre' : 'Commencer'}
                </ActionButton>
              )}
            </GameActions>
          </GameCard>
        ))}
      </GamesGrid>
    </GameListContainer>
  );
};

export default GameList;
