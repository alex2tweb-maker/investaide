# Webycool invest aide projet

## 🚀 Déploiement

Ce projet est une application React moderne construite avec **Vite**.

### Instructions de déploiement universel :

1. **Générer les fichiers de production :**
   Exécutez la commande suivante dans votre terminal :
   ```bash
   npm run build
   ```
   Cela créera un dossier `dist` à la racine du projet.

2. **Hébergement :**
   Vous pouvez héberger le contenu du dossier `dist` sur n'importe quel service d'hébergement statique (Netlify, Vercel, Hostinger, etc.).
   - Téléchargez simplement le contenu du dossier `dist` ou l'archive ZIP du projet.
   - Assurez-vous de configurer la redirection des routes vers `index.html` si votre hébergeur le demande (souvent appelé "SPA fallback").

## 🔑 Variables d'Environnement

N'oubliez pas de configurer vos variables d'environnement sur votre hébergeur (voir `.env.example`) :

- `AIRTABLE_TOKEN`
- `AIRTABLE_APP_ID`
- `MAKE_WEBHOOK_URL`

## 🛠️ Développement Local

1. Installez les dépendances : `npm install`
2. Lancez le serveur de développement : `npm run dev`
