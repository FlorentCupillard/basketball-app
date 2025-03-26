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
- **Persistance des données** : Sauvegarde des données via JSON Server

## Prérequis

- Node.js (version 20.18.0 ou supérieure recommandée)
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

3. **Lancer l'application avec JSON Server (recommandé)**

```bash
npm run dev
```

Cette commande démarre simultanément l'application React (port 3000) et JSON Server (port 3001) pour la persistance des données.

4. **Ou lancer uniquement l'application React (sans persistance)**

```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Persistance des données avec JSON Server

L'application utilise JSON Server pour la persistance des données. Voici comment cela fonctionne :

1. **Structure des données** : Toutes les données sont stockées dans le fichier `data/db.json`
2. **API REST** : JSON Server expose une API REST sur le port 3001
3. **Interface de visualisation** : Vous pouvez accéder directement aux données via http://localhost:3001
4. **Endpoints disponibles** :
   - `http://localhost:3001/teams` - Gestion des équipes
   - `http://localhost:3001/players` - Gestion des joueurs
   - `http://localhost:3001/games` - Gestion des matchs
   - `http://localhost:3001/events` - Gestion des événements (tirs, passes, etc.)

Pour lancer uniquement le serveur JSON :

```bash
npm run server
```

## Structure du projet

```
basketball-app/
├── data/                   # Données JSON pour la persistance
│   └── db.json            # Base de données JSON Server
├── public/                 # Fichiers statiques
├── src/                    # Code source
│   ├── api/                # Services API pour JSON Server
│   ├── components/         # Composants React
│   │   ├── court/         # Composants liés au terrain et aux tirs
│   │   ├── games/         # Composants liés aux matchs
│   │   ├── players/       # Composants liés aux joueurs
│   │   └── teams/         # Composants liés aux équipes
│   ├── store/              # État global (Redux)
│   │   └── slices/        # Slices Redux pour chaque entité
│   ├── App.js              # Composant principal
│   └── index.js            # Point d'entrée
└── package.json            # Dépendances et scripts
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
4. Pour terminer le match :
   - Cliquez sur le bouton "Terminer le match"
   - Le score final et les statistiques des joueurs seront enregistrés

### Visualisation des tirs

1. Accédez à la section "Carte des Tirs" via le menu principal
2. Utilisez les filtres pour sélectionner les joueurs, matchs, périodes, etc.
3. Les tirs s'affichent sur le terrain (verts pour réussis, rouges pour manqués)
4. Les statistiques de tir s'affichent en dessous du terrain

### Consultation des statistiques des joueurs

1. Accédez à la page de détails d'un match
2. Cliquez sur l'onglet "Joueurs"
3. Les statistiques complètes de chaque joueur pour ce match sont affichées

## Déploiement

Pour déployer l'application en production :

```bash
npm run build
```

Cette commande crée un dossier `build` avec les fichiers optimisés pour la production. Vous pouvez ensuite déployer ce dossier sur n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, etc.).

Pour la persistance des données en production, vous devrez configurer un serveur JSON Server ou migrer vers une solution de base de données plus robuste.

## Technologies utilisées

- React
- Redux (avec Redux Toolkit)
- React Router
- Styled Components
- React Icons
- JSON Server (pour la persistance des données)

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.
