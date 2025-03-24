import React from 'react';
import styled from 'styled-components';
import terrainSvg from '../../terrain.svg';


const CourtContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  aspect-ratio: 94 / 50;
  background-color: #f8f4e3;
  border: 2px solid #333;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    max-width: 100%;
    border-radius: 4px;
  }
`;

const CourtSVG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-image: url(${terrainSvg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;



const CourtLines = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const ShotOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const CourtZones = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.1;
  pointer-events: none;
`;

const CourtLegend = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 2px 5px;
  font-size: 10px;
  color: #333;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;
  
  @media (max-width: 768px) {
    font-size: 8px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const LegendColor = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
  
  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;

const BasketballCourt = ({ children, onClick, interactive = false }) => {
  return (
    <CourtContainer onClick={onClick} style={{ cursor: interactive ? 'crosshair' : 'default' }}>
      <CourtSVG />
      <ShotOverlay>
        {children}
      </ShotOverlay>

      {interactive && (
        <CourtLegend>
          <LegendItem>
            <LegendColor color="#4CAF50" />
            <span>Réussi</span>
          </LegendItem>
          <LegendItem>
            <LegendColor color="#F44336" />
            <span>Manqué</span>
          </LegendItem>
        </CourtLegend>
      )}
    </CourtContainer>
  );
};

export default BasketballCourt;
