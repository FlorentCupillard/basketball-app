import React from 'react';
import styled from 'styled-components';
import { FaChartBar, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const ContentSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GameSection = ({ title, icon, children }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'stats':
        return <FaChartBar />;
      case 'players':
        return <FaUsers />;
      case 'calendar':
        return <FaCalendarAlt />;
      default:
        return null;
    }
  };

  return (
    <ContentSection>
      <SectionTitle>
        {renderIcon()}
        {title}
      </SectionTitle>
      {children}
    </ContentSection>
  );
};

export default GameSection;
