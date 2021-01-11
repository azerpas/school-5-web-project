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
    url text,
    PRIMARY KEY(id) ,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS "Work"(
    id serial,
    url text,
    name text,
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
    expiration_date DATE,
    description text,
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

CREATE TABLE IF NOT EXISTS "_KeywordToUser"(
    "A" INT NOT NULL REFERENCES "Keyword"(id),
    "B" INT NOT NULL REFERENCES "User"(id)
);
CREATE UNIQUE INDEX "_KeywordToUser_AB_unique" ON "_KeywordToUser"("A" int4_ops,"B" int4_ops);
CREATE INDEX "_KeywordToUser_B_index" ON "_KeywordToUser"("B" int4_ops);

CREATE TABLE IF NOT EXISTS "_PlatformToUser"(
    "A" INT NOT NULL REFERENCES "Platform"(id),
    "B" INT NOT NULL REFERENCES "User"(id)
);
CREATE UNIQUE INDEX "_PlatformToUser_AB_unique" ON "_PlatformToUser"("A" int4_ops,"B" int4_ops);
CREATE INDEX "_PlatformToUser_B_index" ON "_PlatformToUser"("B" int4_ops);

INSERT INTO "User" (name, firstName, password, email, bio, roles) VALUES ('influenceur','influenceur','$2b$10$NpBnI/r2vTyk2MeyrzViKuASZKksp1dggBvjkhNxbmsO6ft/IB54G','influenceur@influenceur.fr','influenceur','ROLE_INFLUENCER') ,
                                                                         ('marque','marque','$2b$10$83klk0/aq7/PzjXRa8KhBuc/n.BJOna/A.KTZdbHoxmic3cgeWcBu','marque@marque.fr','marque','ROLE_BRAND');
INSERT INTO "Platform" (name) VALUES ('youtube'),
                                     ('instagram'),
                                     ('tiktok');
INSERT INTO "_PlatformToUser" VALUES (1,1),
                                     (2,1);
INSERT INTO "Keyword" (name) VALUES ('Actu'),
                                    ('Tech'),
                                    ('Dance'),
                                    ('Lifestyle');
INSERT INTO "_KeywordToUser" VALUES (1,1),
                                    (2,1);
