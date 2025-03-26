import React from 'react';
import styled from 'styled-components';
import { FaClock, FaStopwatch, FaFlag } from 'react-icons/fa';

const GameControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-bottom: 20px;
`;

const ControlsTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FinishButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #b71c1c;
  }
`;

const ControlGroup = styled.div`
  flex: 1;
`;

const ControlLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  
  &:focus {
    border-color: #1a73e8;
    outline: none;
  }
`;

const TimeInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    border-color: #1a73e8;
    outline: none;
  }
`;

const GameControls = ({ 
  currentPeriod, 
  timeRemaining, 
  onPeriodChange, 
  onTimeChange,
  onFinishGame,
  gameId
}) => {
  // Convertir les secondes en format mm:ss pour l'input
  const formatTimeForInput = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Convertir le format mm:ss en secondes
  const parseTimeInput = (timeString) => {
    const [mins, secs] = timeString.split(':').map(Number);
    return mins * 60 + secs;
  };

  const handleTimeChange = (e) => {
    const timeString = e.target.value;
    if (/^\d+:\d{0,2}$/.test(timeString)) {
      const seconds = parseTimeInput(timeString);
      onTimeChange(seconds);
    }
  };

  const handleFinishGame = () => {
    if (window.confirm('Êtes-vous sûr de vouloir terminer ce match ? Cette action enregistrera le score final.')) {
      onFinishGame();
    }
  };

  return (
    <GameControlsContainer>
      <ControlsTitle>
        <FaStopwatch /> Contrôles du match
      </ControlsTitle>
      <ControlsRow>
        <ControlGroup>
          <ControlLabel>
            <FaClock /> Quart-temps
          </ControlLabel>
          <Select 
            value={currentPeriod} 
            onChange={(e) => onPeriodChange(Number(e.target.value))}
          >
            <option value={1}>1er Quart-temps</option>
            <option value={2}>2ème Quart-temps</option>
            <option value={3}>3ème Quart-temps</option>
            <option value={4}>4ème Quart-temps</option>
            <option value={5}>Prolongation 1</option>
            <option value={6}>Prolongation 2</option>
            <option value={7}>Prolongation 3</option>
          </Select>
        </ControlGroup>
        <ControlGroup>
          <ControlLabel>
            <FaClock /> Temps restant
          </ControlLabel>
          <TimeInput 
            type="text" 
            value={formatTimeForInput(timeRemaining)} 
            onChange={handleTimeChange}
            placeholder="mm:ss"
          />
        </ControlGroup>
      </ControlsRow>
      <FinishButton onClick={handleFinishGame}>
        <FaFlag /> Terminer le match
      </FinishButton>
    </GameControlsContainer>
  );
};

export default GameControls;
