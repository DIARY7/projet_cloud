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
