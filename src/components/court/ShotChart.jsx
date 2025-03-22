import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaBasketballBall, FaCheck, FaTimes } from 'react-icons/fa';

const ShotChartContainer = styled.div`
  width: 100%;
  max-width: 100%;
`;

const ShotChartHeader = styled.div`
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

const ShotChartTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  
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

const CourtContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1a73e8;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
  flex-wrap: wrap;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #666;
`;

const LegendMarker = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
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
  
  // Obtenir le nom du joueur à partir de l'ID
  const getPlayerName = (playerId) => {
    const player = players.find(player => player.id === playerId);
    return player ? `${player.prenom} ${player.nom}` : 'Joueur inconnu';
  };
  
  // Obtenir le nom de l'équipe à partir de l'ID
  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.nom : 'Équipe inconnue';
  };
  
  // Obtenir le nom du match à partir de l'ID
  const getGameName = (gameId) => {
    const game = games.find(game => game.id === gameId);
    if (!game) return 'Match inconnu';
    
    const homeTeam = getTeamName(game.equipeLocaleId);
    const awayTeam = getTeamName(game.equipeVisiteurId);
    return `${homeTeam} vs ${awayTeam}`;
  };
  
  return (
    <ShotChartContainer>
      <ShotChartHeader>
        <ShotChartTitle>Carte des Tirs</ShotChartTitle>
      </ShotChartHeader>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>Joueur</FilterLabel>
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
          <FilterLabel>Équipe</FilterLabel>
          <FilterSelect value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
            <option value="">Toutes les équipes</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.nom}</option>
            ))}
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Match</FilterLabel>
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
          <FilterLabel>Période</FilterLabel>
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
          <FilterLabel>Type de tir</FilterLabel>
          <FilterSelect value={shotTypeFilter} onChange={(e) => setShotTypeFilter(e.target.value)}>
            <option value="">Tous les types</option>
            <option value="2pts">2 points</option>
            <option value="3pts">3 points</option>
            <option value="lf">Lancer franc</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Résultat</FilterLabel>
          <FilterSelect value={shotResultFilter} onChange={(e) => setShotResultFilter(e.target.value)}>
            <option value="">Tous les résultats</option>
            <option value="made">Réussis</option>
            <option value="missed">Manqués</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>
      
      <CourtContainer>
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
          {filteredShots.map((shot, index) => (
            <g key={index}>
              <circle 
                cx={shot.positionX * 500} 
                cy={shot.positionY * 470} 
                r={8}
                fill={shot.reussi ? '#4CAF50' : '#F44336'}
              />
              {playerFilter && (
                <text 
                  x={shot.positionX * 500} 
                  y={(shot.positionY * 470) - 10} 
                  fontSize="10" 
                  textAnchor="middle" 
                  fill="#333"
                >
                  {shot.typeShot}
                </text>
              )}
            </g>
          ))}
        </svg>
        
        <LegendContainer>
          <LegendItem>
            <LegendMarker color="#4CAF50" />
            <span>Tirs réussis</span>
          </LegendItem>
          <LegendItem>
            <LegendMarker color="#F44336" />
            <span>Tirs manqués</span>
          </LegendItem>
        </LegendContainer>
      </CourtContainer>
      
      <StatsContainer>
        <StatCard>
          <StatValue>{totalShots}</StatValue>
          <StatLabel>Tirs tentés</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{madeShots}</StatValue>
          <StatLabel>Tirs réussis</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalShots - madeShots}</StatValue>
          <StatLabel>Tirs manqués</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{shotPercentage}%</StatValue>
          <StatLabel>Pourcentage</StatLabel>
        </StatCard>
      </StatsContainer>
    </ShotChartContainer>
  );
};

export default ShotChart;
