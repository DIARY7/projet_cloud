# Étape 1 : Construire l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app3

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install
 
# Copier le reste des fichiers
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Servir les fichiers avec Nginx
FROM nginx:1.23-alpine

# Copier les fichiers construits dans Nginx
COPY --from=builder /app3/dist /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
