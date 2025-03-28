import React from 'react';
import styled from 'styled-components';

const ContentSectionContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const ContentSection = ({ title, children }) => {
  return (
    <ContentSectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </ContentSectionContainer>
  );
};

export default ContentSection;
