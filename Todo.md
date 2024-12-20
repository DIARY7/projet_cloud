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
        -- role_id INTEGER REFERENCES Roles(id) NOT NULL,
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
    
    !! format des données retournées par l'api = { 'status': 'success/failed', 'datas': 'null/table/object/etc', 'error': 'null/message/etc'} 

       Done - Initialisation du git [Diary]
       Done - Initialisation des applications docker (environnement) [Ony]
       Done - Initialisation base & modeles (Roles, Users, Tokens) [all]
       Done - MCD (looping) [Ony]
       Done - Implémentation des fonctions utilitaires (dans Utils)
        [Amboara] 
        1. Generator
         - string GeneratePin()
         - string GenerateToken()
        2. Hasher
         - string HashString(password)
        3. EmailService 
         - void SendEmail(email,sujet,html_content)
         [Ony] 
         - string GetPinHtml(pin)
         - string GetResetAttemptHtml(link)
         - string GetResetPwdHtml(link)
        4. MultiAuthCache
         - classe Utils.UserCacheInfo (fields: User, ExpectedPin)
         - void AddUserToCache(UserCacheInfo userCacheInfo)
         - UserCacheInfo GetUserFromCache(string email)
         - void RemoveUserFromCache(string email)
         - bool ValidatePin(string email, string pinToCompare)
       Done - Initialisation UsersController 
        [Diary,Ony] 
         - inscription 
           - (route: api/Users, method: POST) CreateUserToCache(User user)
           - classe Dto.PinSent (fields: Email, Pin, ExpiresTokenSeconds)
           - (route: api/Users/confirm, method: POST)  ValidateUser(PinSent pinSent)
        [Ony] 
         - authentification 
           - (route: api/Users/login, method: POST) Login(LoginResponse loginJson)
           - (route: api/Users/confirmLogin, method: POST) ValidateLogin(PinSent pinSent)
           - (route: api/Users/reset-attempts, method: GET) ResetAttempts(string email)
        [NyAvo] 
         - modification 
           - (route: api/Users, method: PUT) UpdateUser(User userModified)
           - (route: api/Users/reinitialise, method: POST) ReinitialisePwd(string email,string link)
           - (route: api/Users/validateReintialise, method: POST) ValidatePwd(string email,string mdp)
       Done - Liens Swaggers [Diary]


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
     - mot de passe correct
       - ! si incorrect => n_attempt ++
       - ! si n_attempt > 3 => envoi lien réinitialisation de n_attempt
   - Envoi du code pin par email
   - Vérification du code pin
       - ! si incorrect => n_attempt ++ et renvoi du pin
       - ! si n_attempt > 3 => envoi lien réinitialisation de n_attempt   
   - Création du token
   - Réinitialisation n_attempt (0) 
  
  ### Gestion du compte
   - Modification
   - Suppression
  
## TO DO LIST PARTIE II

  - TABLES
     1. Cryptos (
        id SERIAL PRIMARY KEY,
        name CHAR(3) NOT NULL 
       );

     2. Devises (
       id SERIAL PRIMARY KEY,
       name CHAR(3) NOT NULL 
      );

     3. Conversions(
      id SERIAL PRIMARY KEY,
      value NUMERIC(18,2),
      crypto_id INTEGER REFERENCES Cryptos(id),
      devise_id INTEGER REFERENCES Devises(id)
      ); 

     4. Transaction_Crypto(
      id SERIAL PRIMARY KEY,
      date_transaction TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      entree NUMERIC default 0,
      sortie NUMERIC default 0,
      crypto_id INTEGER REFERENCES Cryptos(id),
      user_id INTEGER REFERENCES Users(id),
      montant NUMERIC default 0,
      );

     5. Transaction_Fond(
      id SERIAL PRIMARY KEY,
      date_transaction TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      entree NUMERIC default 0,
      sortie NUMERIC default 0,
      user_id INTEGER REFERENCES Users(id)
      );

    - VUES:
      - Portefeuille_Fond (user_id, montant) 
      - Portefeuille_Crypto (user_id, montant, cryptos)
      - Portefeuille_General (user_id, montant, cryptos) 
       
  - TACHES:
   - Initialisation des applications docker (environnement) [Ony]
   - Initialisation base & modeles (Roles, Users, Tokens) [all]
   - MCD (looping) [Amboara]
   - PAGES:
     - formulaire d'inscription (FullName, Email, Password)
     - formulaire de connexion (Email, Password)
     - formulaire de confirmation de pin (Email, Pin)
     - formulaire de depot/retrait (Montant, Devise)
     - formulaire d'achat/vente de cryptomonaie (Montant, Devise, Crypto)
     - liste achat et vente 
     - graphique d'evolution d'un crypto 
     - portefeuille
   - FONCTIONS:
      