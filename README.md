# Application de Basketball

Une application React complète pour la gestion des matchs de basketball, des équipes, des joueurs et des statistiques, avec une visualisation des tirs sur le terrain.

![Visualisation des tirs sur le terrain](https://github.com/FlorentCupillard/basketball-app/raw/main/public/shot-chart-preview.png)

## Fonctionnalités

- **Visualisation des tirs sur le terrain** : Points verts pour les tirs réussis, rouges pour les manqués
- **Gestion des équipes** : Ajout, modification et suppression d'équipes
- **Gestion des joueurs** : Ajout, modification et suppression de joueurs avec leurs statistiques
- **Gestion des matchs** : Création, suivi en direct et visualisation des détails des matchs
- **Statistiques détaillées** : Suivi des points, rebonds, passes et autres statistiques par joueur et par match
- **Interface responsive** : Adaptée aux ordinateurs, tablettes et smartphones avec menu burger
- **Ajout de tirs en temps réel** : Possibilité d'ajouter des tirs pendant un match en les positionnant directement sur le terrain

## Prérequis

- Node.js (version 14.0.0 ou supérieure)
- npm (version 6.0.0 ou supérieure)

## Installation

1. **Cloner le dépôt**

```bash
git clone https://github.com/FlorentCupillard/basketball-app.git
cd basketball-app
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Lancer l'application en mode développement**

```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
basketball-app/
├── public/                  # Fichiers statiques
├── src/                     # Code source
│   ├── components/          # Composants React
│   │   ├── court/          # Composants liés au terrain et aux tirs
│   │   ├── games/          # Composants liés aux matchs
│   │   ├── players/        # Composants liés aux joueurs
│   │   └── teams/          # Composants liés aux équipes
│   ├── store/               # État global (Redux)
│   │   └── slices/         # Slices Redux pour chaque entité
│   ├── App.js               # Composant principal
│   └── index.js             # Point d'entrée
└── package.json             # Dépendances et scripts
```

## Guide d'utilisation

### Gestion des équipes

1. Accédez à la section "Équipes" via le menu principal
2. Cliquez sur "+ Ajouter" pour créer une nouvelle équipe
3. Remplissez le formulaire avec le nom de l'équipe et l'URL du logo
4. Cliquez sur "Enregistrer" pour créer l'équipe

### Gestion des joueurs

1. Accédez à la section "Joueurs" via le menu principal
2. Cliquez sur "+ Ajouter" pour créer un nouveau joueur
3. Remplissez le formulaire avec les informations du joueur (nom, prénom, numéro, poste, équipe)
4. Cliquez sur "Enregistrer" pour créer le joueur

### Création d'un match

1. Accédez à la section "Matchs" via le menu principal
2. Cliquez sur "+ Ajouter" pour créer un nouveau match
3. Sélectionnez les équipes participantes (locale et visiteur)
4. Définissez la date et l'heure du match
5. Cliquez sur "Créer" pour enregistrer le match

### Suivi d'un match en direct

1. Dans la liste des matchs, trouvez le match que vous souhaitez suivre
2. Cliquez sur "Commencer" ou "Suivre en direct"
3. Pour ajouter un tir :
   - Sélectionnez l'équipe et le joueur
   - Choisissez le type de tir (2 points ou 3 points)
   - Cliquez sur "Positionner le tir"
   - Cliquez sur le terrain à l'endroit où le tir a été effectué
   - Indiquez si le tir est réussi ou manqué

### Visualisation des tirs

1. Accédez à la section "Carte des Tirs" via le menu principal
2. Utilisez les filtres pour sélectionner les joueurs, matchs, périodes, etc.
3. Les tirs s'affichent sur le terrain (verts pour réussis, rouges pour manqués)
4. Les statistiques de tir s'affichent en dessous du terrain

## Déploiement

Pour déployer l'application en production :

```bash
npm run build
```

Cette commande crée un dossier `build` avec les fichiers optimisés pour la production. Vous pouvez ensuite déployer ce dossier sur n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, etc.).

## Technologies utilisées

- React
- Redux (avec Redux Toolkit)
- React Router
- Styled Components
- React Icons

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.
