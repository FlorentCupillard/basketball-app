import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGameAsync } from '../../store/slices/gamesSlice';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaExchangeAlt, FaInfoCircle, FaSave, FaTimes } from 'react-icons/fa';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 15px;
    margin: 0 10px;
  }
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #444;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #1a73e8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #1a73e8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
    width: 100%;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #1a73e8;
  color: white;
  
  &:hover {
    background-color: #1557b0;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TeamPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const TeamLogo = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const TeamName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #333;
`;

const TeamInfo = styled.div`
  flex: 1;
`;

const TeamDetails = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

const MatchPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
`;

const MatchVersus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #1a73e8;
  
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const MatchInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FormSectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const FormColumn = styled.div`
  flex: 1;
`;

const HelpText = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  font-style: italic;
`;

const GameCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer les équipes depuis le store Redux
  const teams = useSelector(state => state.teams.teams);
  const players = useSelector(state => state.players.players);
  
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    lieuId: '',
    lieuNom: '',
    equipeLocaleId: '',
    equipeVisiteurId: '',
    description: ''
  });
  
  // État local pour les erreurs de validation
  const [errors, setErrors] = useState({});
  
  // État pour l'aperçu du match
  const [showPreview, setShowPreview] = useState(false);
  
  // Mettre à jour l'aperçu lorsque les équipes sont sélectionnées
  useEffect(() => {
    if (formData.equipeLocaleId && formData.equipeVisiteurId && 
        formData.equipeLocaleId !== formData.equipeVisiteurId) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [formData.equipeLocaleId, formData.equipeVisiteurId]);
  
  // Définir la date d'aujourd'hui comme valeur par défaut
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      date: formattedDate
    }));
  }, []);
  
  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur pour ce champ s'il y en a une
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Valider le formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }
    
    if (!formData.time) {
      newErrors.time = 'L\'heure est requise';
    }
    
    if (!formData.lieuNom) {
      newErrors.lieuNom = 'Le nom du lieu est requis';
    }
    
    if (!formData.equipeLocaleId) {
      newErrors.equipeLocaleId = 'L\'équipe locale est requise';
    }
    
    if (!formData.equipeVisiteurId) {
      newErrors.equipeVisiteurId = 'L\'équipe visiteur est requise';
    }
    
    if (formData.equipeLocaleId && formData.equipeVisiteurId && 
        formData.equipeLocaleId === formData.equipeVisiteurId) {
      newErrors.equipeVisiteurId = 'Les équipes locale et visiteur doivent être différentes';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Créer un nouvel ID unique pour le match
    const newGameId = `match${Date.now()}`;
    
    // Créer un objet date à partir des champs date et heure
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    
    // Créer le nouvel objet match
    const newGame = {
      id: newGameId,
      date: dateTime.toISOString(),
      lieuId: `lieu_${Date.now()}`,
      lieuNom: formData.lieuNom,
      description: formData.description || '',
      equipeLocale: {
        id: formData.equipeLocaleId,
        score: 0
      },
      equipeVisiteur: {
        id: formData.equipeVisiteurId,
        score: 0
      },
      statut: 'à venir',
      periodes: [
        { numero: 1, duree: 600, tempsRestant: 600 },
        { numero: 2, duree: 600, tempsRestant: 600 },
        { numero: 3, duree: 600, tempsRestant: 600 },
        { numero: 4, duree: 600, tempsRestant: 600 }
      ],
      evenements: [],
      statistiquesJoueurs: getInitialPlayerStats(formData.equipeLocaleId, formData.equipeVisiteurId)
    };
    
    // Dispatcher l'action asynchrone pour ajouter le match
    dispatch(addGameAsync(newGame))
      .unwrap()
      .then(() => {
        // Rediriger vers la page des matchs après succès
        navigate('/games');
      })
      .catch((error) => {
        console.error('Erreur lors de la création du match:', error);
        // Gérer l'erreur si nécessaire
      });
  };
  
  // Initialiser les statistiques des joueurs pour les deux équipes
  const getInitialPlayerStats = (homeTeamId, awayTeamId) => {
    const teamPlayers = players.filter(player => 
      player.equipeId === homeTeamId || player.equipeId === awayTeamId
    );
    
    return teamPlayers.map(player => ({
      joueurId: player.id,
      equipeId: player.equipeId,
      minutes: 0,
      points: 0,
      rebonds: 0,
      passes: 0,
      interceptions: 0,
      contres: 0,
      tirs: {
        tentes: 0,
        reussis: 0
      },
      tirs3pts: {
        tentes: 0,
        reussis: 0
      },
      lancersFrancs: {
        tentes: 0,
        reussis: 0
      }
    }));
  };
  
  // Gérer l'annulation du formulaire
  const handleCancel = () => {
    navigate('/games');
  };
  
  // Obtenir les détails d'une équipe à partir de son ID
  const getTeamDetails = (teamId) => {
    return teams.find(team => team.id === teamId);
  };
  
  // Obtenir le nombre de joueurs d'une équipe
  const getTeamPlayersCount = (teamId) => {
    return players.filter(player => player.equipeId === teamId).length;
  };
  
  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  return (
    <FormContainer>
      <FormTitle>
        <FaCalendarAlt /> Créer un nouveau match
      </FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormSection>
          <FormSectionTitle>
            <FaInfoCircle /> Informations générales
          </FormSectionTitle>
          
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label><FaCalendarAlt /> Date</Label>
                <Input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                />
                {errors.date && <ErrorMessage><FaInfoCircle /> {errors.date}</ErrorMessage>}
              </FormGroup>
            </FormColumn>
            
            <FormColumn>
              <FormGroup>
                <Label><FaClock /> Heure</Label>
                <Input 
                  type="time" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                />
                {errors.time && <ErrorMessage><FaInfoCircle /> {errors.time}</ErrorMessage>}
              </FormGroup>
            </FormColumn>
          </FormRow>
          
          <FormGroup>
            <Label><FaMapMarkerAlt /> Lieu</Label>
            <Input 
              type="text" 
              name="lieuNom" 
              value={formData.lieuNom} 
              onChange={handleChange} 
              placeholder="Entrez le nom du lieu (ex: Gymnase Municipal)"
            />
            {errors.lieuNom && <ErrorMessage><FaInfoCircle /> {errors.lieuNom}</ErrorMessage>}
            <HelpText>Indiquez le nom complet du lieu où se déroulera le match</HelpText>
          </FormGroup>
          
          <FormGroup>
            <Label>Description (optionnelle)</Label>
            <Input 
              as="textarea"
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Informations supplémentaires sur le match"
              style={{ minHeight: '80px', resize: 'vertical' }}
            />
          </FormGroup>
        </FormSection>
        
        <FormSection>
          <FormSectionTitle>
            <FaUsers /> Équipes participantes
          </FormSectionTitle>
          
          <FormGroup>
            <Label><FaUsers /> Équipe locale</Label>
            <Select 
              name="equipeLocaleId" 
              value={formData.equipeLocaleId} 
              onChange={handleChange}
            >
              <option value="">Sélectionner une équipe</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.nom}</option>
              ))}
            </Select>
            {errors.equipeLocaleId && <ErrorMessage><FaInfoCircle /> {errors.equipeLocaleId}</ErrorMessage>}
            
            {formData.equipeLocaleId && (
              <TeamPreview>
                <TeamLogo>
                  <img src={getTeamDetails(formData.equipeLocaleId)?.logo} alt="Logo équipe locale" />
                </TeamLogo>
                <TeamInfo>
                  <TeamName>{getTeamDetails(formData.equipeLocaleId)?.nom}</TeamName>
                  <TeamDetails>
                    {getTeamPlayersCount(formData.equipeLocaleId)} joueurs disponibles
                  </TeamDetails>
                </TeamInfo>
              </TeamPreview>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label><FaUsers /> Équipe visiteur</Label>
            <Select 
              name="equipeVisiteurId" 
              value={formData.equipeVisiteurId} 
              onChange={handleChange}
            >
              <option value="">Sélectionner une équipe</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.nom}</option>
              ))}
            </Select>
            {errors.equipeVisiteurId && <ErrorMessage><FaInfoCircle /> {errors.equipeVisiteurId}</ErrorMessage>}
            
            {formData.equipeVisiteurId && (
              <TeamPreview>
                <TeamLogo>
                  <img src={getTeamDetails(formData.equipeVisiteurId)?.logo} alt="Logo équipe visiteur" />
                </TeamLogo>
                <TeamInfo>
                  <TeamName>{getTeamDetails(formData.equipeVisiteurId)?.nom}</TeamName>
                  <TeamDetails>
                    {getTeamPlayersCount(formData.equipeVisiteurId)} joueurs disponibles
                  </TeamDetails>
                </TeamInfo>
              </TeamPreview>
            )}
          </FormGroup>
          
          {showPreview && (
            <MatchPreview>
              <TeamPreview>
                <TeamLogo>
                  <img src={getTeamDetails(formData.equipeLocaleId)?.logo} alt="Logo équipe locale" />
                </TeamLogo>
                <TeamName>{getTeamDetails(formData.equipeLocaleId)?.nom}</TeamName>
              </TeamPreview>
              
              <MatchVersus>
                <FaExchangeAlt />
                <div>VS</div>
              </MatchVersus>
              
              <TeamPreview>
                <TeamLogo>
                  <img src={getTeamDetails(formData.equipeVisiteurId)?.logo} alt="Logo équipe visiteur" />
                </TeamLogo>
                <TeamName>{getTeamDetails(formData.equipeVisiteurId)?.nom}</TeamName>
              </TeamPreview>
              
              {formData.date && formData.time && (
                <MatchInfo>
                  <MatchInfoItem>
                    <FaCalendarAlt /> {formatDate(formData.date)}
                  </MatchInfoItem>
                  <MatchInfoItem>
                    <FaClock /> {formData.time}
                  </MatchInfoItem>
                  {formData.lieuNom && (
                    <MatchInfoItem>
                      <FaMapMarkerAlt /> {formData.lieuNom}
                    </MatchInfoItem>
                  )}
                </MatchInfo>
              )}
            </MatchPreview>
          )}
        </FormSection>
        
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>
            <FaTimes /> Annuler
          </CancelButton>
          <SubmitButton type="submit">
            <FaSave /> Créer le match
          </SubmitButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default GameCreateForm;
