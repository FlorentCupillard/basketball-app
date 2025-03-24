import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTeam } from '../../store/slices/teamsSlice';
import { FaEdit, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';

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

const LogoPreview = styled.div`
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border: 1px dashed #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #1a73e8;
    box-shadow: 0 2px 8px rgba(26, 115, 232, 0.2);
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const StatsSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const StatsTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div`
  margin-bottom: 15px;
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

const TeamEditForm = () => {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer les équipes depuis le store Redux
  const teams = useSelector(state => state.teams.teams);
  const team = teams.find(team => team.id === teamId);
  
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    nom: '',
    logo: '',
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
  
  // Charger les données de l'équipe lorsque le composant est monté
  useEffect(() => {
    if (team) {
      setFormData({
        id: team.id,
        nom: team.nom,
        logo: team.logo,
        joueurs: team.joueurs,
        statistiquesEquipe: {
          ...team.statistiquesEquipe
        }
      });
    }
  }, [team]);
  
  // Si l'équipe n'existe pas, afficher un message
  if (!team) {
    return (
      <FormContainer>
        <BackButton onClick={() => navigate('/teams')}>
          <FaArrowLeft /> Retour aux équipes
        </BackButton>
        <NotFoundMessage>
          Équipe non trouvée. Veuillez vérifier l'identifiant de l'équipe.
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
  
  // Gérer les changements dans les statistiques
  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    
    setFormData(prev => ({
      ...prev,
      statistiquesEquipe: {
        ...prev.statistiquesEquipe,
        [name]: numValue
      }
    }));
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
    
    // Mettre à jour l'équipe existante
    dispatch(updateTeam(formData));
    
    // Rediriger vers la page des équipes
    navigate('/teams');
  };
  
  // Gérer l'annulation du formulaire
  const handleCancel = () => {
    navigate('/teams');
  };
  
  return (
    <FormContainer>
      <BackButton onClick={() => navigate('/teams')}>
        <FaArrowLeft /> Retour aux équipes
      </BackButton>
      
      <FormTitle>
        <FaEdit /> Modifier l'équipe
      </FormTitle>
      
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
          {errors.nom && <ErrorMessage><FaTimes /> {errors.nom}</ErrorMessage>}
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
        
        <StatsSection>
          <StatsTitle>Statistiques de l'équipe</StatsTitle>
          <StatsGrid>
            <StatItem>
              <Label>Matchs joués</Label>
              <Input 
                type="number" 
                name="matchsJoues" 
                value={formData.statistiquesEquipe.matchsJoues} 
                onChange={handleStatsChange} 
                min="0"
              />
            </StatItem>
            
            <StatItem>
              <Label>Victoires</Label>
              <Input 
                type="number" 
                name="victoires" 
                value={formData.statistiquesEquipe.victoires} 
                onChange={handleStatsChange} 
                min="0"
              />
            </StatItem>
            
            <StatItem>
              <Label>Défaites</Label>
              <Input 
                type="number" 
                name="defaites" 
                value={formData.statistiquesEquipe.defaites} 
                onChange={handleStatsChange} 
                min="0"
              />
            </StatItem>
            
            <StatItem>
              <Label>Points marqués</Label>
              <Input 
                type="number" 
                name="pointsMarques" 
                value={formData.statistiquesEquipe.pointsMarques} 
                onChange={handleStatsChange} 
                min="0"
              />
            </StatItem>
            
            <StatItem>
              <Label>Points encaissés</Label>
              <Input 
                type="number" 
                name="pointsEncaisses" 
                value={formData.statistiquesEquipe.pointsEncaisses} 
                onChange={handleStatsChange} 
                min="0"
              />
            </StatItem>
          </StatsGrid>
        </StatsSection>
        
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

export default TeamEditForm;
