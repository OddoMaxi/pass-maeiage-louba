# PASS.MAEGE - Plateforme de Paiement du Passeport Guinéen

![Logo PASS.MAEGE](frontend/public/gin.png)

## Présentation du projet

PASS.MAEGE est une plateforme web bilingue (français/anglais) dédiée au paiement et à la gestion des demandes de passeports guinéens. Cette application permet aux utilisateurs de soumettre leurs informations personnelles, de payer les frais de passeport en ligne et de suivre l'état de leur demande.

## Table des matières

1. [Architecture technique](#architecture-technique)
2. [Structure du projet](#structure-du-projet)
3. [Fonctionnalités principales](#fonctionnalités-principales)
4. [Installation et déploiement](#installation-et-déploiement)
5. [Guide d'utilisation](#guide-dutilisation)
6. [Internationalisation](#internationalisation)
7. [Sécurité](#sécurité)
8. [Maintenance et évolution](#maintenance-et-évolution)

## Architecture technique

### Technologies utilisées

- **Frontend** :
  - Vue.js 3 avec Composition API
  - TypeScript
  - Tailwind CSS pour le design responsive
  - Vue Router pour la navigation
  - Vue I18n pour l'internationalisation

- **Outils de développement** :
  - Vite.js comme bundler
  - ESLint pour la qualité du code
  - Git pour le versionnement

### Schéma d'architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client         │     │  Frontend       │     │  Backend API    │
│  (Navigateur)   │────▶│  (Vue.js)       │────▶│  (à implémenter)│
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Structure du projet

```
pass-maege-front/
├── frontend/              # Code source du frontend
│   ├── public/            # Fichiers statiques
│   ├── src/               # Code source Vue.js
│   │   ├── assets/        # Images et ressources
│   │   ├── components/    # Composants réutilisables
│   │   ├── i18n/          # Fichiers de traduction
│   │   ├── pages/         # Composants de page
│   │   ├── router/        # Configuration des routes
│   │   ├── App.vue        # Composant racine
│   │   └── main.ts        # Point d'entrée
│   ├── index.html         # Template HTML
│   ├── package.json       # Dépendances
│   └── vite.config.ts     # Configuration Vite
└── README.md              # Documentation
```

## Fonctionnalités principales

### 1. Authentification et gestion des utilisateurs

- Page de connexion bilingue
- Gestion des sessions utilisateur
- Récupération de mot de passe (à implémenter)

### 2. Processus de demande de passeport

Le formulaire multi-étapes de demande de passeport comprend :

1. **Informations personnelles** : Nom et prénom du demandeur
2. **Date de naissance** : Sélection du jour, mois et année
3. **Genre** : Sélection du genre du demandeur
4. **Lieu d'enrôlement** : Sélection du pays et de l'ambassade/consulat
5. **Validité du passeport** : Choix entre 5 ans (153.54 USD) et 10 ans (307.08 USD)
6. **Résumé et confirmation** : Vérification des informations avant paiement

### 3. Système de paiement

- Intégration avec des passerelles de paiement (à implémenter)
- Historique des paiements
- Reçus électroniques

### 4. Navigation et interface utilisateur

- Design responsive adapté à tous les appareils
- Navigation intuitive avec barre de progression
- Composants réutilisables (Navbar, Footer)

## Installation et déploiement

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Git

### Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/OddoMaxi/pass-maeiage-louba.git
   cd pass-maege-front/frontend
   ```

2. Installer les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Lancer l'application en mode développement :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Construire pour la production :
   ```bash
   npm run build
   # ou
   yarn build
   ```

## Guide d'utilisation

### Navigation générale

- **Accueil** : Présentation de la plateforme
- **Paiement** : Accès au formulaire multi-étapes
- **Comment procéder** : Guide d'utilisation
- **FAQ** : Questions fréquemment posées
- **Support** : Assistance utilisateur
- **Connexion** : Authentification utilisateur

### Processus de paiement

1. Accéder à la page "Paiement"
2. Remplir les informations personnelles (nom, prénom)
3. Indiquer la date de naissance
4. Sélectionner le genre
5. Choisir le lieu d'enrôlement
6. Sélectionner la durée de validité du passeport
7. Vérifier le récapitulatif des informations
8. Confirmer et procéder au paiement

## Internationalisation

L'application est entièrement bilingue (français/anglais) grâce à l'utilisation de Vue I18n. Les traductions sont stockées dans des fichiers JSON dans le dossier `src/i18n/`.

### Structure des fichiers de traduction

- `fr.json` : Traductions françaises
- `en.json` : Traductions anglaises

### Ajout de nouvelles traductions

Pour ajouter une nouvelle clé de traduction :

1. Ajouter la clé et sa valeur dans les fichiers `fr.json` et `en.json`
2. Utiliser la clé dans les composants avec la syntaxe `{{ $t('cle.de.traduction') }}`

## Sécurité

### Bonnes pratiques implémentées

- Validation des données côté client
- Messages d'erreur informatifs
- Protection contre les attaques XSS via l'échappement automatique de Vue

### Recommandations pour le backend (à implémenter)

- Authentification sécurisée (JWT, OAuth)
- Chiffrement des données sensibles
- Validation des données côté serveur
- Protection CSRF
- Rate limiting

## Maintenance et évolution

### Améliorations futures

1. **Fonctionnalités** :
   - Intégration avec des API de paiement réelles
   - Système de notifications par email/SMS
   - Suivi de l'état de la demande
   - Téléchargement de documents

2. **Technique** :
   - Tests unitaires et d'intégration
   - CI/CD pour le déploiement automatique
   - Optimisation des performances
   - PWA pour utilisation hors ligne

### Gestion des versions

Le projet suit la gestion sémantique des versions (Semantic Versioning) :
- **MAJOR** : Changements incompatibles avec les versions précédentes
- **MINOR** : Ajout de fonctionnalités rétrocompatibles
- **PATCH** : Corrections de bugs rétrocompatibles

---

© 2025 PASS.MAEGE - Tous droits réservés
