CREATE TYPE t_role AS ENUM ('ROLE_ADMIN','ROLE_USER','ROLE_INFLUENCER','ROLE_BRAND');
CREATE TYPE t_unite AS ENUM ('video','minute','hour','photo','month','publication');
CREATE TYPE t_status AS ENUM ('proposed','done','canceled','refused','accepted');

CREATE TABLE IF NOT EXISTS Users(
    Id_Users serial,
    name VARCHAR(50),
    firstName VARCHAR(50),
    password VARCHAR(50),
    email text,
    bio text,
    roles t_role,
    PRIMARY KEY(Id_Users) ,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS Work(
    Id_Work serial,
    url text,
    name VARCHAR(50),
    Id_Users INT NOT NULL,
    thumbnail text,
    PRIMARY KEY(Id_Work),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users)
);

CREATE TABLE IF NOT EXISTS Keyword(
    Id_Keyword serial,
    name VARCHAR(50),
    PRIMARY KEY(Id_Keyword)
);

CREATE TABLE IF NOT EXISTS Offer(
    Id_Offer serial,
    price DECIMAL(15,2),
    unit t_unite,
    custom BOOLEAN,
    Id_Users INT NOT NULL,
    PRIMARY KEY(Id_Offer),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users)
);

CREATE TABLE IF NOT EXISTS Proposal(
    Id_Proposal serial,
    release_date DATE,
    statut t_status,
    Id_Influencer INT NOT NULL,
    Id_Offer INT NOT NULL,
    Id_Brand INT NOT NULL,
    PRIMARY KEY(Id_Proposal),
    UNIQUE(Id_Offer),
    FOREIGN KEY(Id_Influencer) REFERENCES Users(Id_Users),
    FOREIGN KEY(Id_Offer) REFERENCES Offer(Id_Offer),
    FOREIGN KEY(Id_Brand) REFERENCES Users(Id_Users)
);

CREATE TABLE IF NOT EXISTS Platform(
    Id_Platform serial,
    name VARCHAR(50),
    PRIMARY KEY(Id_Platform)
);

CREATE TABLE IF NOT EXISTS Users_Keyword(
    Id_Users INT,
    Id_Keyword INT,
    PRIMARY KEY(Id_Users, Id_Keyword),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
    FOREIGN KEY(Id_Keyword) REFERENCES Keyword(Id_Keyword)
);

CREATE TABLE IF NOT EXISTS platform_user(
    Id_Users INT,
    Id_Platform INT,
    PRIMARY KEY(Id_Users, Id_Platform),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
    FOREIGN KEY(Id_Platform) REFERENCES Platform(Id_Platform)
);