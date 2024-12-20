# Étape 1 : Build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app

# Copie les fichiers CSPROJ
COPY ./*.csproj .
RUN dotnet restore

# Copie tout le code source
COPY . .

# Crée le dossier de sortie et publie
RUN mkdir -p /out && dotnet publish -c Release -o /out

# Vérifie les fichiers générés
RUN ls -la /out

# Étape 2 : Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build /out .

# Expose le port
EXPOSE 5015

# Commande pour démarrer l'application
ENTRYPOINT ["dotnet", "userboard.dll"]