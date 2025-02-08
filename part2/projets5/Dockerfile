# Étape 1 : Image Maven pour le développement
FROM maven:3.8.5-openjdk-17

WORKDIR /app2

# Copier seulement pom.xml pour le cache des dépendances
COPY pom.xml ./

# Télécharger les dépendances sans construire
RUN mvn dependency:go-offline -B

# Copier le reste du code source
COPY . .

# Exposer le port de l'application
EXPOSE 8080

# Lancer Spring Boot en mode développement
ENTRYPOINT ["mvn", "spring-boot:run"]
