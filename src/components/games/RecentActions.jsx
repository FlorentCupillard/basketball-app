import React from 'react';
import styled from 'styled-components';

const RecentActionsContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
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

const RecentActions = ({ events, formatEvent }) => {
  return (
    <RecentActionsContainer>
      <RecentActionsTitle>Dernières actions</RecentActionsTitle>
      <ActionsList>
        {events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10).map((event, index) => (
          <ActionItem key={index}>
            {formatEvent(event)}
          </ActionItem>
        ))}
        
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
