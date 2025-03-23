import React from 'react';
import styled from 'styled-components';

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
      <CourtZones>
        {/* Zone à 3 points gauche */}
        <svg width="100%" height="100%" viewBox="0 0 94 50" preserveAspectRatio="xMidYMid meet">
          <path d="M 0,0 L 19,0 L 19,11 L 0,11 Z" fill="#ff9800" />
          <path d="M 0,39 L 19,39 L 19,50 L 0,50 Z" fill="#ff9800" />
          <path d="M 0,11 L 19,11 L 19,39 L 0,39 Z" fill="#2196f3" />
          <path d="M 19,0 L 47,0 L 47,50 L 19,50 Q 19,25 19,25 Z" fill="#4caf50" />
          
          {/* Zone à 3 points droite */}
          <path d="M 94,0 L 75,0 L 75,11 L 94,11 Z" fill="#ff9800" />
          <path d="M 94,39 L 75,39 L 75,50 L 94,50 Z" fill="#ff9800" />
          <path d="M 94,11 L 75,11 L 75,39 L 94,39 Z" fill="#2196f3" />
          <path d="M 75,0 L 47,0 L 47,50 L 75,50 Q 75,25 75,25 Z" fill="#4caf50" />
        </svg>
      </CourtZones>
      
      <CourtLines viewBox="0 0 94 50" preserveAspectRatio="xMidYMid meet">
        {/* Court outline */}
        <rect x="0" y="0" width="94" height="50" fill="none" stroke="#333" strokeWidth="0.5" />
        
        {/* Center circle */}
        <circle cx="47" cy="25" r="6" fill="none" stroke="#333" strokeWidth="0.5" />
        
        {/* Center line */}
        <line x1="47" y1="0" x2="47" y2="50" stroke="#333" strokeWidth="0.5" />
        
        {/* Three-point lines */}
        <line x1="3" y1="3" x2="3" y2="47" stroke="#333" strokeWidth="0.5" />
        <line x1="91" y1="3" x2="91" y2="47" stroke="#333" strokeWidth="0.5" />
        <path d="M 3,3 Q 19,3 19,25 Q 19,47 3,47" fill="none" stroke="#333" strokeWidth="0.5" />
        <path d="M 91,3 Q 75,3 75,25 Q 75,47 91,47" fill="none" stroke="#333" strokeWidth="0.5" />
        
        {/* Key (paint) areas */}
        <rect x="0" y="11" width="19" height="28" fill="none" stroke="#333" strokeWidth="0.5" />
        <rect x="75" y="11" width="19" height="28" fill="none" stroke="#333" strokeWidth="0.5" />
        
        {/* Free throw circles */}
        <circle cx="19" cy="25" r="6" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="1,1" />
        <circle cx="75" cy="25" r="6" fill="none" stroke="#333" strokeWidth="0.5" strokeDasharray="1,1" />
        
        {/* Backboards */}
        <line x1="4" y1="25" x2="1" y2="25" stroke="#333" strokeWidth="1" />
        <line x1="90" y1="25" x2="93" y2="25" stroke="#333" strokeWidth="1" />
        
        {/* Hoops */}
        <circle cx="1.5" cy="25" r="1" fill="none" stroke="#333" strokeWidth="0.5" />
        <circle cx="92.5" cy="25" r="1" fill="none" stroke="#333" strokeWidth="0.5" />
        
        {/* Restricted areas */}
        <path d="M 1.5,25 m -4,0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0" fill="none" stroke="#333" strokeWidth="0.3" strokeDasharray="0.5,0.5" />
        <path d="M 92.5,25 m -4,0 a 4,4 0 1,0 8,0 a 4,4 0 1,0 -8,0" fill="none" stroke="#333" strokeWidth="0.3" strokeDasharray="0.5,0.5" />
      </CourtLines>
      
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
