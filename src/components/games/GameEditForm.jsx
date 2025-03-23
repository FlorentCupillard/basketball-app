import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateGame } from '../../store/slices/gamesSlice';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaExchangeAlt, FaInfoCircle, FaSave, FaTimes, FaEdit, FaArrowLeft } from 'react-icons/fa';

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

const BackButton = styled(Button)`
  background-color: transparent;
  color: #1a73e8;
  padding: 0;
  margin-bottom: 20px;
  
  &:hover {
    background-color: transparent;
    transform: translateX(-5px);
    box-shadow: none;
  }
  
  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 15px;
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

const NotFoundMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-style: italic;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
`;

const GameEditForm = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer les matchs et les équipes depuis le store Redux
  const games = useSelector(state => state.games.games);
  const teams = useSelector(state => state.teams.teams);
  const game = games.find(game => game.id === gameId);
  
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    lieuId: '',
    lieuNom: '',
    equipeLocaleId: '',
    equipeVisiteurId: '',
    description: '',
    statut: 'à venir'
  });
  
  // État local pour les erreurs de validation
  const [errors, setErrors] = useState({});
  
  // État pour l'aperçu du match
  const [showPreview, setShowPreview] = useState(false);
  
  // Charger les données du match lorsque le composant est monté
  useEffect(() => {
    if (game) {
      // Extraire la date et l'heure du format ISO
      const dateObj = new Date(game.date);
      const formattedDate = dateObj.toISOString().split('T')[0];
      const formattedTime = dateObj.toTimeString().slice(0, 5);
      
      setFormData({
        id: game.id,
        date: formattedDate,
        time: formattedTime,
        lieuId: game.lieuId || '',
        lieuNom: game.lieuNom || '',
        equipeLocaleId: game.equipeLocale.id,
        equipeVisiteurId: game.equipeVisiteur.id,
        description: game.description || '',
        statut: game.statut || 'à venir',
        // Préserver les autres propriétés du match
        periodes: game.periodes || [],
        evenements: game.evenements || [],
        statistiquesJoueurs: game.statistiquesJoueurs || [],
        equipeLocale: {
          ...game.equipeLocale
        },
        equipeVisiteur: {
          ...game.equipeVisiteur
        }
      });
      
      setShowPreview(true);
    }
  }, [game]);
  
  // Mettre à jour l'aperçu lorsque les équipes sont sélectionnées
  useEffect(() => {
    if (formData.equipeLocaleId && formData.equipeVisiteurId && 
        formData.equipeLocaleId !== formData.equipeVisiteurId) {
      setShowPreview(true);
    } else if (formData.equipeLocaleId && formData.equipeVisiteurId) {
      setShowPreview(false);
    }
  }, [formData.equipeLocaleId, formData.equipeVisiteurId]);
  
  // Si le match n'existe pas, afficher un message
  if (!game) {
    return (
      <FormContainer>
        <BackButton onClick={() => navigate('/games')}>
          <FaArrowLeft /> Retour aux matchs
        </BackButton>
        <NotFoundMessage>
          Match non trouvé. Veuillez vérifier l'identifiant du match.
        </NotFoundMessage>
      </FormContainer>
    );
  }
  
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
      newErrors.lieuNom = 'Le lieu est requis';
    }
    
    if (!formData.equipeLocaleId) {
      newErrors.equipeLocaleId = 'L\'équipe locale est requise';
    }
    
    if (!formData.equipeVisiteurId) {
      newErrors.equipeVisiteurId = 'L\'équipe visiteuse est requise';
    }
    
    if (formData.equipeLocaleId === formData.equipeVisiteurId && formData.equipeLocaleId) {
      newErrors.equipeVisiteurId = 'Les équipes doivent être différentes';
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
    
    // Combiner la date et l'heure en un format ISO
    const dateTimeString = `${formData.date}T${formData.time}:00`;
    
    // Préparer les données du match pour la mise à jour
    const updatedGame = {
      ...game,
      id: formData.id,
      date: dateTimeString,
      lieuId: formData.lieuId || `lieu${Date.now()}`,
      lieuNom: formData.lieuNom,
      equipeLocale: {
        id: formData.equipeLocaleId,
        score: game.equipeLocale.score || 0
      },
      equipeVisiteur: {
        id: formData.equipeVisiteurId,
        score: game.equipeVisiteur.score || 0
      },
      description: formData.description,
      statut: formData.statut,
      periodes: formData.periodes || [],
      evenements: formData.evenements || [],
      statistiquesJoueurs: formData.statistiquesJoueurs || []
    };
    
    // Dispatcher l'action pour mettre à jour le match
    dispatch(updateGame(updatedGame));
    
    // Rediriger vers la page des matchs
    navigate('/games');
  };
  
  // Gérer l'annulation du formulaire
  const handleCancel = () => {
    navigate('/games');
  };
  
  // Obtenir les détails d'une équipe à partir de son ID
  const getTeamDetails = (teamId) => {
    return teams.find(team => team.id === teamId) || {};
  };
  
  // Équipe locale et visiteuse sélectionnées
  const equipeLocale = getTeamDetails(formData.equipeLocaleId);
  const equipeVisiteur = getTeamDetails(formData.equipeVisiteurId);
  
  return (
    <FormContainer>
      <BackButton onClick={() => navigate('/games')}>
        <FaArrowLeft /> Retour aux matchs
      </BackButton>
      
      <FormTitle>
        <FaEdit /> Modifier le match
      </FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormSection>
          <FormSectionTitle>
            <FaCalendarAlt /> Informations générales
          </FormSectionTitle>
          
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label>
                  <FaCalendarAlt /> Date
                </Label>
                <Input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                />
                {errors.date && <ErrorMessage><FaTimes /> {errors.date}</ErrorMessage>}
              </FormGroup>
            </FormColumn>
            
            <FormColumn>
              <FormGroup>
                <Label>
                  <FaClock /> Heure
                </Label>
                <Input 
                  type="time" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                />
                {errors.time && <ErrorMessage><FaTimes /> {errors.time}</ErrorMessage>}
              </FormGroup>
            </FormColumn>
          </FormRow>
          
          <FormGroup>
            <Label>
              <FaMapMarkerAlt /> Lieu
            </Label>
            <Input 
              type="text" 
              name="lieuNom" 
              value={formData.lieuNom} 
              onChange={handleChange} 
              placeholder="Entrez le nom du lieu (ex: Stade Pierre Mauroy)"
            />
            {errors.lieuNom && <ErrorMessage><FaTimes /> {errors.lieuNom}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label>
              <FaInfoCircle /> Description (optionnelle)
            </Label>
            <Input 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Entrez une description pour ce match"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>
              <FaInfoCircle /> Statut
            </Label>
            <Select 
              name="statut" 
              value={formData.statut} 
              onChange={handleChange}
            >
              <option value="à venir">À venir</option>
              <option value="en cours">En cours</option>
              <option value="terminé">Terminé</option>
              <option value="annulé">Annulé</option>
              <option value="reporté">Reporté</option>
            </Select>
          </FormGroup>
        </FormSection>
        
        <FormSection>
          <FormSectionTitle>
            <FaUsers /> Équipes
          </FormSectionTitle>
          
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label>Équipe locale</Label>
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
                {errors.equipeLocaleId && <ErrorMessage><FaTimes /> {errors.equipeLocaleId}</ErrorMessage>}
                
                {formData.equipeLocaleId && (
                  <TeamPreview>
                    <TeamLogo>
                      <img src={equipeLocale.logo} alt={`Logo ${equipeLocale.nom}`} />
                    </TeamLogo>
                    <TeamInfo>
                      <TeamName>{equipeLocale.nom}</TeamName>
                      <TeamDetails>
                        {equipeLocale.statistiquesEquipe?.matchsJoues || 0} matchs, {equipeLocale.statistiquesEquipe?.victoires || 0} victoires
                      </TeamDetails>
                    </TeamInfo>
                  </TeamPreview>
                )}
              </FormGroup>
            </FormColumn>
            
            <FormColumn>
              <FormGroup>
                <Label>Équipe visiteuse</Label>
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
                {errors.equipeVisiteurId && <ErrorMessage><FaTimes /> {errors.equipeVisiteurId}</ErrorMessage>}
                
                {formData.equipeVisiteurId && (
                  <TeamPreview>
                    <TeamLogo>
                      <img src={equipeVisiteur.logo} alt={`Logo ${equipeVisiteur.nom}`} />
                    </TeamLogo>
                    <TeamInfo>
                      <TeamName>{equipeVisiteur.nom}</TeamName>
                      <TeamDetails>
                        {equipeVisiteur.statistiquesEquipe?.matchsJoues || 0} matchs, {equipeVisiteur.statistiquesEquipe?.victoires || 0} victoires
                      </TeamDetails>
                    </TeamInfo>
                  </TeamPreview>
                )}
              </FormGroup>
            </FormColumn>
          </FormRow>
          
          {showPreview && (
            <MatchPreview>
              <TeamPreview>
                <TeamLogo>
                  <img src={equipeLocale.logo} alt={`Logo ${equipeLocale.nom}`} />
                </TeamLogo>
                <TeamInfo>
                  <TeamName>{equipeLocale.nom}</TeamName>
                </TeamInfo>
              </TeamPreview>
              
              <MatchVersus>
                <div>VS</div>
                <MatchInfo>
                  <MatchInfoItem>
                    <FaCalendarAlt /> {formData.date}
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
              </MatchVersus>
              
              <TeamPreview>
                <TeamLogo>
                  <img src={equipeVisiteur.logo} alt={`Logo ${equipeVisiteur.nom}`} />
                </TeamLogo>
                <TeamInfo>
                  <TeamName>{equipeVisiteur.nom}</TeamName>
                </TeamInfo>
              </TeamPreview>
            </MatchPreview>
          )}
        </FormSection>
        
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>
            <FaTimes /> Annuler
          </CancelButton>
          <SubmitButton type="submit">
            <FaSave /> Enregistrer les modifications
          </SubmitButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default GameEditForm;
