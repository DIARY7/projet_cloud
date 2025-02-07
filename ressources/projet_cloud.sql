CREATE TABLE synchro_date(
    dt_sync TIMESTAMP
);

CREATE TABLE users(
   id SERIAL,
   full_name VARCHAR(255)  NOT NULL,
   email VARCHAR(255)  NOT NULL,
   pwd VARCHAR(255)  NOT NULL,
   n_attempt INTEGER,
   created_at TIMESTAMP NOT NULL,
   updated_at TIMESTAMP,
   is_admin BOOLEAN DEFAULT FALSE,
   PRIMARY KEY(id),
   UNIQUE(email)
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
   label VARCHAR(50),
   full_label VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE prix_crypto(
   id SERIAL,
   daty TIMESTAMP NOT NULL,
   prix NUMERIC(15,2)  ,
   crypto_id INTEGER NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(crypto_id) REFERENCES crypto(id)
);



CREATE TABLE transaction_fond_demande (
    id VARCHAR(20) PRIMARY KEY,
    entree NUMERIC(15, 2),
    sortie NUMERIC(15, 2),
    dt_transaction TIMESTAMP,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE transaction_fond(
   id SERIAL,
   entree NUMERIC(15,2),
   sortie NUMERIC(15,2),
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
   id SERIAL ,
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
   transaction_crypto_id INTEGER  NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(transaction_crypto_id) REFERENCES transaction_crypto(id)
);

-- Créer une séquence qui démarre à 1
CREATE SEQUENCE transaction_fond_demande_seq
START 1
INCREMENT BY 1;

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

INSERT INTO users (full_name, email, pwd, n_attempt, created_at, updated_at, is_admin)
VALUES
    ('User 11', 'nalopribrucra-1318@yopmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0, NOW(), NULL,TRUE);

INSERT INTO Crypto (label, full_label) VALUES ('BTC', 'Bitcoin');
INSERT INTO Crypto (label, full_label) VALUES ('ETH', 'Ethereum');
INSERT INTO Crypto (label, full_label) VALUES ('LTC', 'Litecoin');
INSERT INTO Crypto (label, full_label) VALUES ('XRP', 'Ripple');
INSERT INTO Crypto (label, full_label) VALUES ('BCH', 'Bitcoin Cash');
INSERT INTO Crypto (label, full_label) VALUES ('EOS', 'EOS');
INSERT INTO Crypto (label, full_label) VALUES ('ADA', 'Cardano');
INSERT INTO Crypto (label, full_label) VALUES ('XLM', 'Stellar');
INSERT INTO Crypto (label, full_label) VALUES ('TRX', 'TRON');
INSERT INTO Crypto (label, full_label) VALUES ('NEO', 'NEO');

INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 480000000.00, 1),
('2025-01-28 11:30:00', 459800000.00, 1),
('2025-01-28 13:15:00', 483600000.00, 1),
('2025-01-28 15:00:00', 456420000.00, 1),
('2025-01-28 16:45:00', 502600000.00, 1),
('2025-01-28 18:00:00', 475350000.00, 1),
('2025-01-28 19:30:00', 492700000.00, 1),
('2025-01-28 21:15:00', 456980000.00, 1),
('2025-01-28 23:00:00', 468500000.00, 1),
('2025-01-29 01:15:00', 503280000.00, 1),
('2025-01-29 03:00:00', 487950000.00, 1),
('2025-01-29 04:45:00', 469230000.00, 1),
('2025-01-29 06:30:00', 498840000.00, 1),
('2025-01-29 08:15:00', 457560000.00, 1),
('2025-01-29 10:00:00', 484000000.00, 1),
('2025-01-29 11:45:00', 499200000.00, 1),
('2025-01-29 13:30:00', 472560000.00, 1),
('2025-01-29 15:15:00', 481500000.00, 1),
('2025-01-29 17:00:00', 461850000.00, 1),
('2025-01-29 18:45:00', 504000000.00, 1);

INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 14000000.00, 2),
('2025-01-28 11:30:00', 13300000.00, 2),
('2025-01-28 13:15:00', 14420000.00, 2),
('2025-01-28 15:00:00', 13776000.00, 2),
('2025-01-28 16:45:00', 14700000.00, 2),
('2025-01-28 18:00:00', 13230000.00, 2),
('2025-01-28 19:30:00', 14175000.00, 2),
('2025-01-28 21:15:00', 13440000.00, 2),
('2025-01-28 23:00:00', 14280000.00, 2),
('2025-01-29 01:15:00', 13860000.00, 2),
('2025-01-29 03:00:00', 14630000.00, 2),
('2025-01-29 04:45:00', 13520000.00, 2),
('2025-01-29 06:30:00', 14385000.00, 2),
('2025-01-29 08:15:00', 13290000.00, 2),
('2025-01-29 10:00:00', 14070000.00, 2),
('2025-01-29 11:45:00', 13720000.00, 2),
('2025-01-29 13:30:00', 14580000.00, 2),
('2025-01-29 15:15:00', 13820000.00, 2),
('2025-01-29 17:00:00', 14200000.00, 2),
('2025-01-29 18:45:00', 13370000.00, 2);

INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 530000.00, 3),
('2025-01-28 11:30:00', 503500.00, 3),
('2025-01-28 13:15:00', 556500.00, 3),
('2025-01-28 15:00:00', 518450.00, 3),
('2025-01-28 16:45:00', 536250.00, 3),
('2025-01-28 18:00:00', 549150.00, 3),
('2025-01-28 19:30:00', 510850.00, 3),
('2025-01-28 21:15:00', 525400.00, 3),
('2025-01-28 23:00:00', 556150.00, 3),
('2025-01-29 01:15:00', 528650.00, 3),
('2025-01-29 03:00:00', 502850.00, 3),
('2025-01-29 04:45:00', 536500.00, 3),
('2025-01-29 06:30:00', 517200.00, 3),
('2025-01-29 08:15:00', 555300.00, 3),
('2025-01-29 10:00:00', 503000.00, 3),
('2025-01-29 11:45:00', 527600.00, 3),
('2025-01-29 13:30:00', 545200.00, 3),
('2025-01-29 15:15:00', 522350.00, 3),
('2025-01-29 17:00:00', 531400.00, 3),
('2025-01-29 18:45:00', 505700.00, 3);

INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 15000.00, 4),
('2025-01-28 11:30:00', 14250.00, 4),
('2025-01-28 13:15:00', 15750.00, 4),
('2025-01-28 15:00:00', 15200.00, 4),
('2025-01-28 16:45:00', 14750.00, 4),
('2025-01-28 18:00:00', 15300.00, 4),
('2025-01-28 19:30:00', 14800.00, 4),
('2025-01-28 21:15:00', 15450.00, 4),
('2025-01-28 23:00:00', 14600.00, 4),
('2025-01-29 01:15:00', 15700.00, 4),
('2025-01-29 03:00:00', 14500.00, 4),
('2025-01-29 04:45:00', 15150.00, 4),
('2025-01-29 06:30:00', 14850.00, 4),
('2025-01-29 08:15:00', 15400.00, 4),
('2025-01-29 10:00:00', 14950.00, 4),
('2025-01-29 11:45:00', 15250.00, 4),
('2025-01-29 13:30:00', 15600.00, 4),
('2025-01-29 15:15:00', 15000.00, 4),
('2025-01-29 17:00:00', 14650.00, 4),
('2025-01-29 18:45:00', 15350.00, 4);


INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 1945000.00, 5),
('2025-01-28 11:30:00', 1857750.00, 5),
('2025-01-28 13:15:00', 2047250.00, 5),
('2025-01-28 15:00:00', 1922500.00, 5),
('2025-01-28 16:45:00', 1865000.00, 5),
('2025-01-28 18:00:00', 2032500.00, 5),
('2025-01-28 19:30:00', 1832500.00, 5),
('2025-01-28 21:15:00', 1940000.00, 5),
('2025-01-28 23:00:00', 2042000.00, 5),
('2025-01-29 01:15:00', 1895000.00, 5),
('2025-01-29 03:00:00', 1962500.00, 5),
('2025-01-29 04:45:00', 1917500.00, 5),
('2025-01-29 06:30:00', 1875000.00, 5),
('2025-01-29 08:15:00', 2027500.00, 5),
('2025-01-29 10:00:00', 1850000.00, 5),
('2025-01-29 11:45:00', 1935000.00, 5),
('2025-01-29 13:30:00', 2005000.00, 5),
('2025-01-29 15:15:00', 1905000.00, 5),
('2025-01-29 17:00:00', 1862500.00, 5),
('2025-01-29 18:45:00', 2030000.00, 5);

INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 3500.00, 6),
('2025-01-28 11:30:00', 3325.00, 6),
('2025-01-28 13:15:00', 3675.00, 6),
('2025-01-28 15:00:00', 3425.00, 6),
('2025-01-28 16:45:00', 3320.00, 6),
('2025-01-28 18:00:00', 3670.00, 6),
('2025-01-28 19:30:00', 3370.00, 6),
('2025-01-28 21:15:00', 3520.00, 6),
('2025-01-28 23:00:00', 3315.00, 6),
('2025-01-29 01:15:00', 3660.00, 6),
('2025-01-29 03:00:00', 3375.00, 6),
('2025-01-29 04:45:00', 3475.00, 6),
('2025-01-29 06:30:00', 3325.00, 6),
('2025-01-29 08:15:00', 3665.00, 6),
('2025-01-29 10:00:00', 3370.00, 6),
('2025-01-29 11:45:00', 3500.00, 6),
('2025-01-29 13:30:00', 3650.00, 6),
('2025-01-29 15:15:00', 3410.00, 6),
('2025-01-29 17:00:00', 3320.00, 6),
('2025-01-29 18:45:00', 3655.00, 6);

-- Insertion des prix pour ADA (id auto-généré)
INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 4500.00, 7),
('2025-01-28 11:30:00', 4275.00, 7),
('2025-01-28 13:15:00', 4725.00, 7),
('2025-01-28 15:00:00', 4425.00, 7),
('2025-01-28 16:45:00', 4280.00, 7),
('2025-01-28 18:00:00', 4720.00, 7),
('2025-01-28 19:30:00', 4390.00, 7),
('2025-01-28 21:15:00', 4530.00, 7),
('2025-01-28 23:00:00', 4285.00, 7),
('2025-01-29 01:15:00', 4710.00, 7),
('2025-01-29 03:00:00', 4385.00, 7),
('2025-01-29 04:45:00', 4515.00, 7),
('2025-01-29 06:30:00', 4280.00, 7),
('2025-01-29 08:15:00', 4700.00, 7),
('2025-01-29 10:00:00', 4400.00, 7),
('2025-01-29 11:45:00', 4525.00, 7),
('2025-01-29 13:30:00', 4695.00, 7),
('2025-01-29 15:15:00', 4405.00, 7),
('2025-01-29 17:00:00', 4275.00, 7),
('2025-01-29 18:45:00', 4705.00, 7);

INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 2000.00, 8),
('2025-01-28 11:30:00', 1900.00, 8),
('2025-01-28 13:15:00', 2100.00, 8),
('2025-01-28 15:00:00', 1950.00, 8),
('2025-01-28 16:45:00', 1900.00, 8),
('2025-01-28 18:00:00', 2100.00, 8),
('2025-01-28 19:30:00', 1950.00, 8),
('2025-01-28 21:15:00', 2000.00, 8),
('2025-01-28 23:00:00', 1900.00, 8),
('2025-01-29 01:15:00', 2100.00, 8),
('2025-01-29 03:00:00', 1950.00, 8),
('2025-01-29 04:45:00', 2000.00, 8),
('2025-01-29 06:30:00', 1900.00, 8),
('2025-01-29 08:15:00', 2100.00, 8),
('2025-01-29 10:00:00', 1950.00, 8),
('2025-01-29 11:45:00', 2000.00, 8),
('2025-01-29 13:30:00', 2100.00, 8),
('2025-01-29 15:15:00', 1950.00, 8),
('2025-01-29 17:00:00', 1900.00, 8),
('2025-01-29 18:45:00', 2100.00, 8);


INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 1100.00, 9),
('2025-01-28 11:30:00', 1045.00, 9),
('2025-01-28 13:15:00', 1155.00, 9),
('2025-01-28 15:00:00', 1050.00, 9),
('2025-01-28 16:45:00', 1040.00, 9),
('2025-01-28 18:00:00', 1150.00, 9),
('2025-01-28 19:30:00', 1055.00, 9),
('2025-01-28 21:15:00', 1100.00, 9),
('2025-01-28 23:00:00', 1040.00, 9),
('2025-01-29 01:15:00', 1150.00, 9),
('2025-01-29 03:00:00', 1055.00, 9),
('2025-01-29 04:45:00', 1100.00, 9),
('2025-01-29 06:30:00', 1045.00, 9),
('2025-01-29 08:15:00', 1155.00, 9),
('2025-01-29 10:00:00', 1050.00, 9),
('2025-01-29 11:45:00', 1100.00, 9),
('2025-01-29 13:30:00', 1150.00, 9),
('2025-01-29 15:15:00', 1055.00, 9),
('2025-01-29 17:00:00', 1045.00, 9),
('2025-01-29 18:45:00', 1155.00, 9);


INSERT INTO prix_crypto (daty, prix, crypto_id) VALUES
('2025-01-28 09:00:00', 61000.00, 10),
('2025-01-28 11:30:00', 57950.00, 10),
('2025-01-28 13:15:00', 64050.00, 10),
('2025-01-28 15:00:00', 57900.00, 10),
('2025-01-28 16:45:00', 57800.00, 10),
('2025-01-28 18:00:00', 64000.00, 10),
('2025-01-28 19:30:00', 57950.00, 10),
('2025-01-28 21:15:00', 61000.00, 10),
('2025-01-28 23:00:00', 57850.00, 10),
('2025-01-29 01:15:00', 64000.00, 10),
('2025-01-29 03:00:00', 57950.00, 10),
('2025-01-29 04:45:00', 61000.00, 10),
('2025-01-29 06:30:00', 57800.00, 10),
('2025-01-29 08:15:00', 63950.00, 10),
('2025-01-29 10:00:00', 57950.00, 10),
('2025-01-29 11:45:00', 61000.00, 10),
('2025-01-29 13:30:00', 64050.00, 10),
('2025-01-29 15:15:00', 57850.00, 10),
('2025-01-29 17:00:00', 57900.00, 10),
('2025-01-29 18:45:00', 64000.00, 10);

INSERT INTO type_commission (label, commission)
VALUES ('Commission sur ventes', 0.05),   -- 5% de commission
       ('Commission sur achats', 0.10); -- 10% de commission

-- Insertion d'une transaction avec les données correspondantes
INSERT INTO transaction_fond (entree,sortie,dt_transaction, user_id)
VALUES 
(100000.50, 0.00, '2025-01-29 12:00:00', 1),
(100000.50, 0.00, '2025-01-29 12:00:00', 2),
(100000.50, 0.00, '2025-01-29 12:00:00', 3),
(100000.50, 0.00, '2025-01-29 12:00:00', 4),
(100000.50, 0.00, '2025-01-29 12:00:00', 5),
(100000.50, 0.00, '2025-01-29 12:00:00', 6),
(100000.50, 0.00, '2025-01-29 12:00:00', 7),
(100000.50, 0.00, '2025-01-29 12:00:00', 8),
(100000.50, 0.00, '2025-01-29 12:00:00', 9),
(100000.75, 0.00, '2025-01-29 14:00:00', 10);



-- Insérer des transactions crypto et des transactions de fonds correspondantes pour 3 jours
DO $$ 
DECLARE 
    usr RECORD;
    crypto_id_al INT;
    i INT;
    transaction_date TIMESTAMP;
    pu NUMERIC(15,2);
    qte_al NUMERIC(15,2);
    prix NUMERIC(15,2);
    type_commission_id_al INT;
    solde_actuel NUMERIC(15,2);
    solde_crypto NUMERIC(15,2);
    taux_commission NUMERIC(2,2);
    montant_commission NUMERIC(15,2);
    transaction_id INT;
BEGIN
    -- Boucle sur chaque utilisateur
    FOR usr IN (SELECT id FROM users) LOOP
        -- Boucle sur chaque jour (3 jours)
        FOR i IN 0..2 LOOP
            -- Générer une date de transaction aléatoire dans la journée
            transaction_date := NOW() - INTERVAL '3 days' + INTERVAL '1 day' * i 
                                + INTERVAL '1 hour' * FLOOR(RANDOM() * 24);

            -- Sélectionner une crypto au hasard
            SELECT id INTO crypto_id_al FROM crypto ORDER BY RANDOM() LIMIT 1;

            -- Générer un prix unitaire et une quantité aléatoires
            pu := ROUND((RANDOM() * 50000 + 100)::numeric, 2); -- Prix entre 100 et 50,000
            qte_al := ROUND((RANDOM() * 5 + 0.1)::numeric, 2);    -- Quantité entre 0.1 et 5
            prix := ROUND((pu * qte_al)::numeric, 2);             -- Prix total

            -- Déterminer aléatoirement si c'est un achat (2) ou une vente (1)
            type_commission_id_al := CASE WHEN RANDOM() > 0.5 THEN 1 ELSE 2 END;

            -- Récupérer le taux de commission (déjà divisé à l'insertion)
            SELECT commission INTO taux_commission FROM type_commission WHERE id = type_commission_id_al;
            
            -- Calcul du montant de la commission
            montant_commission := ROUND((prix * taux_commission)::numeric, 2);

            -- Calcul du solde actuel en fonds (argent)
            SELECT COALESCE(SUM(entree) - SUM(sortie), 0) 
            INTO solde_actuel
            FROM transaction_fond
            WHERE user_id = usr.id;

            -- Calcul du solde actuel en crypto
            SELECT COALESCE(SUM(CASE WHEN type_commission_id = 2 THEN qte ELSE -qte END), 0)
            INTO solde_crypto
            FROM transaction_crypto
            WHERE user_id = usr.id AND crypto_id = crypto_id_al;

            -- Vérification avant un achat (sortie de fonds)
            IF type_commission_id_al = 2 AND solde_actuel < (prix) THEN
                -- Si pas assez de fonds, on saute cette transaction
                CONTINUE;
            END IF;

            -- Vérification avant une vente (sortie de crypto)
            IF type_commission_id_al = 1 AND solde_crypto < qte_al THEN
                -- Si pas assez de crypto, on saute cette transaction
                CONTINUE;
            END IF;

            -- Insérer une transaction crypto et récupérer son ID
INSERT INTO transaction_crypto (pu_crypto, prix, qte, dt_transaction, type_commission_id, crypto_id, user_id)
            VALUES (pu, prix, qte_al, transaction_date, type_commission_id_al, crypto_id_al, usr.id)
            RETURNING id INTO transaction_id;

            -- Insérer la transaction de fonds correspondante
            IF type_commission_id_al = 1 THEN
                -- Vente : entrée de fonds
                INSERT INTO transaction_fond (entree, sortie, dt_transaction, user_id)
                VALUES (prix - montant_commission, 0, transaction_date, usr.id);
            ELSE
                -- Achat : sortie de fonds (vérifié avant)
                INSERT INTO transaction_fond (entree, sortie, dt_transaction, user_id)
                VALUES (0, prix , transaction_date, usr.id);
            END IF;

            -- Insérer la commission dans la table `commission`
            INSERT INTO commission (commission, pourcentage, transaction_crypto_id)
            VALUES (montant_commission, taux_commission, transaction_id);

        END LOOP;
    END LOOP;
END $$;

CREATE VIEW vue_fond_actuel AS (
SELECT 
    user_id, 
    COALESCE(COALESCE(SUM(entree), 0.0) - COALESCE(SUM(sortie), 0.0),0.0) AS solde_actuel
FROM transaction_fond
GROUP BY user_id);


-- test 20 transactions pour les 3 derniers jours
DO $$ 
DECLARE 
    usr RECORD;
    crypto_id_al INT;
    i INT;
    transaction_date TIMESTAMP;
    pu NUMERIC(15,2);
    qte NUMERIC(15,2);
    prix NUMERIC(15,2);
    type_commission_id_al INT;
    transaction_id INT;
BEGIN
    -- Boucle pour insérer 20 transactions
    FOR i IN 1..20 LOOP
        -- Sélectionner un utilisateur au hasard
        SELECT id INTO usr FROM users ORDER BY RANDOM() LIMIT 1;

        -- Sélectionner une crypto au hasard parmi les ID 1 à 10
        SELECT id INTO crypto_id_al FROM crypto WHERE id BETWEEN 1 AND 10 ORDER BY RANDOM() LIMIT 1;

        -- Générer une date de transaction aléatoire dans les 3 derniers jours
        transaction_date := NOW() - INTERVAL '3 days' + INTERVAL '1 day' * FLOOR(RANDOM() * 3) 
                            + INTERVAL '1 hour' * FLOOR(RANDOM() * 24);

        -- Générer un prix unitaire et une quantité aléatoires
        pu := ROUND((RANDOM() * 50000 + 100)::numeric, 2); -- Prix entre 100 et 50,000
        qte := ROUND((RANDOM() * 5 + 0.1)::numeric, 2);    -- Quantité entre 0.1 et 5
        prix := ROUND((pu * qte)::numeric, 2);             -- Prix total

        -- Déterminer aléatoirement si c'est un achat (2) ou une vente (1)
        type_commission_id_al := CASE WHEN RANDOM() > 0.5 THEN 1 ELSE 2 END;

        -- Insérer la transaction crypto
        INSERT INTO transaction_crypto (pu_crypto, prix, qte, dt_transaction, type_commission_id, crypto_id, user_id)
        VALUES (pu, prix, qte, transaction_date, type_commission_id_al, crypto_id_al, usr.id)
        RETURNING id INTO transaction_id;
    END LOOP;
END $$;


