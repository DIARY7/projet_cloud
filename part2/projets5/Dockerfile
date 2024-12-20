# Étape 1 : Utilisation de Maven pour construire le projet
FROM maven:3.9.4-openjdk-17 AS build

# Définit le répertoire de travail dans l'étape de construction
WORKDIR /app

# Copie les fichiers du projet dans le conteneur
COPY . .

# Exécute la commande Maven pour construire le JAR
RUN mvn clean package -DskipTests

# Définit le répertoire de travail dans l'image finale
WORKDIR /app

# Copie le JAR généré de l'étape précédente
COPY --from=build /app/target/*.jar app.jar

# Expose le port 8080
EXPOSE 8080

# Commande pour exécuter l'application Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
