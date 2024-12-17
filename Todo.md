# PROJET CLOUD

## MEMBRES

- RAMPANANA Amboara Holisoa ETU2753
- RAMAVO HARINAIVO Ny Ony Fanantenana ETU2547
- RAJOSOA Tsiory Diary Luc ETU2665
- ANDRIAMANDROSO Hery Ny Avo ETU2377

## TO DO LIST PARTIE I

   - FONCTIONNALITES:
      1. Inscription
      2. Authentification multifacteur (confirmation pin sur email)
      3. Gestion des roles (ex: admin, simple, etc)
      4. Gestion du compte pour l'utilisateur (suppression, modification)
      5. Durée de vie des sessions (paramétrables)
      6. Hashing sécurisé des mots de passes
      7. Limite de nombre de tentatives de connexion (réinitialisation via email)
      8. Documentation API via Swagger


   - TABLES:
      1. Roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
       );

      2. Users (
        id SERIAL PRIMARY KEY, 
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        pwd VARCHAR(255) NOT NULL,
        n_attempt INT DEFAULT 0,
        last_attempt TIMESTAMP,
        role_id INTEGER REFERENCES Roles(id) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
       );

      3. Tokens (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id),
        token VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP -- 90 secondes apres created_at
       );

    -TACHES:

       - Initialisation des applications docker [Ony]
       - Initialisation du git [Diary]
       - Initialisation base & modeles (Roles, Users, Tokens) [Amboara]
       - MCD (looping) [Ony]
       - sendTo(email,html_content) [Amboara]
       - Initialisation des controllers (UsersController) [Ny Avo]
         - generatePin()
         - generateToken()
         - verifyToken(token)
         - hash(password)

## SCENARIOS D'UTILISATION

   ### Inscription
   - Saisie des informations de l'utilisateur
   - Controle des valeurs:
     - informations non-null & respect typages
     - email unique
   - Envoi du code pin par email
   - Vérification du code pin
     - ! si incorrect => renvoi du pin
   - Insertion utilisateur
  
  ### Authentification multifacteur
   - Saisie de l'email + mot de passe
   - Controle des valeurs:
     - informations non-null & respect typages
     - email existant
     - si last_attempt non-null
     - mot de passe correct
       - ! si incorrect => n_attempt ++
       - ! si n_attempt > 3 => initialisation last_attempt et renvoi lien réinitialisation de n_attempt
   - Envoi du code pin par email
   - Vérification du code pin
       - ! si incorrect => n_attempt ++ et renvoi du pin
       - ! si n_attempt > 3 => initialisation last_attempt et renvoi lien réinitialisation de n_attempt   
   - Création du token
   - Réinitialisation n_attempt (0) et last_attempt (null) 
  
  ### Gestion du compte
   - Modification: 
     1. Mot de passe
      - lien de réinitialisation par email
      - saisie nouveau mot de passe
       - ! si mot de passe non-réinitialisé => erreur

     2. Autres informations
      - saisie nouvelles infos (respect typages)

   - Suppression
  