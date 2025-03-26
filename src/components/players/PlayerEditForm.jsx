import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePlayerAsync } from '../../store/slices/playersSlice';
import { FaEdit, FaSave, FaTimes, FaArrowLeft, FaUser, FaChartBar } from 'react-icons/fa';

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

const PhotoPreview = styled.div`
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

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormColumn = styled.div`
  flex: 1;
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
  display: flex;
  align-items: center;
  gap: 8px;
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

const PlayerEditForm = () => {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer les joueurs et les équipes depuis le store Redux
  const players = useSelector(state => state.players.players);
  const teams = useSelector(state => state.teams.teams);
  const player = players.find(player => player.id === playerId);
  
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    numero: '',
    poste: 'meneur',
    equipeId: '',
    photo: '',
    taille: '',
    poids: '',
    dateNaissance: '',
    statistiquesGlobales: {
      matchsJoues: 0,
      minutesJouees: 0,
      points: 0,
      rebonds: 0,
      passesDecisives: 0,
      interceptions: 0,
      contres: 0,
      ballesPerdues: 0,
      fautes: 0,
      tirsReussis: 0,
      tirsTentes: 0,
      tirsA3ptsReussis: 0,
      tirsA3ptsTentes: 0,
      lancersFrancsReussis: 0,
      lancersFrancsTentes: 0
    }
  });
  
  // État local pour les erreurs de validation
  const [errors, setErrors] = useState({});
  
  // Charger les données du joueur lorsque le composant est monté
  useEffect(() => {
    if (player) {
      setFormData({
        id: player.id,
        prenom: player.prenom,
        nom: player.nom,
        numero: player.numero,
        poste: player.poste,
        equipeId: player.equipeId,
        photo: player.photo,
        taille: player.taille,
        poids: player.poids,
        dateNaissance: player.dateNaissance,
        statistiquesGlobales: {
          ...player.statistiquesGlobales
        }
      });
    }
  }, [player]);
  
  // Si le joueur n'existe pas, afficher un message
  if (!player) {
    return (
      <FormContainer>
        <BackButton onClick={() => navigate('/players')}>
          <FaArrowLeft /> Retour aux joueurs
        </BackButton>
        <NotFoundMessage>
          Joueur non trouvé. Veuillez vérifier l'identifiant du joueur.
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
      statistiquesGlobales: {
        ...prev.statistiquesGlobales,
        [name]: numValue
      }
    }));
  };
  
  // Valider le formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.prenom) {
      newErrors.prenom = 'Le prénom est requis';
    }
    
    if (!formData.nom) {
      newErrors.nom = 'Le nom est requis';
    }
    
    if (!formData.numero) {
      newErrors.numero = 'Le numéro est requis';
    } else if (isNaN(formData.numero) || formData.numero < 0 || formData.numero > 99) {
      newErrors.numero = 'Le numéro doit être un nombre entre 0 et 99';
    }
    
    if (!formData.equipeId) {
      newErrors.equipeId = 'L\'équipe est requise';
    }
    
    if (formData.taille && (isNaN(formData.taille) || formData.taille < 100 || formData.taille > 250)) {
      newErrors.taille = 'La taille doit être un nombre entre 100 et 250 cm';
    }
    
    if (formData.poids && (isNaN(formData.poids) || formData.poids < 40 || formData.poids > 200)) {
      newErrors.poids = 'Le poids doit être un nombre entre 40 et 200 kg';
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
    
    // Préparer les données du joueur pour la mise à jour
    const updatedPlayer = {
      ...formData,
      numero: parseInt(formData.numero),
      taille: formData.taille ? parseFloat(formData.taille) : null,
      poids: formData.poids ? parseFloat(formData.poids) : null
    };
    
    // Dispatcher l'action pour mettre à jour le joueur
    dispatch(updatePlayerAsync({ id: player.id, player: updatedPlayer }));
    
    // Rediriger vers la page des joueurs
    navigate('/players');
  };
  
  // Gérer l'annulation du formulaire
  const handleCancel = () => {
    navigate('/players');
  };
  
  return (
    <FormContainer>
      <BackButton onClick={() => navigate('/players')}>
        <FaArrowLeft /> Retour aux joueurs
      </BackButton>
      
      <FormTitle>
        <FaEdit /> Modifier le joueur
      </FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>Prénom</Label>
              <Input 
                type="text" 
                name="prenom" 
                value={formData.prenom} 
                onChange={handleChange} 
                placeholder="Entrez le prénom du joueur"
              />
              {errors.prenom && <ErrorMessage><FaTimes /> {errors.prenom}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
          
          <FormColumn>
            <FormGroup>
              <Label>Nom</Label>
              <Input 
                type="text" 
                name="nom" 
                value={formData.nom} 
                onChange={handleChange} 
                placeholder="Entrez le nom du joueur"
              />
              {errors.nom && <ErrorMessage><FaTimes /> {errors.nom}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
        </FormRow>
        
        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>Numéro</Label>
              <Input 
                type="number" 
                name="numero" 
                value={formData.numero} 
                onChange={handleChange} 
                placeholder="Entrez le numéro du joueur"
                min="0"
                max="99"
              />
              {errors.numero && <ErrorMessage><FaTimes /> {errors.numero}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
          
          <FormColumn>
            <FormGroup>
              <Label>Poste</Label>
              <Select 
                name="poste" 
                value={formData.poste} 
                onChange={handleChange}
              >
                <option value="meneur">Meneur</option>
                <option value="arriere">Arrière</option>
                <option value="ailier">Ailier</option>
                <option value="ailier fort">Ailier fort</option>
                <option value="pivot">Pivot</option>
              </Select>
            </FormGroup>
          </FormColumn>
        </FormRow>
        
        <FormGroup>
          <Label>Équipe</Label>
          <Select 
            name="equipeId" 
            value={formData.equipeId} 
            onChange={handleChange}
          >
            <option value="">Sélectionner une équipe</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.nom}</option>
            ))}
          </Select>
          {errors.equipeId && <ErrorMessage><FaTimes /> {errors.equipeId}</ErrorMessage>}
        </FormGroup>
        
        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>Taille (cm)</Label>
              <Input 
                type="number" 
                name="taille" 
                value={formData.taille || ''} 
                onChange={handleChange} 
                placeholder="Entrez la taille du joueur en cm"
                min="100"
                max="250"
              />
              {errors.taille && <ErrorMessage><FaTimes /> {errors.taille}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
          
          <FormColumn>
            <FormGroup>
              <Label>Poids (kg)</Label>
              <Input 
                type="number" 
                name="poids" 
                value={formData.poids || ''} 
                onChange={handleChange} 
                placeholder="Entrez le poids du joueur en kg"
                min="40"
                max="200"
              />
              {errors.poids && <ErrorMessage><FaTimes /> {errors.poids}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
        </FormRow>
        
        <FormGroup>
          <Label>Date de naissance</Label>
          <Input 
            type="date" 
            name="dateNaissance" 
            value={formData.dateNaissance || ''} 
            onChange={handleChange} 
          />
        </FormGroup>
        
        <FormGroup>
          <Label>URL de la photo</Label>
          <Input 
            type="text" 
            name="photo" 
            value={formData.photo} 
            onChange={handleChange} 
            placeholder="Entrez l'URL de la photo du joueur"
          />
          <PhotoPreview>
            {formData.photo ? (
              <img src={formData.photo} alt="Aperçu de la photo" />
            ) : (
              <span>Aperçu de la photo</span>
            )}
          </PhotoPreview>
        </FormGroup>
        
        <StatsSection>
          <StatsTitle>
            <FaChartBar /> Statistiques du joueur
          </StatsTitle>
          <StatsGrid>
            <StatItem>
              <Label>Matchs joués</Label>
              <Input 
                type="number" 
                name="matchsJoues" 
                value={formData.statistiquesGlobales.matchsJoues} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Minutes jouées</Label>
              <Input 
                type="number" 
                name="minutesJouees" 
                value={formData.statistiquesGlobales.minutesJouees} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Points</Label>
              <Input 
                type="number" 
                name="points" 
                value={formData.statistiquesGlobales.points} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Rebonds</Label>
              <Input 
                type="number" 
                name="rebonds" 
                value={formData.statistiquesGlobales.rebonds} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Passes décisives</Label>
              <Input 
                type="number" 
                name="passesDecisives" 
                value={formData.statistiquesGlobales.passesDecisives} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Interceptions</Label>
              <Input 
                type="number" 
                name="interceptions" 
                value={formData.statistiquesGlobales.interceptions} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Contres</Label>
              <Input 
                type="number" 
                name="contres" 
                value={formData.statistiquesGlobales.contres} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Balles perdues</Label>
              <Input 
                type="number" 
                name="ballesPerdues" 
                value={formData.statistiquesGlobales.ballesPerdues} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Fautes</Label>
              <Input 
                type="number" 
                name="fautes" 
                value={formData.statistiquesGlobales.fautes} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Tirs réussis</Label>
              <Input 
                type="number" 
                name="tirsReussis" 
                value={formData.statistiquesGlobales.tirsReussis} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>Tirs tentés</Label>
              <Input 
                type="number" 
                name="tirsTentes" 
                value={formData.statistiquesGlobales.tirsTentes} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>3pts réussis</Label>
              <Input 
                type="number" 
                name="tirsA3ptsReussis" 
                value={formData.statistiquesGlobales.tirsA3ptsReussis} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>3pts tentés</Label>
              <Input 
                type="number" 
                name="tirsA3ptsTentes" 
                value={formData.statistiquesGlobales.tirsA3ptsTentes} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>LF réussis</Label>
              <Input 
                type="number" 
                name="lancersFrancsReussis" 
                value={formData.statistiquesGlobales.lancersFrancsReussis} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StatItem>
            
            <StatItem>
              <Label>LF tentés</Label>
              <Input 
                type="number" 
                name="lancersFrancsTentes" 
                value={formData.statistiquesGlobales.lancersFrancsTentes} 
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
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

export default PlayerEditForm;
