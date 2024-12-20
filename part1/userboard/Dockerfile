# Étape 1 : Build andFROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-runtime
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-runtime

WORKDIR /app
# Restaure les dépendances
RUN dotnet restore
# Copie tout le code source
COPY . ./

# Compile le projet
RUN dotnet build

# Expose le port
EXPOSE 5015

# Commande pour démarrer l'application avec dotnet run
CMD ["dotnet", "run", "--no-launch-profile", "--urls=http://0.0.0.0:5015"]