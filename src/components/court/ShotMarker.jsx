import React from 'react';
import styled from 'styled-components';
import { FaBasketballBall, FaCheck, FaTimes } from 'react-icons/fa';

const ShotMarkerContainer = styled.div`
  position: absolute;
  width: ${props => props.size || '14px'};
  height: ${props => props.size || '14px'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  background-color: ${props => props.made ? 'rgba(76, 175, 80, 0.8)' : 'rgba(244, 67, 54, 0.8)'};
  border: 2px solid #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${props => props.iconSize || '8px'};
  z-index: ${props => props.highlighted ? '20' : '5'};

  &:hover {
    transform: translate(-50%, -50%) scale(1.3);
    z-index: 30;
    background-color: ${props => props.made ? 'rgba(76, 175, 80, 1)' : 'rgba(244, 67, 54, 1)'};
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
  }
`;

const ShotValue = styled.div`
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  opacity: ${props => props.visible ? '1' : '0'};
  transition: opacity 0.2s ease;
  pointer-events: none;
`;

const ShotMarker = ({ x, y, made, playerId, shotType, playerName, onClick, highlighted, size, iconSize }) => {
  // Déterminer la valeur du tir
  const shotValue = shotType === '3pts' ? '3pts' : shotType === '2pts' ? '2pts' : 'LF';
  
  return (
    <ShotMarkerContainer 
      style={{ 
        left: `${x}%`, 
        top: `${y}%` 
      }}
      made={made}
      highlighted={highlighted}
      size={size}
      iconSize={iconSize}
      onClick={() => onClick && onClick({ x, y, made, playerId, shotType })}
      title={`${made ? 'Tir réussi' : 'Tir manqué'} - ${playerName || 'Joueur: ' + playerId} - ${shotValue}`}
    >
      {made ? <FaCheck /> : <FaTimes />}
      <ShotValue visible={highlighted}>
        {playerName || `Joueur ${playerId}`} - {shotValue}
      </ShotValue>
    </ShotMarkerContainer>
  );
};

export default ShotMarker;
