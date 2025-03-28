import React from 'react';
import styled from 'styled-components';

const PlayerStatsContainer = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

const StatItem = styled.span`
  margin-right: 15px;
`;

const PlayerStats = ({ player }) => {
  if (!player || !player.statistiquesMatch) {
    return null;
  }

  const stats = player.statistiquesMatch;
  
  return (
    <PlayerStatsContainer>
      <StatItem>Points: {stats.points || 0}</StatItem>
      <StatItem>2pts: {stats.tirs2ptsReussis || 0}/{stats.tirs2ptsTentes || 0}</StatItem>
      <StatItem>3pts: {stats.tirs3ptsReussis || 0}/{stats.tirs3ptsTentes || 0}</StatItem>
      <StatItem>LF: {stats.lfReussis || 0}/{stats.lfTentes || 0}</StatItem>
      <StatItem>Rebonds: {stats.rebonds || 0}</StatItem>
      <StatItem>Passes: {stats.passes || 0}</StatItem>
    </PlayerStatsContainer>
  );
};

export default PlayerStats;
