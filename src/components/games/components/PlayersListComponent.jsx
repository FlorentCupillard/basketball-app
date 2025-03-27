import React from 'react';
import styled from 'styled-components';

const PlayersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlayerCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PlayerPhoto = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlayerInfo = styled.div`
  flex: 1;
`;

const PlayerName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const PlayerDetails = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

const PlayersListComponent = ({ players, teamName }) => {
  return (
    <div>
      <h3>{teamName}</h3>
      <PlayersList>
        {players.map((player) => (
          <PlayerCard key={player.id}>
            <PlayerPhoto>
              {player.photo ? (
                <img src={player.photo} alt={`${player.prenom} ${player.nom}`} />
              ) : (
                <span>{player.prenom[0]}{player.nom[0]}</span>
              )}
            </PlayerPhoto>
            <PlayerInfo>
              <PlayerName>{player.prenom} {player.nom}</PlayerName>
              <PlayerDetails>#{player.numero}</PlayerDetails>
            </PlayerInfo>
          </PlayerCard>
        ))}
      </PlayersList>
    </div>
  );
};

export default PlayersListComponent;
