import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';

const TeamListContainer = styled.div`
  width: 100%;
`;

const TeamListHeader = styled.div`
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

const TeamListTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const AddTeamButton = styled(Link)`
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

const TeamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TeamCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TeamHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const TeamLogo = styled.div`
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

const TeamName = styled.h2`
  font-size: 18px;
  margin: 0;
  color: #333;
`;

const TeamStats = styled.div`
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

const TeamActions = styled.div`
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

const TeamList = () => {
  const teams = useSelector(state => state.teams.teams);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);
  
  // Filtrer les équipes en fonction du terme de recherche
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTeams(teams);
    } else {
      const filtered = teams.filter(team => 
        team.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTeams(filtered);
    }
  }, [searchTerm, teams]);
  
  // Gérer la soumission du formulaire de recherche
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // La recherche est déjà effectuée via l'effet useEffect
  };
  
  // Gérer le changement dans le champ de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <TeamListContainer>
      <TeamListHeader>
        <TeamListTitle>Équipes</TeamListTitle>
        <AddTeamButton to="/teams/create"><FaPlus /> Ajouter</AddTeamButton>
      </TeamListHeader>
      
      <SearchBar as="form" onSubmit={handleSearchSubmit}>
        <SearchInput 
          type="text" 
          placeholder="Rechercher une équipe..." 
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
      </SearchBar>
      
      <TeamsGrid>
        {filteredTeams.length > 0 ? (
          filteredTeams.map(team => (
            <TeamCard key={team.id}>
              <TeamHeader>
                <TeamLogo>
                  <img src={team.logo} alt={`Logo ${team.nom}`} />
                </TeamLogo>
                <TeamName>{team.nom}</TeamName>
              </TeamHeader>
              
              <TeamStats>
                <StatItem>
                  <StatValue>{team.statistiquesEquipe.matchsJoues}</StatValue>
                  <StatLabel>Matchs</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{team.statistiquesEquipe.victoires}</StatValue>
                  <StatLabel>Victoires</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{team.statistiquesEquipe.defaites}</StatValue>
                  <StatLabel>Défaites</StatLabel>
                </StatItem>
              </TeamStats>
              
              <TeamActions>
                <ActionButton to={`/teams/${team.id}`}>Détails</ActionButton>
                <ActionButton to={`/teams/${team.id}/edit`}>Modifier</ActionButton>
              </TeamActions>
            </TeamCard>
          ))
        ) : (
          <div>Aucune équipe ne correspond à votre recherche.</div>
        )}
      </TeamsGrid>
    </TeamListContainer>
  );
};

export default TeamList;
