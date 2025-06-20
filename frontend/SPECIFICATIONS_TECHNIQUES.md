# Spécifications Techniques - PASS.MAEGE

## Vue d'ensemble

Ce document détaille les spécifications techniques du projet PASS.MAEGE, une plateforme web bilingue dédiée au paiement et à la gestion des demandes de passeports guinéens.

## Table des matières

1. [Environnement technique](#environnement-technique)
2. [Architecture logicielle](#architecture-logicielle)
3. [Modèles de données](#modèles-de-données)
4. [API et intégrations](#api-et-intégrations)
5. [Sécurité](#sécurité)
6. [Performance](#performance)
7. [Compatibilité](#compatibilité)
8. [Internationalisation](#internationalisation)
9. [Accessibilité](#accessibilité)

## Environnement technique

### Frontend

| Technologie | Version | Description |
|-------------|---------|-------------|
| Vue.js | 3.2+ | Framework JavaScript progressif |
| TypeScript | 4.5+ | Superset JavaScript avec typage statique |
| Tailwind CSS | 3.0+ | Framework CSS utilitaire |
| Vue Router | 4.0+ | Routeur officiel pour Vue.js |
| Vue I18n | 9.0+ | Internationalisation pour Vue.js |
| Vite | 2.7+ | Outil de build et serveur de développement |

### Outils de développement

| Outil | Version | Description |
|-------|---------|-------------|
| ESLint | 8.0+ | Linter pour JavaScript/TypeScript |
| Prettier | 2.5+ | Formateur de code |
| Git | 2.30+ | Système de contrôle de version |
| npm | 8.0+ | Gestionnaire de paquets |

### Environnements de déploiement

| Environnement | Description | URL |
|---------------|-------------|-----|
| Développement | Environnement local | http://localhost:5173 |
| Test | Environnement de test | https://test.pass-maege.gov.gn |
| Production | Environnement de production | https://pass-maege.gov.gn |

## Architecture logicielle

### Architecture globale

L'application suit une architecture client-serveur avec un frontend Vue.js et un backend API (à implémenter).

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Client         │     │  Frontend       │     │  Backend API    │
│  (Navigateur)   │────▶│  (Vue.js)       │────▶│  (à implémenter)│
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Architecture frontend

Le frontend est structuré selon les principes de l'architecture par composants de Vue.js :

```
App.vue
 ├── Navbar.vue
 ├── RouterView
 │    ├── Home.vue
 │    ├── Login.vue
 │    ├── Payments.vue
 │    │    └── (Étapes du formulaire)
 │    ├── HowToApply.vue
 │    ├── FAQ.vue
 │    └── Support.vue
 └── Footer.vue
```

### Flux de données

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  Interface  │◄────►│  État local │◄────►│  API REST   │
│  utilisateur│      │  (reactive) │      │  (future)   │
└─────────────┘      └─────────────┘      └─────────────┘
```

## Modèles de données

### Modèle utilisateur

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Modèle de demande de passeport

```typescript
interface PassportApplication {
  id: string;
  userId: string;
  applicantFirstName: string;
  applicantLastName: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
  gender: 'Homme' | 'Femme';
  enrollmentLocation: {
    country: string;
    embassy: string;
  };
  passportValidity: '5 ans' | '10 ans';
  status: 'draft' | 'submitted' | 'paid' | 'processing' | 'ready' | 'delivered';
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Modèle de paiement

```typescript
interface Payment {
  id: string;
  applicationId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## API et intégrations

### Points d'API (à implémenter)

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/auth/login` | POST | Authentification utilisateur |
| `/api/auth/register` | POST | Création de compte |
| `/api/applications` | GET | Liste des demandes de l'utilisateur |
| `/api/applications` | POST | Création d'une nouvelle demande |
| `/api/applications/:id` | GET | Détails d'une demande |
| `/api/applications/:id` | PUT | Mise à jour d'une demande |
| `/api/payments` | POST | Création d'un paiement |
| `/api/payments/:id` | GET | Statut d'un paiement |

### Intégrations externes

#### Passerelles de paiement (à implémenter)

Intégration avec des services de paiement comme :
- Stripe
- PayPal
- Mobile Money (Orange Money, MTN Mobile Money)

#### Système de notification (à implémenter)

- Service d'envoi d'emails (SendGrid, Mailgun)
- Service d'envoi de SMS

## Sécurité

### Authentification

- Authentification par JWT (JSON Web Tokens)
- Expiration des tokens après 24 heures
- Refresh tokens pour renouvellement automatique

### Protection des données

- Validation des données côté client et serveur
- Échappement des données pour prévenir les attaques XSS
- Protection CSRF pour les requêtes POST

### Sécurité des communications

- HTTPS obligatoire sur tous les environnements
- En-têtes de sécurité HTTP (Content-Security-Policy, X-XSS-Protection, etc.)

## Performance

### Objectifs de performance

| Métrique | Objectif |
|----------|----------|
| Temps de chargement initial | < 2 secondes |
| First Contentful Paint | < 1 seconde |
| Time to Interactive | < 3 secondes |
| Score Lighthouse | > 90 |

### Optimisations

- Lazy loading des composants et routes
- Code splitting automatique avec Vite
- Mise en cache des ressources statiques
- Compression des assets (images, CSS, JS)

## Compatibilité

### Navigateurs supportés

| Navigateur | Version minimale |
|------------|------------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Opera | 76+ |

### Appareils supportés

- Ordinateurs de bureau (1024px et plus)
- Tablettes (768px à 1023px)
- Smartphones (320px à 767px)

## Internationalisation

### Langues supportées

- Français (langue principale)
- Anglais

### Structure des traductions

Les traductions sont organisées par domaines fonctionnels :

```
i18n/
├── fr.json
│   ├── nav: {}
│   ├── home: {}
│   ├── payments: {}
│   └── ...
└── en.json
    ├── nav: {}
    ├── home: {}
    ├── payments: {}
    └── ...
```

### Formats localisés

- Dates : format local selon la langue (DD/MM/YYYY pour le français, MM/DD/YYYY pour l'anglais)
- Nombres : séparateurs de milliers et décimales adaptés à la langue
- Devises : affichage selon les conventions locales

## Accessibilité

### Conformité

- Niveau de conformité visé : WCAG 2.1 niveau AA

### Fonctionnalités d'accessibilité

- Contraste de couleurs suffisant
- Textes alternatifs pour les images
- Navigation au clavier
- Structure sémantique HTML5
- ARIA landmarks et rôles

---

## Annexes

### Dépendances détaillées

Liste complète des dépendances npm avec leurs versions et descriptions.

### Conventions de code

- Indentation : 2 espaces
- Fins de ligne : LF (Unix-style)
- Quotes : simples pour JavaScript/TypeScript
- Semicolons : obligatoires
- Longueur maximale de ligne : 100 caractères

### Processus de build

```bash
# Installation des dépendances
npm install

# Développement avec hot-reload
npm run dev

# Build de production
npm run build

# Linting
npm run lint

# Tests (à implémenter)
npm run test
```

---

© 2025 PASS.MAEGE - Spécifications Techniques
