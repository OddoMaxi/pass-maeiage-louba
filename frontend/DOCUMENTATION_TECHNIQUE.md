# Documentation Technique - PASS.MAEGE

## Vue d'ensemble technique

PASS.MAEGE est une application web frontend développée avec Vue.js 3, TypeScript et Tailwind CSS. Cette documentation technique détaille l'architecture, les composants et les fonctionnalités de l'application pour faciliter sa maintenance et son évolution.

## Table des matières

1. [Architecture et structure](#architecture-et-structure)
2. [Composants principaux](#composants-principaux)
3. [Système de routage](#système-de-routage)
4. [Internationalisation (i18n)](#internationalisation-i18n)
5. [Formulaire multi-étapes](#formulaire-multi-étapes)
6. [Gestion des états](#gestion-des-états)
7. [Styles et UI](#styles-et-ui)
8. [Bonnes pratiques et conventions](#bonnes-pratiques-et-conventions)
9. [Tests et qualité](#tests-et-qualité)
10. [Déploiement](#déploiement)

## Architecture et structure

### Vue d'ensemble de l'architecture

L'application suit une architecture modulaire basée sur des composants Vue.js 3 avec la Composition API et TypeScript pour un typage fort.

### Structure des dossiers

```
src/
├── assets/           # Ressources statiques (images, CSS)
├── components/       # Composants réutilisables
├── i18n/             # Fichiers de traduction
├── pages/            # Composants de page
├── router/           # Configuration des routes
├── App.vue           # Composant racine
└── main.ts           # Point d'entrée de l'application
```

### Flux de données

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  Composants │◄────►│  État local │◄────►│  API (futur)│
│             │      │  (reactive) │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

## Composants principaux

### Composants de base

| Composant | Description | Responsabilités |
|-----------|-------------|-----------------|
| `App.vue` | Composant racine | Structure globale, routage |
| `Navbar.vue` | Barre de navigation | Navigation, changement de langue |
| `Footer.vue` | Pied de page | Liens utiles, changement de langue |

### Pages principales

| Page | Description | Fonctionnalités |
|------|-------------|----------------|
| `Home.vue` | Page d'accueil | Présentation de la plateforme |
| `Login.vue` | Page de connexion | Authentification utilisateur |
| `Payments.vue` | Formulaire de paiement | Processus multi-étapes de demande |
| `HowToApply.vue` | Guide d'utilisation | Instructions pour les utilisateurs |
| `FAQ.vue` | Questions fréquentes | Informations d'aide |
| `Support.vue` | Assistance | Formulaire de contact |

## Système de routage

Le routage est géré par Vue Router configuré dans `src/router/index.ts`.

### Routes principales

```typescript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/payments',
    name: 'Payments',
    component: Payments
  },
  // Autres routes...
]
```

## Internationalisation (i18n)

L'application utilise Vue I18n pour la gestion des traductions en français et en anglais.

### Configuration

Le système i18n est configuré dans `src/main.ts` et utilise les fichiers de traduction dans `src/i18n/`.

### Structure des fichiers de traduction

Les fichiers de traduction (`fr.json` et `en.json`) sont organisés par sections correspondant aux différentes parties de l'application :

```json
{
  "nav": { ... },
  "home": { ... },
  "payments": { ... },
  "login": { ... },
  "footer": { ... }
}
```

### Utilisation dans les composants

```vue
<template>
  <h1>{{ $t('payments.title') }}</h1>
</template>
```

## Formulaire multi-étapes

Le formulaire de paiement dans `Payments.vue` est implémenté comme un processus multi-étapes avec gestion d'état réactif.

### Structure des étapes

1. **Étape 1** : Informations personnelles (nom, prénom)
2. **Étape 2** : Date de naissance (jour, mois, année)
3. **Étape 3** : Genre
4. **Étape 4** : Lieu d'enrôlement (pays, ambassade)
5. **Étape 5** : Validité du passeport (5 ou 10 ans)
6. **Étape 6** : Résumé et confirmation

### Gestion de l'état

```typescript
// État du formulaire
const currentStep = ref(1)
const infoConfirmed = ref(false)

// Données du formulaire
const formData = reactive({
  firstName: 'OUSMANE',
  lastName: 'DOUMBOUYA',
  day: '02',
  month: 'Janvier',
  year: '1983',
  gender: 'Homme',
  country: 'FRANCE',
  embassy: 'PARIS',
  passportValidity: '5 ans'
})
```

### Navigation entre les étapes

```typescript
// Fonctions de navigation
function goBack() {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.push('/')
  }
}

function goNext() {
  if (currentStep.value < 6) {
    currentStep.value++
  } else if (infoConfirmed.value) {
    // Soumission finale du formulaire
    console.log('Données finales du formulaire:', formData)
    // Simulation d'un appel API pour le paiement
    alert('Paiement en cours de traitement...')
  }
}
```

### Indicateur de progression

L'indicateur de progression est implémenté avec des classes conditionnelles Tailwind CSS :

```html
<div class="h-1 w-16" :class="{ 'bg-green-600': currentStep >= 1, 'bg-gray-300': currentStep < 1 }"></div>
```

## Gestion des états

### Composition API

L'application utilise la Composition API de Vue 3 pour une meilleure organisation du code et une gestion plus claire des états.

### Réactivité

Les états réactifs sont gérés avec `ref` et `reactive` :

```typescript
import { ref, reactive } from 'vue'

// Valeurs simples avec ref
const currentStep = ref(1)

// Objets complexes avec reactive
const formData = reactive({
  firstName: 'OUSMANE',
  lastName: 'DOUMBOUYA'
})
```

## Styles et UI

### Tailwind CSS

L'application utilise Tailwind CSS pour un design responsive et cohérent.

### Classes principales

| Composant | Classes Tailwind | Description |
|-----------|------------------|-------------|
| Conteneurs | `max-w-4xl mx-auto py-6 px-4` | Conteneur principal centré |
| Boutons primaires | `px-6 py-2 bg-green-600 text-white rounded-md` | Bouton d'action principal |
| Boutons secondaires | `px-6 py-2 border border-gray-300 rounded-md text-gray-700` | Bouton d'action secondaire |
| Champs de formulaire | `w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500` | Champ de saisie |
| Alertes | `bg-amber-50 border border-amber-300 rounded-md p-4` | Message d'avertissement |

### Responsive design

L'application est conçue pour s'adapter à différentes tailles d'écran :

```html
<div class="flex flex-wrap gap-4">
  <div class="flex-1 min-w-[120px]">
    <!-- Contenu -->
  </div>
</div>
```

## Bonnes pratiques et conventions

### Conventions de nommage

- **Composants** : PascalCase (ex: `Navbar.vue`, `Footer.vue`)
- **Fichiers JavaScript/TypeScript** : camelCase
- **Classes CSS** : kebab-case ou classes Tailwind
- **Clés i18n** : camelCase avec points (ex: `payments.title`)

### Structure des composants

```vue
<template>
  <!-- Template HTML -->
</template>

<script setup lang="ts">
// Imports
import { ref, reactive } from 'vue'

// État et logique

// Fonctions et méthodes
</script>
```

### Documentation du code

Les fonctions et composants importants sont documentés avec des commentaires explicatifs :

```typescript
/**
 * Gère la navigation vers l'étape suivante du formulaire
 * Sauvegarde les données de l'étape actuelle et passe à l'étape suivante
 * À la dernière étape, soumet le formulaire si les informations sont confirmées
 */
function goNext() {
  // Implémentation...
}
```

## Tests et qualité

### Tests unitaires (à implémenter)

Recommandations pour les tests avec Vitest ou Jest :

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Payments from '../src/pages/Payments.vue'

describe('Payments.vue', () => {
  it('affiche le titre correct', () => {
    const wrapper = mount(Payments)
    expect(wrapper.find('h1').text()).toContain('Paiement du passeport')
  })
})
```

### Linting et formatage

Configuration recommandée pour ESLint et Prettier dans le projet.

## Déploiement

### Build de production

```bash
npm run build
```

Cette commande génère une version optimisée de l'application dans le dossier `dist/`.

### Déploiement sur un serveur

Les fichiers générés dans le dossier `dist/` peuvent être déployés sur n'importe quel serveur web statique.

### Intégration continue (recommandation)

Configuration recommandée pour GitHub Actions pour automatiser les tests et le déploiement.

---

## Annexes

### Dépendances principales

| Dépendance | Version | Utilisation |
|------------|---------|-------------|
| Vue.js | 3.x | Framework frontend |
| TypeScript | 4.x | Typage statique |
| Vue Router | 4.x | Routage |
| Vue I18n | 9.x | Internationalisation |
| Tailwind CSS | 3.x | Styles et UI |
| Vite | 2.x | Bundler et serveur de développement |

### Ressources et documentation

- [Documentation Vue.js](https://vuejs.org/)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Vue Router](https://router.vuejs.org/)
- [Documentation Vue I18n](https://vue-i18n.intlify.dev/)

---

© 2025 PASS.MAEGE - Documentation Technique
