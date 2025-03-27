import React from 'react';
import styled from 'styled-components';

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

const GameDate = styled.div`
  font-size: 14px;
  color: #666;
`;

const ScoreComponent = ({ homeScore, awayScore, date, formatDate }) => {
  return (
    <ScoreContainer>
      <ScoreDisplay>
        <span>{homeScore}</span>
        <ScoreSeparator>-</ScoreSeparator>
        <span>{awayScore}</span>
      </ScoreDisplay>
      <GameDate>{formatDate ? formatDate(date) : new Date(date).toLocaleDateString()}</GameDate>
    </ScoreContainer>
  );
};

export default ScoreComponent;
