import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addGame } from '../../store/slices/gamesSlice';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    opacity: 0.9;
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
`;

const TeamPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const TeamLogo = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const TeamName = styled.div`
  font-weight: 600;
`;

const GameCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer les équipes depuis le store Redux
  const teams = useSelector(state => state.teams.teams);
  
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    lieuId: 'lieu1', // Valeur par défaut
    equipeLocaleId: '',
    equipeVisiteurId: ''
  });
  
  // État local pour les erreurs de validation
  const [errors, setErrors] = useState({});
  
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
      lieuId: formData.lieuId,
      equipeLocale: {
        id: formData.equipeLocaleId,
        score: 0
      },
      equipeVisiteur: {
        id: formData.equipeVisiteurId,
        score: 0
      },
      statut: 'à venir',
      periodes: [],
      evenements: [],
      statistiquesJoueurs: []
    };
    
    // Dispatcher l'action pour ajouter le match
    dispatch(addGame(newGame));
    
    // Rediriger vers la page des matchs
    navigate('/games');
  };
  
  // Gérer l'annulation du formulaire
  const handleCancel = () => {
    navigate('/games');
  };
  
  // Obtenir les détails d'une équipe à partir de son ID
  const getTeamDetails = (teamId) => {
    return teams.find(team => team.id === teamId);
  };
  
  return (
    <FormContainer>
      <FormTitle>Créer un nouveau match</FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Date</Label>
          <Input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
          />
          {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label>Heure</Label>
          <Input 
            type="time" 
            name="time" 
            value={formData.time} 
            onChange={handleChange} 
          />
          {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label>Lieu</Label>
          <Input 
            type="text" 
            name="lieuId" 
            value={formData.lieuId} 
            onChange={handleChange} 
            placeholder="Entrez le lieu du match"
          />
        </FormGroup>
        
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
          {errors.equipeLocaleId && <ErrorMessage>{errors.equipeLocaleId}</ErrorMessage>}
          
          {formData.equipeLocaleId && (
            <TeamPreview>
              <TeamLogo>
                <img src={getTeamDetails(formData.equipeLocaleId)?.logo} alt="Logo équipe locale" />
              </TeamLogo>
              <TeamName>{getTeamDetails(formData.equipeLocaleId)?.nom}</TeamName>
            </TeamPreview>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label>Équipe visiteur</Label>
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
          {errors.equipeVisiteurId && <ErrorMessage>{errors.equipeVisiteurId}</ErrorMessage>}
          
          {formData.equipeVisiteurId && (
            <TeamPreview>
              <TeamLogo>
                <img src={getTeamDetails(formData.equipeVisiteurId)?.logo} alt="Logo équipe visiteur" />
              </TeamLogo>
              <TeamName>{getTeamDetails(formData.equipeVisiteurId)?.nom}</TeamName>
            </TeamPreview>
          )}
        </FormGroup>
        
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>Annuler</CancelButton>
          <SubmitButton type="submit">Créer le match</SubmitButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default GameCreateForm;
