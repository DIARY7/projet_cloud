# Étape 1 : Construction avec Maven
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app2

# Monte seulement les fichiers nécessaires pour télécharger les dépendances
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copie tout le projet après les dépendances
COPY . . 
RUN mvn clean package -DskipTests

# Étape 2 : Image légère pour exécution
FROM openjdk:17-jdk-slim

WORKDIR /app2

COPY --from=build /app2/target/projets5-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
