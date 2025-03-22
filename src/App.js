import React, { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUsers, FaBasketballBall, FaChartBar, FaChartLine } from 'react-icons/fa';
import TeamList from './components/teams/TeamList';
import TeamCreateForm from './components/teams/TeamCreateForm';
import PlayerList from './components/players/PlayerList';
import PlayerCreateForm from './components/players/PlayerCreateForm';
import GameList from './components/games/GameList';
import GameDetail from './components/games/GameDetail';
import GameLive from './components/games/GameLive';
import GameCreateForm from './components/games/GameCreateForm';
import ShotChart from './components/court/ShotChart';

const AppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #333;
  min-height: 100vh;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

const Header = styled.header`
  background-color: #1a73e8;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 70%;
    max-width: 300px;
    height: 100vh;
    background-color: #1a73e8;
    flex-direction: column;
    padding: 80px 20px 20px;
    transition: right 0.3s ease-in-out;
    box-shadow: ${props => props.isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.1)' : 'none'};
    z-index: 900;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 12px 10px;
    width: 100%;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 800;
  }
`;

const MainContent = styled.main`
  padding: 2rem 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  
  @media (min-width: 769px) {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
`;

const Footer = styled.footer`
  background-color: #f0f0f0;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
  border-top: 1px solid #ddd;
  width: 100%;
`;

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
`;

const DashboardCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const DashboardCardTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const DashboardCardContent = styled.div`
  font-size: 14px;
`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <Logo>Basketball Manager</Logo>
          <MenuButton onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </MenuButton>
          <Nav isOpen={menuOpen}>
            <NavLink to="/" onClick={closeMenu}>
              <FaHome /> Accueil
            </NavLink>
            <NavLink to="/teams" onClick={closeMenu}>
              <FaUsers /> Équipes
            </NavLink>
            <NavLink to="/players" onClick={closeMenu}>
              <FaBasketballBall /> Joueurs
            </NavLink>
            <NavLink to="/games" onClick={closeMenu}>
              <FaChartBar /> Matchs
            </NavLink>
            <NavLink to="/stats" onClick={closeMenu}>
              <FaChartLine /> Statistiques
            </NavLink>
            <NavLink to="/shot-chart" onClick={closeMenu}>
              <FaChartLine /> Carte des Tirs
            </NavLink>
          </Nav>
        </HeaderContent>
      </Header>
      
      <Overlay isOpen={menuOpen} onClick={closeMenu} />
      
      <MainContent>
        <Routes>
          <Route path="/" element={
            <>
              <h1>Tableau de bord</h1>
              <Dashboard>
                <DashboardCard>
                  <DashboardCardTitle>Matchs à venir</DashboardCardTitle>
                  <DashboardCardContent>
                    <p>Lakers vs Bulls - 25/03/2025 - 20:00</p>
                    <p>Warriors vs Nets - 26/03/2025 - 19:30</p>
                    <Link to="/games">Voir tous les matchs</Link>
                  </DashboardCardContent>
                </DashboardCard>
                
                <DashboardCard>
                  <DashboardCardTitle>Derniers résultats</DashboardCardTitle>
                  <DashboardCardContent>
                    <p>Celtics 105 - 98 Heat - 20/03/2025</p>
                    <p>Bucks 112 - 89 Raptors - 21/03/2025</p>
                    <Link to="/games">Voir tous les résultats</Link>
                  </DashboardCardContent>
                </DashboardCard>
                
                <DashboardCard>
                  <DashboardCardTitle>Meilleurs joueurs</DashboardCardTitle>
                  <DashboardCardContent>
                    <p>1. LeBron James - 28.5 pts</p>
                    <p>2. Stephen Curry - 26.3 pts</p>
                    <p>3. Kevin Durant - 25.9 pts</p>
                    <Link to="/players">Voir tous les joueurs</Link>
                  </DashboardCardContent>
                </DashboardCard>
              </Dashboard>
              
              <DashboardCard>
                <DashboardCardTitle>Carte des tirs récents</DashboardCardTitle>
                <DashboardCardContent>
                  <p>Accédez à la carte des tirs pour visualiser les performances de tir des joueurs.</p>
                  <Link to="/shot-chart">Voir la carte des tirs</Link>
                </DashboardCardContent>
              </DashboardCard>
            </>
          } />
          <Route path="/teams" element={<TeamList />} />
          <Route path="/teams/create" element={<TeamCreateForm />} />
          <Route path="/players" element={<PlayerList />} />
          <Route path="/players/create" element={<PlayerCreateForm />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<GameCreateForm />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/games/:gameId/live" element={<GameLive />} />
          <Route path="/stats" element={<div>Statistiques (à implémenter)</div>} />
          <Route path="/shot-chart" element={<ShotChart />} />
        </Routes>
      </MainContent>
      
      <Footer>
        <p>© 2025 Basketball Manager - Application développée en React</p>
      </Footer>
    </AppContainer>
  );
}

export default App;
