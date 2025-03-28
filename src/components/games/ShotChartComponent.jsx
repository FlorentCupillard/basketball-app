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
  cursor: ${props => props.isSelecting ? 'crosshair' : 'default'};
`;

const ShotMarker = styled.div`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: ${props => props.isTemp ? '16px' : '12px'};
  height: ${props => props.isTemp ? '16px' : '12px'};
  border-radius: 50%;
  background-color: ${props => props.made === true ? 'green' : 'red'};
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

const ShotLegend = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  justify-content: center;
  font-size: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LegendMarker = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
`;

const ShotChartComponent = ({
  shotEvents,
  isSelectingPosition,
  shotPosition,
  shotResult,
  selectedPlayerId,
  players,
  onCourtClick
}) => {
  const selectedPlayer = players.find(p => p.id === selectedPlayerId);
  
  // Transformer les événements de tir pour l'affichage
  const displayShots = shotEvents.map(event => ({
    positionX: event.details?.positionX || 50,
    positionY: event.details?.positionY || 50,
    reussi: event.details?.reussi || false,
    joueurId: event.joueurId
  }));

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <ShotInstructions isSelecting={isSelectingPosition}>
        {isSelectingPosition
          ? `Cliquez sur le terrain pour indiquer la position du tir de ${selectedPlayer?.prenom} ${selectedPlayer?.nom}`
          : 'Sélectionnez un joueur et un type de tir pour enregistrer une action'}
      </ShotInstructions>

      <ShotLegend>
        <LegendItem>
          <LegendMarker color="green" />
          <span>Tir réussi</span>
        </LegendItem>
        <LegendItem>
          <LegendMarker color="red" />
          <span>Tir manqué</span>
        </LegendItem>
      </ShotLegend>

      <CourtContainer onClick={onCourtClick} isSelecting={isSelectingPosition}>
        <BasketballCourt interactive={isSelectingPosition}>
          {/* Afficher les tirs déjà enregistrés */}
          {displayShots.map((shot, index) => (
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
              made={true}
              isTemp={true}
            />
          )}

          {/* Afficher le curseur de position */}
          {isSelectingPosition && !shotPosition && (
            <TempPositionMarker />
          )}
        </BasketballCourt>
      </CourtContainer>
    </div>
  );
};

export default ShotChartComponent;
