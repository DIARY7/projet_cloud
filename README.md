"# projet_cloud" 

## Lancement docker

Pour initialiser les applications:
```bash
    docker compose up --build -d
```

Pour lancer .net:
```bash
    docker exec -it dotnet_sdk /bin/bash
```

Pour lancer postgres:
```bash
    docker exec -it postgres_db psql -U backend -d cloud
```

Le lien pour l'api .net:
http://localhost:5000/