import React from 'react';
import styled from 'styled-components';
import { FaBasketballBall, FaHandPaper, FaPlus } from 'react-icons/fa';

const PlayersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
`;

const PlayerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
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
`;

const PlayerName = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const PlayerNumber = styled.div`
  font-size: 12px;
  color: #666;
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

const TeamRoster = ({ 
  title, 
  titleColor, 
  players, 
  selectedPlayerId, 
  onPlayerSelect, 
  onAddRebound, 
  onAddAssist 
}) => {
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
        {players.length > 0 ? (
          players.map(player => (
            <PlayerItem 
              key={player.id} 
              selected={selectedPlayerId === player.id}
              onClick={() => onPlayerSelect(player.id)}
            >
              <PlayerInfo>
                <PlayerName>{player.prenom} {player.nom}</PlayerName>
                <PlayerNumber>#{player.numero}</PlayerNumber>
              </PlayerInfo>
              <PlayerActions>
                <ActionButton 
                  color="#e8f5e9" 
                  hoverColor="#c8e6c9" 
                  textColor="#2e7d32"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddRebound(player.id);
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
                    onAddAssist(player.id);
                  }}
                >
                  <FaPlus size={12} /> Passe
                </ActionButton>
              </PlayerActions>
            </PlayerItem>
          ))
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
