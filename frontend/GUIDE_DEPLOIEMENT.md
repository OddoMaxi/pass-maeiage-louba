# Guide de Déploiement - PASS.MAEGE

## Introduction

Ce document détaille les procédures de déploiement de l'application PASS.MAEGE dans différents environnements. Il est destiné aux équipes techniques responsables de l'installation, de la configuration et de la maintenance de l'application.

## Table des matières

1. [Prérequis](#prérequis)
2. [Environnements de déploiement](#environnements-de-déploiement)
3. [Installation et configuration](#installation-et-configuration)
4. [Déploiement manuel](#déploiement-manuel)
5. [Déploiement automatisé](#déploiement-automatisé)
6. [Configuration post-déploiement](#configuration-post-déploiement)
7. [Surveillance et maintenance](#surveillance-et-maintenance)
8. [Procédures de rollback](#procédures-de-rollback)
9. [Contacts et support](#contacts-et-support)

## Prérequis

### Exigences système

| Composant | Version minimale |
|-----------|------------------|
| Node.js | 16.x ou supérieur |
| npm | 8.x ou supérieur |
| Git | 2.30.x ou supérieur |
| Serveur web | Nginx 1.20+ ou Apache 2.4+ |

### Dépendances externes

- Accès au dépôt Git (GitHub)
- Accès aux services de déploiement (si applicable)
- Certificats SSL pour les environnements de production et de test

## Environnements de déploiement

### Développement local

- **Objectif** : Développement et tests locaux
- **URL** : http://localhost:5173
- **Configuration** : Mode développement avec hot-reload

### Environnement de test

- **Objectif** : Tests d'intégration et validation
- **URL** : https://test.pass-maege.gov.gn (exemple)
- **Configuration** : Build de production avec données de test

### Environnement de production

- **Objectif** : Application en ligne pour les utilisateurs finaux
- **URL** : https://pass-maege.gov.gn (exemple)
- **Configuration** : Build de production optimisé

## Installation et configuration

### Clonage du dépôt

```bash
# Cloner le dépôt
git clone https://github.com/OddoMaxi/pass-maeiage-louba.git

# Accéder au répertoire du projet
cd pass-maege-front/frontend
```

### Installation des dépendances

```bash
# Installer les dépendances
npm install
```

### Configuration des variables d'environnement

Créer un fichier `.env.local` à la racine du projet frontend avec les variables appropriées selon l'environnement :

```
# Exemple pour l'environnement de développement
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development

# Exemple pour l'environnement de production
# VITE_API_URL=https://api.pass-maege.gov.gn
# VITE_ENV=production
```

## Déploiement manuel

### Build de l'application

```bash
# Générer la version de production
npm run build
```

Cette commande crée un dossier `dist` contenant les fichiers statiques optimisés pour la production.

### Déploiement sur un serveur web

#### Nginx

1. Copier les fichiers du dossier `dist` vers le répertoire de votre serveur web :

```bash
scp -r dist/* user@server:/var/www/pass-maege/
```

2. Configurer Nginx :

```nginx
server {
    listen 80;
    server_name pass-maege.gov.gn;
    
    # Redirection vers HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name pass-maege.gov.gn;
    
    # Configuration SSL
    ssl_certificate /etc/ssl/certs/pass-maege.crt;
    ssl_certificate_key /etc/ssl/private/pass-maege.key;
    
    # Répertoire racine
    root /var/www/pass-maege;
    index index.html;
    
    # Gestion du routage SPA
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache pour les ressources statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
    
    # En-têtes de sécurité
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Frame-Options DENY;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://api.pass-maege.gov.gn;";
}
```

3. Redémarrer Nginx :

```bash
sudo systemctl restart nginx
```

#### Apache

1. Copier les fichiers du dossier `dist` vers le répertoire de votre serveur web :

```bash
scp -r dist/* user@server:/var/www/pass-maege/
```

2. Configurer Apache avec un fichier `.htaccess` dans le répertoire racine :

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Cache pour les ressources statiques
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/svg+xml "access plus 1 month"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# En-têtes de sécurité
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set X-Frame-Options "DENY"
  Header set Content-Security-Policy "default-src 'self'; script-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://api.pass-maege.gov.gn;"
</IfModule>
```

3. Redémarrer Apache :

```bash
sudo systemctl restart apache2
```

## Déploiement automatisé

### Configuration avec GitHub Actions

Créer un fichier `.github/workflows/deploy.yml` dans le dépôt :

```yaml
name: Deploy PASS.MAEGE

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v2
      
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Build
      run: |
        cd frontend
        npm run build
      env:
        VITE_API_URL: ${{ secrets.API_URL }}
        VITE_ENV: production
        
    - name: Deploy to server
      uses: easingthemes/ssh-deploy@v2.1.5
      env:
        SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
        ARGS: "-rltgoDzvO --delete"
        SOURCE: "frontend/dist/"
        REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
        REMOTE_USER: ${{ secrets.REMOTE_USER }}
        TARGET: ${{ secrets.REMOTE_TARGET }}
```

### Déploiement avec Netlify

1. Connectez-vous à votre compte Netlify
2. Cliquez sur "New site from Git"
3. Sélectionnez GitHub comme fournisseur Git
4. Sélectionnez le dépôt `pass-maeiage-louba`
5. Configurez les paramètres de build :
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
6. Configurez les variables d'environnement dans les paramètres du site
7. Cliquez sur "Deploy site"

## Configuration post-déploiement

### Vérifications post-déploiement

- Vérifier que l'application se charge correctement
- Tester la navigation entre les pages
- Vérifier que le formulaire multi-étapes fonctionne correctement
- Tester le changement de langue
- Vérifier que les liens externes fonctionnent

### Configuration des redirections

Si nécessaire, configurez des redirections pour les anciennes URLs ou pour gérer les erreurs 404 :

#### Nginx

```nginx
location /old-path {
    return 301 /new-path;
}

error_page 404 /index.html;
```

#### Apache

```apache
Redirect 301 /old-path /new-path
ErrorDocument 404 /index.html
```

## Surveillance et maintenance

### Outils de surveillance

- Google Analytics pour le suivi des utilisateurs
- Sentry.io pour la surveillance des erreurs frontend
- Uptime Robot pour la surveillance de la disponibilité

### Mises à jour et maintenance

1. **Mises à jour des dépendances** :
   ```bash
   npm update
   ```

2. **Vérification des vulnérabilités** :
   ```bash
   npm audit
   ```

3. **Procédure de mise à jour** :
   - Créer une branche de développement
   - Implémenter et tester les modifications
   - Fusionner dans la branche principale
   - Déployer via le processus automatisé

## Procédures de rollback

### Rollback manuel

1. Identifier la version précédente stable
2. Checkout de cette version dans Git
3. Reconstruire l'application
4. Déployer sur le serveur

```bash
git checkout v1.0.0
cd frontend
npm install
npm run build
# Déployer les fichiers du dossier dist
```

### Rollback avec GitHub Actions

1. Forcer un push de la version précédente sur la branche principale
2. Laisser le workflow de déploiement automatique s'exécuter

```bash
git checkout v1.0.0
git push origin HEAD:main --force
```

## Contacts et support

### Équipe technique

- **Développeur principal** : [Nom] - [email@example.com]
- **DevOps** : [Nom] - [email@example.com]
- **Administrateur système** : [Nom] - [email@example.com]

### Procédure d'escalade

1. Contacter le développeur principal pour les problèmes liés au code
2. Contacter l'administrateur système pour les problèmes d'infrastructure
3. En cas d'urgence critique, contacter tous les membres de l'équipe technique

---

© 2025 PASS.MAEGE - Guide de Déploiement
