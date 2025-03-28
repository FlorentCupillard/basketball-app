import React from 'react';
import styled from 'styled-components';

const GameHeaderContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

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

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 15px 0;
  }
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 30px;
    width: 100%;
    justify-content: space-around;
  }
`;

const ScoreSeparator = styled.span`
  margin: 0 15px;
  color: #999;
`;

const GameStatus = styled.div`
  font-size: 14px;
  color: ${props => props.isLive ? '#d32f2f' : '#666'};
  font-weight: ${props => props.isLive ? '600' : 'normal'};
`;

const GameHeader = ({ 
  homeTeam, 
  awayTeam, 
  homeScore, 
  awayScore, 
  isLive, 
  currentPeriod, 
  gameTime,
  children 
}) => {
  return (
    <GameHeaderContainer>
      <GameInfo>
        <TeamContainer>
          <TeamLogo>
            {/* Logo de l'équipe locale */}
          </TeamLogo>
          <TeamName>{homeTeam?.nom || 'Équipe locale'}</TeamName>
        </TeamContainer>
        
        <ScoreContainer>
          <ScoreDisplay>
            <span>{homeScore}</span>
            <ScoreSeparator>-</ScoreSeparator>
            <span>{awayScore}</span>
          </ScoreDisplay>
          <GameStatus isLive={isLive}>
            {isLive ? `${currentPeriod}er quart ${gameTime}` : 'Match non démarré'}
          </GameStatus>
        </ScoreContainer>
        
        <TeamContainer>
          <TeamLogo>
            {/* Logo de l'équipe visiteur */}
          </TeamLogo>
          <TeamName>{awayTeam?.nom || 'Équipe visiteur'}</TeamName>
        </TeamContainer>
      </GameInfo>
      
      {children}
    </GameHeaderContainer>
  );
};

export default GameHeader;
