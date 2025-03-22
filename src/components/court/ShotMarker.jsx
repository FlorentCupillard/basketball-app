import React from 'react';
import styled from 'styled-components';

const ShotMarkerContainer = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  background-color: ${props => props.made ? '#4CAF50' : '#F44336'};
  border: 1px solid #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
    z-index: 10;
  }
`;

const ShotMarker = ({ x, y, made, playerId, onClick }) => {
  return (
    <ShotMarkerContainer 
      style={{ 
        left: `${x}%`, 
        top: `${y}%` 
      }}
      made={made}
      onClick={() => onClick && onClick({ x, y, made, playerId })}
      title={`${made ? 'Tir réussi' : 'Tir manqué'} - Joueur: ${playerId}`}
    />
  );
};

export default ShotMarker;
