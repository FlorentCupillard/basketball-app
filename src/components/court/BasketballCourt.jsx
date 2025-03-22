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
  overflow: hidden;
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

const BasketballCourt = ({ children }) => {
  return (
    <CourtContainer>
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
      </CourtLines>
      
      <ShotOverlay>
        {children}
      </ShotOverlay>
    </CourtContainer>
  );
};

export default BasketballCourt;
