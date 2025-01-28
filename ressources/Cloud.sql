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
