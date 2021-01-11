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

INSERT INTO "User" (name, firstName, password, email, bio, roles) VALUES ('Micode','micode','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO','micode@micode.fr','vulgarisation informatique','ROLE_INFLUENCER') ,
                                                                         ('Mcfly & Carlito','influenceur','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO','mc@mc.fr','Pas très marrant','ROLE_INFLUENCER') ,
                                                                         ('World Of Tanks','Charles','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO','wof@wof.com','Le meilleur jeu de tank au monde','ROLE_BRAND') ,
                                                                         ('Nord VPN','vpn','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO','nordvpn@nordvpn.fr','vpn qui vous rend "anonyme" ','ROLE_BRAND'),
                                                                         ('Rhinoshield', 'rhino','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO' ,'rhino@rhino.fr','ùarque de coque de téléphone','ROLE_BRAND'),
                                                                         ('Hollyh','h','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO','hollyh@hollyh.fr','tiktokeuse','ROLE_INFLUENCER'),
                                                                         ('Hugo Décrypte','hugo','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO','hugo@hugo.fr','Résumé actualité','ROLE_INFLUENCER'),
                                                                         ('Dr Nozman','hugo','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO','nozman@nozman.fr','vulgarisation scientifique','ROLE_INFLUENCER'),
                                                                         ('Nota Bene','bene','$2b$10$MbFlMzR.IzTV5bDb9m.veu.dtCaFYi9l6c41PljLAHC3uJHxLDDjO','notabene@notabene.fr','chaine sur l histoire','ROLE_INFLUENCER');;

INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (1200, 'minute', FALSE, 1);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (9300, 'video', FALSE, 1);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (5000, 'video', FALSE, 3);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (6000, 'video', FALSE, 4);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (7000, 'video', FALSE, 5);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (5000, 'publication', FALSE, 3);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (6000, 'publication', FALSE, 4);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (9000, 'publication', FALSE, 5);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (3400, 'minute', FALSE, 7);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (15000, 'photo', FALSE, 6);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (30000, 'video', FALSE, 6);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (8000, 'photo', FALSE, 7);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (2000, 'minute', FALSE, 8);
INSERT INTO "Offer" (price, unit, custom, id_User) VALUES (10000, 'video', FALSE, 8);

INSERT INTO "Platform" (name) VALUES ('youtube'),
                                     ('instagram'),
                                     ('tiktok'),
                                     ('twitter'),
                                     ('facebook'),
                                     ('dailymotion');
INSERT INTO "_PlatformToUser" VALUES (1,1),
                                     (2,1),
                                     (5,1),
                                     (5,2),
                                     (5,6),
                                     (5,7),
                                     (5,8),
                                     (3,2),
                                     (4,1),
                                     (1,2),
                                     (3,6),
                                     (1,7),
                                     (2,7),
                                     (1,8),
                                     (1,9);

INSERT INTO "Keyword" (name) VALUES ('Actu'),
                                    ('Tech'),
                                    ('Dance'),
                                    ('Lifestyle'),
                                    ('Sport'),
                                    ('Humour'),
                                    ('Gaming'),
                                    ('Science'),
                                    ('Histoire');
INSERT INTO "_KeywordToUser" VALUES (1,1),
                                    (2,1),
                                    (3,2),
                                    (7,2),
                                    (3,6),
                                    (4,6),
                                    (1,7),
                                    (8,8),
                                    (9,9);