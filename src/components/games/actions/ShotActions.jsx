import React from 'react';
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ActionButton = styled.button`
  background-color: ${props => {
    if (props.primary) return '#1a73e8';
    if (props.danger) return '#d32f2f';
    if (props.success) return '#4caf50';
    if (props.warning) return '#ff9800';
    if (props.info) return '#2196f3';
    if (props.selected) return '#1a73e8';
    return '#f0f0f0';
  }};
  color: ${props => (props.primary || props.danger || props.success || props.warning || props.info || props.selected) ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => {
      if (props.primary) return '#1557b0';
      if (props.danger) return '#b71c1c';
      if (props.success) return '#388e3c';
      if (props.warning) return '#f57c00';
      if (props.info) return '#0d47a1';
      if (props.selected) return '#1557b0';
      return '#e0e0e0';
    }};
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ShotButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
`;

const ShotActions = ({ 
  selectedPlayer, 
  isSelectingPosition, 
  shotPosition, 
  shotType, 
  onShotTypeSelect, 
  onValidateShot, 
  onCancel 
}) => {
  if (!selectedPlayer) {
    return (
      <div style={{ textAlign: 'center', margin: '15px 0', color: '#666' }}>
        Sélectionnez un joueur pour enregistrer une action
      </div>
    );
  }

  if (isSelectingPosition) {
    return (
      <div style={{ textAlign: 'center', margin: '15px 0', color: '#1a73e8', fontWeight: 'bold' }}>
        Cliquez sur le terrain pour indiquer la position du tir
        {shotPosition && (
          <div style={{ marginTop: '10px' }}>
            <ActionButton success onClick={() => onValidateShot(true)}>
              <FaCheck /> Valider le tir réussi
            </ActionButton>
            <ActionButton danger onClick={() => onValidateShot(false)} style={{ marginLeft: '10px' }}>
              <FaTimes /> Valider le tir manqué
            </ActionButton>
            <ActionButton onClick={onCancel} style={{ marginLeft: '10px' }}>
              Annuler
            </ActionButton>
          </div>
        )}
      </div>
    );
  }

  return (
    <ShotButtonsGrid>
      <ActionButton 
        selected={shotType === '2pts'}
        onClick={() => onShotTypeSelect('2pts')}
      >
        Tir à 2pts
      </ActionButton>
      <ActionButton 
        selected={shotType === '3pts'}
        onClick={() => onShotTypeSelect('3pts')}
      >
        Tir à 3pts
      </ActionButton>
      <ActionButton 
        selected={shotType === 'lf'}
        onClick={() => onShotTypeSelect('lf')}
      >
        Lancer franc
      </ActionButton>
    </ShotButtonsGrid>
  );
};

export default ShotActions;
export { ActionButton };
