# Ultimate Marvel Quiz

Une application de quiz interactive sur l'univers Marvel développée avec React.js. L'application permet aux utilisateurs de tester leurs connaissances sur l'univers Marvel à travers différents niveaux de difficulté.

## Fonctionnalités

-  **Authentification complète**
  - Inscription et connexion des utilisateurs
  - Récupération de mot de passe
  - Déconnexion
- 🎮 **Quiz à plusieurs niveaux**
  - 4 niveaux de difficulté : Débutant, Confirmé, Expert, Ultime
  - 10 questions par niveau
  - Progression automatique entre les niveaux
- **Interface utilisateur réactive**
  - Barre de progression
  - Animations personnalisées
  - Design responsive
  - Feedback instantané sur les réponses
-  **Système de score**
  - Calcul du pourcentage de réussite
  - Affichage des réponses correctes
  - Progression conditionnelle (60% minimum pour passer au niveau suivant)

## Technologies utilisées

- React.js
- Firebase (Authentication & Firestore)
- React Router
- React Icons
- React Toastify
- React Stepper Horizontal
- CSS personnalisé

## Installation

1. Clonez le repository :
\`\`\`bash
git clone https://github.com/votre-username/ultimate-marvel-quiz.git
\`\`\`

2. Installez les dépendances :
\`\`\`bash
cd ultimate-marvel-quiz
npm install
\`\`\`

3. Créez un fichier `.env` à la racine du projet et ajoutez vos configurations Firebase :
\`\`\`env
REACT_APP_FIREBASE_API_KEY=votre_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=votre_auth_domain
REACT_APP_FIREBASE_PROJET_ID=votre_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=votre_app_id
\`\`\`

4. Démarrez l'application :
\`\`\`bash
npm start
\`\`\`

## Structure du projet

\`\`\`
ultimate-marvel-quiz/
│
├── public/
│   ├── index.html
│   └── ...assets
│
├── src/
│   ├── components/
│   │   ├── APP/
│   │   ├── Firebase/
│   │   ├── Quiz/
│   │   ├── QuizOver/
│   │   └── ...autres composants
│   │
│   ├── images/
│   ├── App.css
│   └── index.js
│
└── firebase.json
\`\`\`

## Configuration Firebase

L'application utilise Firebase pour :
- L'authentification des utilisateurs
- Le stockage des données utilisateurs
- Le déploiement de l'application

Assurez-vous de configurer votre projet Firebase et de mettre à jour les variables d'environnement en conséquence.

## Déploiement

Pour déployer l'application sur Firebase Hosting :

\`\`\`bash
npm run build
firebase deploy
\`\`\`

## Auteur

- @Semiou Yessoufou - 2022


## Remerciements

- Les icônes Wolverine, Iron-man, Spider-man, Batman sont issues de iconFinder.com
