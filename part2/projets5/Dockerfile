# Étape 1 : Utilisation de Maven pour construire le projet
FROM maven:3.8.5-openjdk-17 

# Définit le répertoire de travail dans l'étape de construction
WORKDIR /app

# Copie les fichiers du projet dans le conteneur
COPY . .

# Exécute la commande Maven pour construire le JAR
RUN mvn clean package -DskipTests

# Expose le port 8080
EXPOSE 8080

# Commande pour exécuter l'application Spring Boot
ENTRYPOINT ["java", "-jar", "target/projets5-0.0.1-SNAPSHOT.jar"]
