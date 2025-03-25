import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaBasketballBall, FaCheck, FaTimes, FaFilter, FaChartBar, FaSearch, FaUsers, FaGamepad, FaClock, FaRuler } from 'react-icons/fa';
import BasketballCourt from './BasketballCourt';
import ShotMarker from './ShotMarker';

const ShotChartContainer = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 10px;
  
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const ShotChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
  }
`;

const ShotChartTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FiltersToggle = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #1557b0;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const FiltersContainer = styled.div`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 10px;
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
  display: flex;
  align-items: center;
  gap: 5px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
  background-color: white;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #1a73e8;
    outline: none;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CourtContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.color || '#1a73e8'};
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
`;

const ShotTypeDistribution = styled.div`
  margin-top: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ShotTypeTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ShotTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ShotTypeCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ShotTypeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ShotTypeName = styled.div`
  font-weight: 600;
  color: #333;
`;

const ShotTypePercentage = styled.div`
  font-weight: 700;
  color: ${props => props.percentage >= 50 ? '#4CAF50' : props.percentage >= 30 ? '#FF9800' : '#F44336'};
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => props.percentage >= 50 ? '#4CAF50' : props.percentage >= 30 ? '#FF9800' : '#F44336'};
  transition: width 0.5s ease;
`;

const ShotTypeStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: #666;
`;

const ShotChart = () => {
  const shots = useSelector(state => state.events.events.filter(event => event.type === 'tir'));
  const players = useSelector(state => state.players.players);
  const teams = useSelector(state => state.teams.teams);
  const games = useSelector(state => state.games.games);
  
  // État local pour les filtres
  const [playerFilter, setPlayerFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [gameFilter, setGameFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('');
  const [shotTypeFilter, setShotTypeFilter] = useState('');
  const [shotResultFilter, setShotResultFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [highlightedShot, setHighlightedShot] = useState(null);
  
  // Filtrer les tirs en fonction des critères
  const filteredShots = shots.filter(shot => {
    if (playerFilter && shot.joueurId !== playerFilter) return false;
    if (teamFilter && shot.equipeId !== teamFilter) return false;
    if (gameFilter && shot.matchId !== gameFilter) return false;
    if (periodFilter && shot.periode !== parseInt(periodFilter)) return false;
    if (shotTypeFilter && shot.typeShot !== shotTypeFilter) return false;
    if (shotResultFilter === 'made' && !shot.reussi) return false;
    if (shotResultFilter === 'missed' && shot.reussi) return false;
    return true;
  });
  
  // Calculer les statistiques
  const totalShots = filteredShots.length;
  const madeShots = filteredShots.filter(shot => shot.reussi).length;
  const shotPercentage = totalShots > 0 ? Math.round((madeShots / totalShots) * 100) : 0;
  
  // Calculer les statistiques par type de tir
  const shotTypes = {
    '2pts': { total: 0, made: 0, percentage: 0 },
    '3pts': { total: 0, made: 0, percentage: 0 },
    'lf': { total: 0, made: 0, percentage: 0 }
  };
  
  filteredShots.forEach(shot => {
    const type = shot.typeShot || '2pts';
    if (shotTypes[type]) {
      shotTypes[type].total++;
      if (shot.reussi) {
        shotTypes[type].made++;
      }
    }
  });
  
  // Calculer les pourcentages
  Object.keys(shotTypes).forEach(type => {
    shotTypes[type].percentage = shotTypes[type].total > 0 
      ? Math.round((shotTypes[type].made / shotTypes[type].total) * 100) 
      : 0;
  });
  
  // Obtenir le nom du joueur à partir de l'ID
  const getPlayerName = (playerId) => {
    const player = players.find(player => player.id === playerId);
    return player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu';
  };
  
  // Obtenir le nom de l'équipe à partir de l'ID
  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.nom : 'Équipe non assignée';
  };
  
  // Obtenir le nom du match à partir de l'ID
  const getGameName = (gameId) => {
    const game = games.find(game => game.id === gameId);
    if (!game) return 'Match inconnu';
    
    const homeTeam = getTeamName(game.equipeLocaleId);
    const awayTeam = getTeamName(game.equipeVisiteurId);
    return `${homeTeam} vs ${awayTeam}`;
  };
  
  // Gérer le clic sur un marqueur de tir
  const handleShotClick = (shot) => {
    setHighlightedShot(shot);
  };
  
  // Réinitialiser le tir surligné lorsque les filtres changent
  useEffect(() => {
    setHighlightedShot(null);
  }, [playerFilter, teamFilter, gameFilter, periodFilter, shotTypeFilter, shotResultFilter]);
  
  return (
    <ShotChartContainer>
      <ShotChartHeader>
        <ShotChartTitle>
          <FaBasketballBall /> Carte des Tirs
        </ShotChartTitle>
        <FiltersToggle onClick={() => setShowFilters(!showFilters)}>
          <FaFilter /> {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
        </FiltersToggle>
      </ShotChartHeader>
      
      <FiltersContainer isVisible={showFilters}>
        <FilterGroup>
          <FilterLabel><FaBasketballBall /> Joueur</FilterLabel>
          <FilterSelect value={playerFilter} onChange={(e) => setPlayerFilter(e.target.value)}>
            <option value="">Tous les joueurs</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>
                {player.prenom} {player.nom}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel><FaUsers /> Équipe</FilterLabel>
          <FilterSelect value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
            <option value="">Toutes les équipes</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.nom}</option>
            ))}
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel><FaGamepad /> Match</FilterLabel>
          <FilterSelect value={gameFilter} onChange={(e) => setGameFilter(e.target.value)}>
            <option value="">Tous les matchs</option>
            {games.map(game => (
              <option key={game.id} value={game.id}>
                {getTeamName(game.equipeLocaleId)} vs {getTeamName(game.equipeVisiteurId)}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel><FaClock /> Période</FilterLabel>
          <FilterSelect value={periodFilter} onChange={(e) => setPeriodFilter(e.target.value)}>
            <option value="">Toutes les périodes</option>
            <option value="1">1ère période</option>
            <option value="2">2ème période</option>
            <option value="3">3ème période</option>
            <option value="4">4ème période</option>
            <option value="5">Prolongation</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel><FaRuler /> Type de tir</FilterLabel>
          <FilterSelect value={shotTypeFilter} onChange={(e) => setShotTypeFilter(e.target.value)}>
            <option value="">Tous les types</option>
            <option value="2pts">2 points</option>
            <option value="3pts">3 points</option>
            <option value="lf">Lancer franc</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel><FaCheck /> Résultat</FilterLabel>
          <FilterSelect value={shotResultFilter} onChange={(e) => setShotResultFilter(e.target.value)}>
            <option value="">Tous les résultats</option>
            <option value="made">Réussis</option>
            <option value="missed">Manqués</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>
      
      <CourtContainer>
        <BasketballCourt interactive={true}>
          {filteredShots.map((shot, index) => (
            <ShotMarker 
              key={index}
              x={shot.positionX * 100} 
              y={shot.positionY * 100}
              made={shot.reussi}
              playerId={shot.joueurId}
              playerName={getPlayerName(shot.joueurId)}
              shotType={shot.typeShot || '2pts'}
              onClick={() => handleShotClick(shot)}
              highlighted={highlightedShot === shot}
              size={highlightedShot === shot ? '18px' : '14px'}
              iconSize={highlightedShot === shot ? '10px' : '8px'}
            />
          ))}
        </BasketballCourt>
      </CourtContainer>
      
      {totalShots === 0 ? (
        <NoDataMessage>
          Aucun tir ne correspond aux critères de filtrage sélectionnés.
        </NoDataMessage>
      ) : (
        <>
          <StatsContainer>
            <StatCard>
              <StatValue>{totalShots}</StatValue>
              <StatLabel>Tirs tentés</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue color="#4CAF50">{madeShots}</StatValue>
              <StatLabel>Tirs réussis</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue color="#F44336">{totalShots - madeShots}</StatValue>
              <StatLabel>Tirs manqués</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue color={shotPercentage >= 50 ? '#4CAF50' : shotPercentage >= 30 ? '#FF9800' : '#F44336'}>
                {shotPercentage}%
              </StatValue>
              <StatLabel>Pourcentage</StatLabel>
            </StatCard>
          </StatsContainer>
          
          <ShotTypeDistribution>
            <ShotTypeTitle>
              <FaChartBar /> Distribution par type de tir
            </ShotTypeTitle>
            <ShotTypeGrid>
              <ShotTypeCard>
                <ShotTypeHeader>
                  <ShotTypeName>2 Points</ShotTypeName>
                  <ShotTypePercentage percentage={shotTypes['2pts'].percentage}>
                    {shotTypes['2pts'].percentage}%
                  </ShotTypePercentage>
                </ShotTypeHeader>
                <ProgressBar>
                  <ProgressFill percentage={shotTypes['2pts'].percentage} />
                </ProgressBar>
                <ShotTypeStats>
                  <span>{shotTypes['2pts'].made} / {shotTypes['2pts'].total} tirs réussis</span>
                </ShotTypeStats>
              </ShotTypeCard>
              
              <ShotTypeCard>
                <ShotTypeHeader>
                  <ShotTypeName>3 Points</ShotTypeName>
                  <ShotTypePercentage percentage={shotTypes['3pts'].percentage}>
                    {shotTypes['3pts'].percentage}%
                  </ShotTypePercentage>
                </ShotTypeHeader>
                <ProgressBar>
                  <ProgressFill percentage={shotTypes['3pts'].percentage} />
                </ProgressBar>
                <ShotTypeStats>
                  <span>{shotTypes['3pts'].made} / {shotTypes['3pts'].total} tirs réussis</span>
                </ShotTypeStats>
              </ShotTypeCard>
              
              <ShotTypeCard>
                <ShotTypeHeader>
                  <ShotTypeName>Lancers Francs</ShotTypeName>
                  <ShotTypePercentage percentage={shotTypes['lf'].percentage}>
                    {shotTypes['lf'].percentage}%
                  </ShotTypePercentage>
                </ShotTypeHeader>
                <ProgressBar>
                  <ProgressFill percentage={shotTypes['lf'].percentage} />
                </ProgressBar>
                <ShotTypeStats>
                  <span>{shotTypes['lf'].made} / {shotTypes['lf'].total} tirs réussis</span>
                </ShotTypeStats>
              </ShotTypeCard>
            </ShotTypeGrid>
          </ShotTypeDistribution>
        </>
      )}
    </ShotChartContainer>
  );
};

export default ShotChart;
