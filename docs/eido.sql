CREATE TYPE t_role AS ENUM ('ROLE_ADMIN','ROLE_USER','ROLE_INFLUENCER','ROLE_BRAND');
CREATE TYPE t_unite AS ENUM ('video','minute','hour','photo','month','publication');
CREATE TYPE t_status AS ENUM ('proposed','done','canceled','refused','accepted');

CREATE TABLE IF NOT EXISTS "User"
(
    id serial,
    name VARCHAR(50),
    firstName VARCHAR(50),
    password VARCHAR(256),
    email text,
    bio text,
    roles t_role,
    PRIMARY KEY(id) ,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS "Work"(
    id serial,
    url text,
    name VARCHAR(50),
    id_User INT NOT NULL,
    thumbnail text,
    PRIMARY KEY(id),
    FOREIGN KEY(id_User) REFERENCES "User" (id)
);

CREATE TABLE IF NOT EXISTS "Keyword"(
    id serial,
    name VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS "Offer"(
    id serial,
    price DECIMAL(15,2),
    unit t_unite,
    custom BOOLEAN,
    id_User INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_User) REFERENCES "User" (id)
);

CREATE TABLE IF NOT EXISTS "Proposal"(
    id serial,
    release_date DATE,
    statut t_status,
    id_Influencer INT NOT NULL,
    id_Offer INT NOT NULL,
    id_Brand INT NOT NULL,
    PRIMARY KEY(id),
    UNIQUE(Id_Offer),
    FOREIGN KEY(id_Influencer) REFERENCES "User" (id),
    FOREIGN KEY(id_Offer) REFERENCES "Offer"(id),
    FOREIGN KEY(id_Brand) REFERENCES "User" (id)
);

CREATE TABLE IF NOT EXISTS "Platform"(
    id serial,
    name VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS "User_Keyword"(
    id_User INT,
    id_Keyword INT,
    PRIMARY KEY(id_User, id_Keyword),
    FOREIGN KEY(id_User) REFERENCES "User" (id),
    FOREIGN KEY(id_Keyword) REFERENCES "Keyword"(id)
);

CREATE TABLE IF NOT EXISTS "Platform_User"(
    id_User INT,
    id_Platform INT,
    PRIMARY KEY(id_User, id_Platform),
    FOREIGN KEY(id_User) REFERENCES "User" (id),
    FOREIGN KEY(id_Platform) REFERENCES "Platform"(id)
);

INSERT INTO "User" (name, firstName, password, email, bio, roles) VALUES ('influenceur','influenceur','$2b$10$NpBnI/r2vTyk2MeyrzViKuASZKksp1dggBvjkhNxbmsO6ft/IB54G','influenceur@influenceur.fr','influenceur','ROLE_INFLUENCER');
INSERT INTO "User" (name, firstName, password, email, bio, roles) VALUES ('marque','marque','$2b$10$83klk0/aq7/PzjXRa8KhBuc/n.BJOna/A.KTZdbHoxmic3cgeWcBu','marque@marque.fr','marque','ROLE_BRAND');
INSERT INTO "Platform" (name) VALUES ('youtube');
INSERT INTO "Platform" (name) VALUES ('instagram');