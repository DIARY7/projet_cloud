CREATE TABLE roles(
   id SERIAL,
   name VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE users(
   id SERIAL,
   full_name VARCHAR(255)  NOT NULL,
   email VARCHAR(255)  NOT NULL,
   pwd VARCHAR(255)  NOT NULL,
   n_attempt INTEGER,
   created_at TIMESTAMP NOT NULL,
   updated_at TIMESTAMP,
   -- role_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(email)
   --FOREIGN KEY(role_id) REFERENCES roles(id)
);

CREATE TABLE tokens(
   id SERIAL,
   token VARCHAR(255)  NOT NULL,
   created_at TIMESTAMP,
   expires_at TIMESTAMP,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE Cryptos (
id SERIAL PRIMARY KEY,
name CHAR(3) NOT NULL 
);

CREATE TABLE Devises (
   id SERIAL PRIMARY KEY,
   name CHAR(3) NOT NULL
);

CREATE TABLE Conversions (
   id SERIAL PRIMARY KEY,
   value NUMERIC(18,2),
   crypto_id INTEGER REFERENCES Cryptos(id),
   devise_id INTEGER REFERENCES Devises(id)
);

CREATE TABLE Transaction_Crypto (
   id SERIAL PRIMARY KEY,
   date_transaction TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   entree NUMERIC DEFAULT 0,
   sortie NUMERIC DEFAULT 0,
   crypto_id INTEGER REFERENCES Cryptos(id),
   devise_id INTEGER REFERENCES Devises(id),
   user_id INTEGER REFERENCES users(id),
   montant NUMERIC DEFAULT 0
);

CREATE TABLE Transaction_Fond (
   id SERIAL PRIMARY KEY,
   date_transaction TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   entree NUMERIC DEFAULT 0,
   sortie NUMERIC DEFAULT 0,
   user_id INTEGER REFERENCES users(id),
   devise_id INTEGER REFERENCES Devises(id)
);

------------------------------ DONNEES ---------------------------------------

INSERT INTO Cryptos (name) VALUES ('BTC');
INSERT INTO Cryptos (name) VALUES ('ETH');
INSERT INTO Cryptos (name) VALUES ('LTC');
INSERT INTO Cryptos (name) VALUES ('XRP');
INSERT INTO Cryptos (name) VALUES ('BCH');
INSERT INTO Cryptos (name) VALUES ('EOS');
INSERT INTO Cryptos (name) VALUES ('ADA');
INSERT INTO Cryptos (name) VALUES ('XLM');
INSERT INTO Cryptos (name) VALUES ('TRX');
INSERT INTO Cryptos (name) VALUES ('NEO');

INSERT INTO Devises (name) VALUES ('USD');
INSERT INTO Devises (name) VALUES ('EUR');
INSERT INTO Devises (name) VALUES ('MGA');

-- BTC Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (50000.00, 1, 1); -- BTC to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (45000.00, 1, 2); -- BTC to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (5500000.00, 1, 3); -- BTC to MGA

-- ETH Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (4000.00, 2, 1); -- ETH to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (3500.00, 2, 2); -- ETH to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (440000.00, 2, 3); -- ETH to MGA

-- LTC Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (200.00, 3, 1); -- LTC to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (180.00, 3, 2); -- LTC to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (22000.00, 3, 3); -- LTC to MGA

-- XRP Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (1.00, 4, 1); -- XRP to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (0.90, 4, 2); -- XRP to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (110.00, 4, 3); -- XRP to MGA

-- BCH Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (600.00, 5, 1); -- BCH to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (540.00, 5, 2); -- BCH to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (66000.00, 5, 3); -- BCH to MGA

-- EOS Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (5.00, 6, 1); -- EOS to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (4.50, 6, 2); -- EOS to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (550.00, 6, 3); -- EOS to MGA

-- ADA Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (2.00, 7, 1); -- ADA to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (1.80, 7, 2); -- ADA to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (220.00, 7, 3); -- ADA to MGA

-- XLM Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (0.30, 8, 1); -- XLM to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (0.27, 8, 2); -- XLM to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (33.00, 8, 3); -- XLM to MGA

-- TRX Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (0.10, 9, 1); -- TRX to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (0.09, 9, 2); -- TRX to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (11.00, 9, 3); -- TRX to MGA

-- NEO Conversions
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (50.00, 10, 1); -- NEO to USD
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (45.00, 10, 2); -- NEO to EUR
INSERT INTO Conversions (value, crypto_id, devise_id) VALUES (5500.00, 10, 3); -- NEO to MGA

--------------------------------- VUES ---------------------------------

CREATE VIEW Portefeuille_Fond AS
SELECT 
   user_id, 
   COALESCE(SUM(entree - sortie), 0) AS montant,
   devise_id
FROM 
   Transaction_Fond
GROUP BY 
   user_id;

CREATE VIEW Portefeuille_Crypto AS
SELECT 
   user_id, 
   crypto_id, 
   COALESCE(SUM(entree - sortie), 0) AS cryptos,
   COALESCE(SUM(montant), 0 ) AS montant
FROM 
   Transaction_Crypto
GROUP BY 
   user_id, 
   crypto_id;

CREATE VIEW Portefeuille_General AS
SELECT 
   u.id AS user_id,
   COALESCE(pf.montant, 0) AS solde_fond,
   COALESCE(pc.cryptos, 0) AS qte_crypto,
   pc.crypto_id,
   COALESCE(pc.montant, 0) AS montant_crypto
FROM 
   users u
LEFT JOIN 
   Portefeuille_Fond pf ON u.id = pf.user_id
LEFT JOIN 
   Portefeuille_Crypto pc ON u.id = pc.user_id;
