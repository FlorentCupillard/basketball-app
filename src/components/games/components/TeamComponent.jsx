import React from 'react';
import styled from 'styled-components';

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TeamLogo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-bottom: 0;
    margin-right: 15px;
  }
`;

const TeamName = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  
  @media (max-width: 768px) {
    text-align: left;
    font-size: 16px;
  }
`;

const TeamComponent = ({ team }) => {
  return (
    <TeamContainer>
      <TeamLogo>
        {team?.logo ? (
          <img src={team.logo} alt={`Logo ${team.nom}`} />
        ) : (
          <span>{team?.nom?.charAt(0) || '?'}</span>
        )}
      </TeamLogo>
      <TeamName>{team?.nom || 'Équipe inconnue'}</TeamName>
    </TeamContainer>
  );
};

export default TeamComponent;
