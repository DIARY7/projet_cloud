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

CREATE TABLE crypto(
   id SERIAL,
   label VARCHAR(50) ,
   PRIMARY KEY(id)
);

CREATE TABLE prix_crypto(
   id INTEGER,
   daty TIMESTAMP NOT NULL,
   prix NUMERIC(15,2)  ,
   crypto_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(crypto_id) REFERENCES crypto(id)
);

CREATE TABLE transaction_fond(
   id SERIAL,
   entree NUMERIC(15,2)  ,
   sortie NUMERIC(15,2)  ,
   dt_transaction TIMESTAMP,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE type_commission(
   id SERIAL,
   label VARCHAR(50)  NOT NULL,
   commission NUMERIC(2,2)  ,
   PRIMARY KEY(id)
);

CREATE TABLE transaction_crypto(
   id VARCHAR(50) ,
   pu_crypto NUMERIC(15,2)  ,
   prix NUMERIC(15,2)  ,
   qte NUMERIC(15,2)  ,
   dt_transaction TIMESTAMP NOT NULL,
   type_commission_id INTEGER NOT NULL,
   crypto_id INTEGER NOT NULL,
   user_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(type_commission_id) REFERENCES type_commission(id),
   FOREIGN KEY(crypto_id) REFERENCES crypto(id),
   FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE commission(
   id SERIAL,
   commission NUMERIC(15,2)  ,
   pourcentage NUMERIC(2,2)   NOT NULL,
   transaction_crypto_id VARCHAR(50)  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(transaction_crypto_id) REFERENCES transaction_crypto(id)
);

------------------------------ DONNEES ---------------------------------------

INSERT INTO users (full_name, email, pwd, n_attempt, created_at, updated_at)
VALUES
    ('User 1', 'liffeuquogulou-6839@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 2', 'groikozafaya-4437@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 3', 'weiffacrimaussau-1751@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 4', 'jupoquottupoi-3092@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 5', 'sadattizannou-5769@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 6', 'geibufrobuju-9156@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 7', 'noxoileubroli-7358@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 8', 'lammeinnannecru-7114@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 9', 'feurofaseipu-7684@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL),
    ('User 10', 'treuppeyafeso-1576@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL);


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


