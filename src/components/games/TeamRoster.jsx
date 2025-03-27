import React from 'react';
import styled from 'styled-components';
import { FaBasketballBall, FaHandPaper, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  background-color: ${props => props.selected ? '#e8f0fe' : '#f8f8f8'};
  border: ${props => props.selected ? '2px solid #1a73e8' : '1px solid #eee'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.selected ? '#e8f0fe' : '#f0f0f0'};
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PlayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const PlayerName = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const PlayerNumber = styled.div`
  font-size: 12px;
  color: #666;
  margin-left: 8px;
`;

const PlayerActions = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  background-color: ${props => props.color || '#f0f0f0'};
  color: ${props => props.textColor || '#333'};
  border: none;
  border-radius: 4px;
  padding: 5px 8px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.hoverColor || '#e0e0e0'};
  }
`;

const PlayerStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 5px;
  background-color: #f5f5f5;
  padding: 6px;
  border-radius: 4px;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const StatLabel = styled.div`
  font-size: 10px;
  color: #666;
`;

const DetailedStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin-top: 5px;
  font-size: 11px;
  color: #666;
`;

const DetailedStatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  padding: 4px;
  border-radius: 3px;
`;

const TeamRoster = ({ 
  title, 
  titleColor, 
  teamId,
  selectedPlayerId, 
  onPlayerSelect, 
  onAddRebound, 
  onAddAssist,
  gameStats,
  isLive,
  onUpdatePlayerStats
}) => {
  // Utiliser useSelector pour obtenir les joueurs directement
  const allPlayers = useSelector(state => state.players.players);
  
  // Filtrer les joueurs par équipe si teamId est fourni
  const teamPlayers = teamId ? allPlayers.filter(player => player.equipeId === teamId) : [];
  
  // Fonction pour obtenir les statistiques d'un joueur
  const getPlayerStats = (playerId) => {
    if (!gameStats) return null;
    return gameStats.find(stats => stats.joueurId === playerId);
  };
  
  // Calculer le pourcentage de tirs
  const calculatePercentage = (made, attempted) => {
    if (!attempted || attempted === 0) return 0;
    return Math.round((made / attempted) * 100);
  };
  
  return (
    <div>
      <h3 style={{ 
        fontSize: '16px', 
        margin: '0 0 10px 0', 
        paddingBottom: '10px', 
        borderBottom: '1px solid #eee',
        color: titleColor || '#333' 
      }}>
        {title}
      </h3>
      <PlayersList>
        {teamPlayers && teamPlayers.length > 0 ? (
          teamPlayers.map(player => {
            const stats = getPlayerStats ? getPlayerStats(player.id) : null;
            const points = stats?.points || 0;
            const rebounds = stats?.rebonds || 0;
            const assists = stats?.passesDecisives || 0;
            
            // Statistiques détaillées
            const twoPointsMade = stats?.tirs2ptsReussis || 0;
            const twoPointsAttempted = stats?.tirs2ptsTentes || 0;
            const threePointsMade = stats?.tirs3ptsReussis || 0;
            const threePointsAttempted = stats?.tirs3ptsTentes || 0;
            const freeThrowsMade = stats?.lfReussis || 0;
            const freeThrowsAttempted = stats?.lfTentes || 0;
            
            // Pourcentages
            const twoPointsPercentage = calculatePercentage(twoPointsMade, twoPointsAttempted);
            const threePointsPercentage = calculatePercentage(threePointsMade, threePointsAttempted);
            const freeThrowsPercentage = calculatePercentage(freeThrowsMade, freeThrowsAttempted);
            
            return (
              <PlayerItem 
                key={player.id} 
                selected={selectedPlayerId === player.id}
                onClick={() => onPlayerSelect && onPlayerSelect(player.id)}
              >
                <PlayerInfo>
                  <PlayerHeader>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <PlayerName>{player.prenom} {player.nom}</PlayerName>
                      <PlayerNumber>#{player.numero}</PlayerNumber>
                    </div>
                    
                    {isLive && (
                      <PlayerActions>
                        <ActionButton 
                          color="#e8f5e9" 
                          hoverColor="#c8e6c9" 
                          textColor="#2e7d32"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAddRebound) onAddRebound(player.id);
                            if (onUpdatePlayerStats) {
                              onUpdatePlayerStats(player.id, teamId, {
                                rebonds: (stats?.rebonds || 0) + 1
                              });
                            }
                          }}
                        >
                          <FaHandPaper size={12} /> Rebond
                        </ActionButton>
                        <ActionButton 
                          color="#e3f2fd" 
                          hoverColor="#bbdefb" 
                          textColor="#1565c0"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAddAssist) onAddAssist(player.id);
                            if (onUpdatePlayerStats) {
                              onUpdatePlayerStats(player.id, teamId, {
                                passesDecisives: (stats?.passesDecisives || 0) + 1
                              });
                            }
                          }}
                        >
                          <FaPlus size={12} /> Passe
                        </ActionButton>
                      </PlayerActions>
                    )}
                  </PlayerHeader>
                  
                  {stats && (
                    <>
                      <PlayerStats>
                        <StatItem>
                          <StatValue>{points}</StatValue>
                          <StatLabel>PTS</StatLabel>
                        </StatItem>
                        <StatItem>
                          <StatValue>{rebounds}</StatValue>
                          <StatLabel>REB</StatLabel>
                        </StatItem>
                        <StatItem>
                          <StatValue>{assists}</StatValue>
                          <StatLabel>AST</StatLabel>
                        </StatItem>
                      </PlayerStats>
                      
                      <DetailedStats>
                        <DetailedStatItem>
                          <div>{twoPointsMade}/{twoPointsAttempted}</div>
                          <div>{twoPointsPercentage}% 2P</div>
                        </DetailedStatItem>
                        <DetailedStatItem>
                          <div>{threePointsMade}/{threePointsAttempted}</div>
                          <div>{threePointsPercentage}% 3P</div>
                        </DetailedStatItem>
                        <DetailedStatItem>
                          <div>{freeThrowsMade}/{freeThrowsAttempted}</div>
                          <div>{freeThrowsPercentage}% LF</div>
                        </DetailedStatItem>
                      </DetailedStats>
                    </>
                  )}
                </PlayerInfo>
              </PlayerItem>
            );
          })
        ) : (
          <div style={{ padding: '20px 0', textAlign: 'center', color: '#666' }}>
            Aucun joueur disponible
          </div>
        )}
      </PlayersList>
    </div>
  );
};

export default TeamRoster;
