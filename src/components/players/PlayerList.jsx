import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';

const PlayerListContainer = styled.div`
  width: 100%;
`;

const PlayerListHeader = styled.div`
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

const PlayerListTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const AddPlayerButton = styled(Link)`
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

const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #666;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const SearchButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #1557b0;
  }
`;

const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlayerCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
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
  background-color: #f0f0f0;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.h2`
  font-size: 18px;
  margin: 0 0 5px 0;
  color: #333;
`;

const PlayerTeam = styled.div`
  font-size: 14px;
  color: #666;
`;

const PlayerNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1a73e8;
  margin-left: auto;
`;

const PlayerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 15px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1a73e8;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const PlayerActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const ActionButton = styled(Link)`
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const PlayerList = () => {
  const players = useSelector(state => state.players.players);
  const teams = useSelector(state => state.teams.teams);
  
  // État local pour les filtres
  const [teamFilter, setTeamFilter] = React.useState('');
  const [positionFilter, setPositionFilter] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Obtenir le nom de l'équipe à partir de l'ID
  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.nom : 'Équipe inconnue';
  };
  
  // Filtrer les joueurs en fonction des critères
  const filteredPlayers = players.filter(player => {
    // Filtre par équipe
    if (teamFilter && player.equipeId !== teamFilter) {
      return false;
    }
    
    // Filtre par poste
    if (positionFilter && player.poste !== positionFilter) {
      return false;
    }
    
    // Filtre par recherche
    if (searchQuery) {
      const fullName = `${player.prenom} ${player.nom}`.toLowerCase();
      if (!fullName.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    
    return true;
  });
  
  // Gérer le changement de filtre d'équipe
  const handleTeamFilterChange = (e) => {
    setTeamFilter(e.target.value);
  };
  
  // Gérer le changement de filtre de poste
  const handlePositionFilterChange = (e) => {
    setPositionFilter(e.target.value);
  };
  
  // Gérer le changement de recherche
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Gérer la soumission de la recherche
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // La recherche est déjà appliquée en temps réel, donc rien à faire ici
  };
  
  return (
    <PlayerListContainer>
      <PlayerListHeader>
        <PlayerListTitle>Joueurs</PlayerListTitle>
        <AddPlayerButton to="/players/create"><FaPlus /> Ajouter</AddPlayerButton>
      </PlayerListHeader>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Équipe</FilterLabel>
          <FilterSelect value={teamFilter} onChange={handleTeamFilterChange}>
            <option value="">Toutes les équipes</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.nom}</option>
            ))}
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Poste</FilterLabel>
          <FilterSelect value={positionFilter} onChange={handlePositionFilterChange}>
            <option value="">Tous les postes</option>
            <option value="meneur">Meneur</option>
            <option value="arriere">Arrière</option>
            <option value="ailier">Ailier</option>
            <option value="ailier fort">Ailier fort</option>
            <option value="pivot">Pivot</option>
          </FilterSelect>
        </FilterGroup>
        
        <SearchBar>
          <SearchInput 
            type="text" 
            placeholder="Rechercher un joueur..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchButton onClick={handleSearchSubmit}>
            <FaSearch />
          </SearchButton>
        </SearchBar>
      </FiltersContainer>
      
      <PlayersGrid>
        {filteredPlayers.map(player => (
          <PlayerCard key={player.id}>
            <PlayerHeader>
              <PlayerPhoto>
                <img src={player.photo} alt={`Photo ${player.prenom} ${player.nom}`} />
              </PlayerPhoto>
              <PlayerInfo>
                <PlayerName>{player.prenom} {player.nom}</PlayerName>
                <PlayerTeam>{getTeamName(player.equipeId)}</PlayerTeam>
              </PlayerInfo>
              <PlayerNumber>#{player.numero}</PlayerNumber>
            </PlayerHeader>
            
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
            
            <PlayerActions>
              <ActionButton to={`/players/${player.id}`}>Détails</ActionButton>
              <ActionButton to={`/players/${player.id}/edit`}>Modifier</ActionButton>
            </PlayerActions>
          </PlayerCard>
        ))}
      </PlayersGrid>
    </PlayerListContainer>
  );
};

export default PlayerList;
