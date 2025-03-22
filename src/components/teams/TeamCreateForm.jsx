import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTeam } from '../../store/slices/teamsSlice';

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

const LogoPreview = styled.div`
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const TeamCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    nom: '',
    logo: 'https://example.com/default-team-logo.png', // Logo par défaut
    statistiquesEquipe: {
      matchsJoues: 0,
      victoires: 0,
      defaites: 0,
      pointsMarques: 0,
      pointsEncaisses: 0
    }
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
    
    if (!formData.nom) {
      newErrors.nom = 'Le nom de l\'équipe est requis';
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
    
    // Créer un nouvel ID unique pour l'équipe
    const newTeamId = `team${Date.now()}`;
    
    // Créer le nouvel objet équipe
    const newTeam = {
      id: newTeamId,
      nom: formData.nom,
      logo: formData.logo,
      joueurs: [],
      statistiquesEquipe: formData.statistiquesEquipe
    };
    
    // Dispatcher l'action pour ajouter l'équipe
    dispatch(addTeam(newTeam));
    
    // Rediriger vers la page des équipes
    navigate('/teams');
  };
  
  // Gérer l'annulation du formulaire
  const handleCancel = () => {
    navigate('/teams');
  };
  
  return (
    <FormContainer>
      <FormTitle>Créer une nouvelle équipe</FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nom de l'équipe</Label>
          <Input 
            type="text" 
            name="nom" 
            value={formData.nom} 
            onChange={handleChange} 
            placeholder="Entrez le nom de l'équipe"
          />
          {errors.nom && <ErrorMessage>{errors.nom}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label>URL du logo</Label>
          <Input 
            type="text" 
            name="logo" 
            value={formData.logo} 
            onChange={handleChange} 
            placeholder="Entrez l'URL du logo de l'équipe"
          />
          <LogoPreview>
            {formData.logo ? (
              <img src={formData.logo} alt="Aperçu du logo" />
            ) : (
              <span>Aperçu du logo</span>
            )}
          </LogoPreview>
        </FormGroup>
        
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>Annuler</CancelButton>
          <SubmitButton type="submit">Créer l'équipe</SubmitButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default TeamCreateForm;
