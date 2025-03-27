import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaEdit, FaChartBar } from 'react-icons/fa';

// Import des composants extraits
import TabsComponent from './components/TabsComponent';
import StatsComponent from './components/StatsComponent';
import PlayersListComponent from './components/PlayersListComponent';
import TeamComponent from './components/TeamComponent';
import ScoreComponent from './components/ScoreComponent';
import GameSection from './components/GameSection';

const GameDetailContainer = styled.div`
  width: 100%;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #1a73e8;
  text-decoration: none;
  margin-bottom: 20px;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const GameHeader = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const GameStatus = styled.div`
  display: inline-block;
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  background-color: ${props => {
    switch(props.status) {
      case 'upcoming':
        return '#e3f2fd';
      case 'live':
        return '#ffebee';
      case 'completed':
        return '#e8f5e9';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'upcoming':
        return '#1565c0';
      case 'live':
        return '#c62828';
      case 'completed':
        return '#2e7d32';
      default:
        return '#616161';
    }
  }};
`;

const GameInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

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

const ActionButton = styled(Link)`
  background-color: ${props => props.primary ? '#1a73e8' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    background-color: ${props => props.primary ? '#1557b0' : '#e0e0e0'};
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GameDetail = () => {
  const { gameId } = useParams();
  const games = useSelector(state => state.games.games);
  const teams = useSelector(state => state.teams.teams);
  const players = useSelector(state => state.players.players);
  const events = useSelector(state => state.events.events);
  
  const [activeTab, setActiveTab] = useState('summary');
  const [game, setGame] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [gameEvents, setGameEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    // Trouver le match correspondant à l'ID
    const foundGame = games.find(g => g.id === gameId);
    if (foundGame) {
      setGame(foundGame);
      
      // Trouver les équipes
      const home = teams.find(t => t.id === foundGame.equipeLocale.id);
      const away = teams.find(t => t.id === foundGame.equipeVisiteur.id);
      setHomeTeam(home);
      setAwayTeam(away);
      
      // Filtrer les événements du match
      const matchEvents = events.filter(e => e.matchId === gameId);
      setGameEvents(matchEvents);
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [gameId, games, teams, events]);
  
  if (isLoading) {
    return (
      <GameDetailContainer>
        <BackButton to="/games">
          <FaArrowLeft /> Retour aux matchs
        </BackButton>
        <div>Chargement des détails du match...</div>
      </GameDetailContainer>
    );
  }
  
  if (!game) {
    return (
      <GameDetailContainer>
        <BackButton to="/games">
          <FaArrowLeft /> Retour aux matchs
        </BackButton>
        <div>Match non trouvé.</div>
      </GameDetailContainer>
    );
  }
  
  // Formater la date du match
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  // Formater l'heure du match
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculer les statistiques du match
  const calculateGameStats = () => {
    // Exemple de statistiques
    return {
      totalPoints: game.equipeLocale.score + game.equipeVisiteur.score,
      totalRebounds: gameEvents.reduce((total, event) => {
        if (event.type === 'rebond') return total + 1;
        return total;
      }, 0),
      totalAssists: gameEvents.reduce((total, event) => {
        if (event.type === 'passe') return total + 1;
        return total;
      }, 0),
      totalSteals: gameEvents.reduce((total, event) => {
        if (event.type === 'interception') return total + 1;
        return total;
      }, 0),
      totalBlocks: gameEvents.reduce((total, event) => {
        if (event.type === 'contre') return total + 1;
        return total;
      }, 0),
      totalTurnovers: gameEvents.reduce((total, event) => {
        if (event.type === 'perte') return total + 1;
        return total;
      }, 0),
      totalFouls: gameEvents.reduce((total, event) => {
        if (event.type === 'faute') return total + 1;
        return total;
      }, 0),
      totalThreePointers: gameEvents.reduce((total, event) => {
        if (event.type === 'tir' && event.details && event.details.typeTir === '3pts' && event.details.reussi) return total + 1;
        return total;
      }, 0),
      totalFreeThrows: gameEvents.reduce((total, event) => {
        if (event.type === 'tir' && event.details && event.details.typeTir === 'lf' && event.details.reussi) return total + 1;
        return total;
      }, 0),
      totalFieldGoals: gameEvents.reduce((total, event) => {
        if (event.type === 'tir' && event.details && event.details.reussi) return total + 1;
        return total;
      }, 0),
      totalPoints3pt: gameEvents.reduce((total, event) => {
        if (event.type === 'tir' && event.details && event.details.typeTir === '3pts' && event.details.reussi) return total + 3;
        return total;
      }, 0),
      totalPoints2pt: gameEvents.reduce((total, event) => {
        if (event.type === 'tir' && event.details && event.details.typeTir === '2pts' && event.details.reussi) return total + 2;
        return total;
      }, 0),
      totalPointsFT: gameEvents.reduce((total, event) => {
        if (event.type === 'tir' && event.details && event.details.typeTir === 'lf' && event.details.reussi) return total + 1;
        return total;
      }, 0),
    };
  };
  
  // Obtenir les joueurs par équipe
  const getPlayersByTeam = (teamId) => {
    return players.filter(player => player.equipeId === teamId);
  };
  
  // Préparer les données pour les onglets
  const tabs = [
    { id: 'summary', label: 'Résumé' },
    { id: 'stats', label: 'Statistiques' },
    { id: 'players', label: 'Joueurs' },
    { id: 'events', label: 'Événements' }
  ];
  
  // Préparer les données pour les statistiques
  const gameStats = calculateGameStats();
  const statsData = [
    { label: 'Points', value: gameStats.totalPoints },
    { label: 'Rebonds', value: gameStats.totalRebounds },
    { label: 'Passes décisives', value: gameStats.totalAssists },
    { label: 'Interceptions', value: gameStats.totalSteals },
    { label: 'Contres', value: gameStats.totalBlocks },
    { label: 'Pertes de balle', value: gameStats.totalTurnovers },
    { label: 'Fautes', value: gameStats.totalFouls },
    { label: 'Tirs à 3 points', value: gameStats.totalThreePointers }
  ];
  
  // Obtenir les joueurs des deux équipes
  const homePlayers = homeTeam ? getPlayersByTeam(homeTeam.id) : [];
  const awayPlayers = awayTeam ? getPlayersByTeam(awayTeam.id) : [];
  
  return (
    <GameDetailContainer>
      <BackButton to="/games">
        <FaArrowLeft /> Retour aux matchs
      </BackButton>
      
      <GameHeader>
        <GameStatus status={game.statut === 'en cours' ? 'live' : game.statut === 'terminé' ? 'completed' : 'upcoming'}>
          {game.statut === 'en cours' ? 'En direct' : game.statut === 'terminé' ? 'Terminé' : 'À venir'}
        </GameStatus>
        
        <GameInfo>
          <TeamComponent team={homeTeam} />
          
          <ScoreComponent 
            homeScore={game.equipeLocale.score} 
            awayScore={game.equipeVisiteur.score} 
            date={game.date} 
            formatDate={formatDate} 
          />
          
          <TeamComponent team={awayTeam} />
        </GameInfo>
        
        <GameActions>
          <ActionButton to={`/games/${gameId}/edit`}>
            <FaEdit /> Modifier
          </ActionButton>
          <ActionButton to={`/games/${gameId}/live`} primary>
            <FaPlay /> Match en direct
          </ActionButton>
        </GameActions>
      </GameHeader>
      
      <TabsComponent 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={tabs} 
      />
      
      {activeTab === 'summary' && (
        <>
          <GameSection title="Informations du match" icon="calendar">
            <p>Date: {formatDate(game.date)}</p>
            <p>Heure: {formatTime(game.date)}</p>
            <p>Lieu: {game.lieuNom || 'Non spécifié'}</p>
            <p>Statut: {game.statut}</p>
          </GameSection>
          
          <GameSection title="Statistiques principales" icon="stats">
            <StatsComponent stats={statsData.slice(0, 4)} />
          </GameSection>
        </>
      )}
      
      {activeTab === 'stats' && (
        <GameSection title="Statistiques détaillées" icon="stats">
          <StatsComponent stats={statsData} />
        </GameSection>
      )}
      
      {activeTab === 'players' && (
        <>
          <GameSection title={`Joueurs de ${homeTeam?.nom || 'Équipe locale'}`} icon="players">
            <PlayersListComponent 
              players={homePlayers} 
              teamName={homeTeam?.nom || 'Équipe locale'} 
            />
          </GameSection>
          
          <GameSection title={`Joueurs de ${awayTeam?.nom || 'Équipe visiteur'}`} icon="players">
            <PlayersListComponent 
              players={awayPlayers} 
              teamName={awayTeam?.nom || 'Équipe visiteur'} 
            />
          </GameSection>
        </>
      )}
      
      {activeTab === 'events' && (
        <GameSection title="Événements du match" icon="calendar">
          {gameEvents.length > 0 ? (
            <div>
              {/* Affichage des événements du match */}
              {gameEvents.map((event, index) => (
                <div key={index}>
                  {/* Contenu de l'événement */}
                  <p>{event.type} - {event.temps?.periode || ''}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun événement enregistré pour ce match.</p>
          )}
        </GameSection>
      )}
    </GameDetailContainer>
  );
};

export default GameDetail;
