import React from 'react';
import styled from 'styled-components';
import BasketballCourt from '../court/BasketballCourt';
import { FaBasketballBall } from 'react-icons/fa';

const CourtContainer = styled.div`
  flex: 2;
  position: relative;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ShotMarker = styled.div`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: ${props => props.isTemp ? '16px' : '12px'};
  height: ${props => props.isTemp ? '16px' : '12px'};
  border-radius: 50%;
  background-color: ${props => props.made ? 'green' : 'red'};
  transform: translate(-50%, -50%);
  border: ${props => props.isTemp ? '2px solid white' : '1px solid white'};
  box-shadow: 0 0 ${props => props.isTemp ? '4px' : '2px'} rgba(0, 0, 0, 0.5);
  z-index: ${props => props.isTemp ? '10' : '5'};
  transition: all 0.2s ease;
`;

const TempPositionMarker = styled.div`
  position: absolute;
  left: ${props => props.x || '50%'};
  top: ${props => props.y || '50%'};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3px dashed #1a73e8;
  background-color: rgba(26, 115, 232, 0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
  animation: pulse 1.5s infinite, follow 0.1s linear;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.4);
      transform: translate(-50%, -50%) scale(1);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(26, 115, 232, 0);
      transform: translate(-50%, -50%) scale(1.1);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(26, 115, 232, 0);
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes follow {
    from { opacity: 0.7; }
    to { opacity: 1; }
  }
`;

const ShotInstructions = styled.div`
  margin-bottom: 15px;
  font-style: italic;
  color: ${props => props.isSelecting ? '#1a73e8' : '#666'};
  background-color: ${props => props.isSelecting ? '#e8f0fe' : 'transparent'};
  padding: ${props => props.isSelecting ? '12px' : '0'};
  border-radius: 8px;
  border: ${props => props.isSelecting ? '2px dashed #1a73e8' : 'none'};
  text-align: center;
  font-weight: ${props => props.isSelecting ? 'bold' : 'normal'};
  animation: ${props => props.isSelecting ? 'pulse 1.5s infinite' : 'none'};
  box-shadow: ${props => props.isSelecting ? '0 2px 8px rgba(26, 115, 232, 0.2)' : 'none'};
  transition: all 0.3s ease;
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(26, 115, 232, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(26, 115, 232, 0);
    }
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#1a73e8' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : '#e0e0e0'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ShotChart = ({
  shotEvents,
  isSelectingPosition,
  shotPosition,
  shotResult,
  selectedPlayerId,
  players,
  onCourtClick,
  onShotResultChange,
  onSelectPositionClick
}) => {
  const selectedPlayer = players.find(p => p.id === selectedPlayerId);
  
  return (
    <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <RadioGroup>
          <RadioLabel>
            <input 
              type="radio" 
              name="shotResult" 
              value="made" 
              checked={shotResult === 'made'} 
              onChange={onShotResultChange}
            />
            Réussi
          </RadioLabel>
          <RadioLabel>
            <input 
              type="radio" 
              name="shotResult" 
              value="missed" 
              checked={shotResult === 'missed'} 
              onChange={onShotResultChange}
            />
            Manqué
          </RadioLabel>
        </RadioGroup>
        
        <Button 
          primary 
          disabled={!selectedPlayerId || isSelectingPosition}
          onClick={onSelectPositionClick}
        >
          <FaBasketballBall style={{ marginRight: '5px' }} />
          Sélectionner position
        </Button>
      </div>
      
      <ShotInstructions isSelecting={isSelectingPosition}>
        {isSelectingPosition 
          ? `Cliquez sur le terrain pour indiquer la position du tir de ${selectedPlayer?.prenom} ${selectedPlayer?.nom}`
          : 'Sélectionnez un joueur et cliquez sur "Sélectionner position" pour enregistrer un tir'}
      </ShotInstructions>
      
      <CourtContainer onClick={onCourtClick}>
        <BasketballCourt>
          {/* Afficher les tirs déjà enregistrés */}
          {shotEvents.map((shot, index) => (
            <ShotMarker
              key={index}
              x={shot.positionX}
              y={shot.positionY}
              made={shot.reussi}
            />
          ))}
          
          {/* Afficher le marqueur temporaire lors de la sélection de position */}
          {isSelectingPosition && shotPosition && (
            <ShotMarker
              x={shotPosition.x}
              y={shotPosition.y}
              made={shotResult === 'made'}
              isTemp={true}
            />
          )}
          
          {/* Afficher le curseur de position */}
          {isSelectingPosition && (
            <TempPositionMarker />
          )}
        </BasketballCourt>
      </CourtContainer>
    </div>
  );
};

export default ShotChart;
