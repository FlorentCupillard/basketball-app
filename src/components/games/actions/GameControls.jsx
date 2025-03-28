import React from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaStopCircle } from 'react-icons/fa';
import { ActionButton } from './ShotActions';

const GameActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const GameControls = ({ 
  isLive, 
  onStartGame, 
  onPauseGame, 
  onEndGame 
}) => {
  return (
    <GameActions>
      {!isLive ? (
        <ActionButton primary onClick={onStartGame}>
          <FaPlay /> Démarrer le match
        </ActionButton>
      ) : (
        <>
          <ActionButton warning onClick={onPauseGame}>
            <FaPause /> Mettre en pause
          </ActionButton>
          <ActionButton danger onClick={onEndGame}>
            <FaStopCircle /> Terminer le match
          </ActionButton>
        </>
      )}
    </GameActions>
  );
};

export default GameControls;
