import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPlayer } from '../../store/slices/playersSlice';

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

const PlayerCreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer les équipes depuis le store Redux
  const teams = useSelector(state => state.teams.teams);
  
  // État local pour le formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    numero: '',
    poste: 'meneur',
    equipeId: '',
    photo: 'https://example.com/default-player-photo.png', // Photo par défaut
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
    
    // Créer un nouvel ID unique pour le joueur
    const newPlayerId = `player${Date.now()}`;
    
    // Créer le nouvel objet joueur
    const newPlayer = {
      id: newPlayerId,
      prenom: formData.prenom,
      nom: formData.nom,
      numero: parseInt(formData.numero),
      poste: formData.poste,
      equipeId: formData.equipeId,
      photo: formData.photo,
      taille: formData.taille ? parseInt(formData.taille) : null,
      poids: formData.poids ? parseInt(formData.poids) : null,
      dateNaissance: formData.dateNaissance,
      statistiquesGlobales: formData.statistiquesGlobales
    };
    
    // Dispatcher l'action pour ajouter le joueur
    dispatch(addPlayer(newPlayer));
    
    // Rediriger vers la page des joueurs
    navigate('/players');
  };
  
  // Gérer l'annulation du formulaire
  const handleCancel = () => {
    navigate('/players');
  };
  
  return (
    <FormContainer>
      <FormTitle>Créer un nouveau joueur</FormTitle>
      
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
              {errors.prenom && <ErrorMessage>{errors.prenom}</ErrorMessage>}
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
              {errors.nom && <ErrorMessage>{errors.nom}</ErrorMessage>}
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
              {errors.numero && <ErrorMessage>{errors.numero}</ErrorMessage>}
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
          {errors.equipeId && <ErrorMessage>{errors.equipeId}</ErrorMessage>}
        </FormGroup>
        
        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>Taille (cm)</Label>
              <Input 
                type="number" 
                name="taille" 
                value={formData.taille} 
                onChange={handleChange} 
                placeholder="Entrez la taille du joueur en cm"
                min="100"
                max="250"
              />
              {errors.taille && <ErrorMessage>{errors.taille}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
          
          <FormColumn>
            <FormGroup>
              <Label>Poids (kg)</Label>
              <Input 
                type="number" 
                name="poids" 
                value={formData.poids} 
                onChange={handleChange} 
                placeholder="Entrez le poids du joueur en kg"
                min="40"
                max="200"
              />
              {errors.poids && <ErrorMessage>{errors.poids}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
        </FormRow>
        
        <FormGroup>
          <Label>Date de naissance</Label>
          <Input 
            type="date" 
            name="dateNaissance" 
            value={formData.dateNaissance} 
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
        
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>Annuler</CancelButton>
          <SubmitButton type="submit">Créer le joueur</SubmitButton>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default PlayerCreateForm;
