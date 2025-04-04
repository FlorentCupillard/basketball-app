import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUsers, FaBasketballBall, FaChartBar, FaChartLine, FaPlus, FaArrowUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { store, initializeStore } from './store';
import TeamList from './components/teams/TeamList';
import TeamCreateForm from './components/teams/TeamCreateForm';
import TeamEditForm from './components/teams/TeamEditForm';
import TeamDetail from './components/teams/TeamDetail';
import PlayerList from './components/players/PlayerList';
import PlayerCreateForm from './components/players/PlayerCreateForm';
import PlayerEditForm from './components/players/PlayerEditForm';
import PlayerDetail from './components/players/PlayerDetail';
import GameList from './components/games/GameList';
import GameDetail from './components/games/GameDetail';
import GameLive from './components/games/GameLive';
import GameCreateForm from './components/games/GameCreateForm';
import GameEditForm from './components/games/GameEditForm';
import ShotChart from './components/court/ShotChart';

// Style global pour l'application
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #f9f9f9;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    width: 100%;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  
  a {
    color: #1a73e8;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: #1557b0;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5em;
    font-weight: 600;
    line-height: 1.3;
  }
  
  h1 {
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Header = styled.header`
  background-color: #1a73e8;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  
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
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background-color: #1a73e8;
    flex-direction: column;
    padding: 80px 20px 20px;
    transition: right 0.3s ease-in-out;
    box-shadow: ${props => props.isOpen ? '-5px 0 15px rgba(0, 0, 0, 0.2)' : 'none'};
    z-index: 900;
    overflow-y: auto;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 12px 15px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 5px;
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
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
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
    backdrop-filter: blur(2px);
    transition: all 0.3s ease;
  }
`;

const MainContent = styled.main`
  padding: 2rem 1rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  flex: 1;
  
  @media (min-width: 769px) {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const PageTitle = styled.h1`
  margin-bottom: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Footer = styled.footer`
  background-color: #f0f0f0;
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid #ddd;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.9rem;
  }
`;

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const DashboardCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const DashboardCardTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const DashboardCardContent = styled.div`
  font-size: 14px;
  
  p {
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
  
  a {
    display: inline-block;
    margin-top: 10px;
    font-weight: 500;
    color: #1a73e8;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #1a73e8;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    background-color: #1557b0;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 20px;
    bottom: 15px;
    right: 15px;
  }
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: ${props => props.showFab ? '90px' : '20px'};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  display: ${props => props.visible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    background-color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
    bottom: 15px;
    right: ${props => props.showFab ? '75px' : '15px'};
  }
`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Initialiser les données au démarrage de l'application
  useEffect(() => {
    // Charger les données depuis l'API
    initializeStore(store);
    console.log("Données initialisées depuis l'API");
  }, []);
  
  // Ouvrir le menu mobile
  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  // Fermer le menu mobile
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Gérer le défilement de la page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Fermer le menu lorsque la route change
  useEffect(() => {
    closeMenu();
  }, [location]);
  
  // Déterminer si un lien de navigation est actif
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };
  
  return (
    <AppContainer>
      <GlobalStyle />
      <Header>
        <HeaderContent>
          <Logo>
            <FaBasketballBall /> Basketball Stats
          </Logo>
          <MenuButton onClick={menuOpen ? closeMenu : openMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </MenuButton>
          <Nav isOpen={menuOpen}>
            <NavLink to="/" active={isActive('/') ? 1 : 0}>
              <FaHome /> Accueil
            </NavLink>
            <NavLink to="/teams" active={isActive('/teams') ? 1 : 0}>
              <FaUsers /> Équipes
            </NavLink>
            <NavLink to="/players" active={isActive('/players') ? 1 : 0}>
              <FaBasketballBall /> Joueurs
            </NavLink>
            <NavLink to="/games" active={isActive('/games') ? 1 : 0}>
              <FaChartBar /> Matchs
            </NavLink>
          </Nav>
        </HeaderContent>
      </Header>
      <Overlay isOpen={menuOpen} onClick={closeMenu} />
      
      <MainContent>
        <Routes>
          <Route path="/" element={
            <>
              <PageTitle><FaHome /> Tableau de bord</PageTitle>
              <Dashboard>
                <DashboardCard>
                  <DashboardCardTitle><FaUsers /> Équipes</DashboardCardTitle>
                  <DashboardCardContent>
                    <p>Gérez les équipes de basketball.</p>
                    <p>Ajoutez, modifiez ou supprimez des équipes.</p>
                    <Link to="/teams">Voir toutes les équipes</Link>
                  </DashboardCardContent>
                </DashboardCard>
                
                <DashboardCard>
                  <DashboardCardTitle><FaBasketballBall /> Joueurs</DashboardCardTitle>
                  <DashboardCardContent>
                    <p>Gérez les joueurs de basketball.</p>
                    <p>Ajoutez, modifiez ou supprimez des joueurs.</p>
                    <Link to="/players">Voir tous les joueurs</Link>
                  </DashboardCardContent>
                </DashboardCard>
                
                <DashboardCard>
                  <DashboardCardTitle><FaChartBar /> Matchs</DashboardCardTitle>
                  <DashboardCardContent>
                    <p>Gérez les matchs de basketball.</p>
                    <p>Créez des matchs et enregistrez les statistiques.</p>
                    <Link to="/games">Voir tous les matchs</Link>
                  </DashboardCardContent>
                </DashboardCard>
              </Dashboard>
            </>
          } />
          
          {/* Routes pour les équipes */}
          <Route path="/teams" element={<TeamList />} />
          <Route path="/teams/create" element={<TeamCreateForm />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/teams/:id/edit" element={<TeamEditForm />} />
          
          {/* Routes pour les joueurs */}
          <Route path="/players" element={<PlayerList />} />
          <Route path="/players/create" element={<PlayerCreateForm />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/players/:id/edit" element={<PlayerEditForm />} />
          
          {/* Routes pour les matchs */}
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<GameCreateForm />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/games/:gameId/edit" element={<GameEditForm />} />
          <Route path="/games/:gameId/live" element={<GameLive />} />
          
          {/* Route pour le shot chart */}
          <Route path="/shotchart" element={<ShotChart />} />
        </Routes>
      </MainContent>
      
      <Footer>
        &copy; {new Date().getFullYear()} Basketball Stats App
      </Footer>
      
      <ScrollToTopButton 
        visible={showScrollTop} 
        onClick={scrollToTop}
        showFab={location.pathname === '/games'}
      >
        <FaArrowUp />
      </ScrollToTopButton>
      
      {location.pathname === '/games' && (
        <FloatingActionButton as={Link} to="/games/create">
          <FaPlus />
        </FloatingActionButton>
      )}
    </AppContainer>
  );
}

export default App;
