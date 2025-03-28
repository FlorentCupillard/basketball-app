import React from 'react';
import styled from 'styled-components';

const RecentActionsContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
`;

const RecentActionsTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ActionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const ActionItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ShotActionItem = styled(ActionItem)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShotIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.success ? '#4caf50' : '#f44336'};
  flex-shrink: 0;
`;

const RecentActions = ({ events, formatEvent }) => {
  // Trier les événements par date (du plus récent au plus ancien)
  const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  return (
    <RecentActionsContainer>
      <RecentActionsTitle>Toutes les actions</RecentActionsTitle>
      <ActionsList>
        {sortedEvents.slice(0, 20).map((event, index) => {
          // Vérifier si c'est un événement de tir
          if (event.type === 'tir') {
            return (
              <ShotActionItem key={index}>
                <ShotIndicator success={event.details?.reussi} />
                {formatEvent(event)}
              </ShotActionItem>
            );
          }
          
          return (
            <ActionItem key={index}>
              {formatEvent(event)}
            </ActionItem>
          );
        })}
        
        {events.length === 0 && (
          <div style={{ padding: '20px 0', textAlign: 'center', color: '#666' }}>
            Aucune action enregistrée
          </div>
        )}
      </ActionsList>
    </RecentActionsContainer>
  );
};

export default RecentActions;
