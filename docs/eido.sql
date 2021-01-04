CREATE TYPE t_role AS ENUM ('ROLE_ADMIN','ROLE_USER','ROLE_INFLUENCER','ROLE_BRAND');
CREATE TYPE t_unite AS ENUM ('video','minute','hour','photo','month','publication');

CREATE TABLE Users(
    Id_Users COUNTER,
    name VARCHAR(50),
    firstName VARCHAR(50),
    password VARCHAR(50),
    email text,
    bio text,
    roles t_role,
    PRIMARY KEY(Id_Users),
    UNIQUE(email)
);

CREATE TABLE Work(
    Id_Work COUNTER,
    url VARCHAR(50),
    name VARCHAR(50),
    Id_Users INT NOT NULL,
    thumbnail text,
    PRIMARY KEY(Id_Work),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users)
);

CREATE TABLE Keyword(
    Id_Keyword COUNTER,
    name VARCHAR(50),
    PRIMARY KEY(Id_Keyword)
);

CREATE TABLE Offer(
    Id_Offer COUNTER,
    price DECIMAL(15,2),
    unit t_unite,
    custom LOGICAL,
    Id_Users INT NOT NULL,
    PRIMARY KEY(Id_Offer),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users)
);

CREATE TABLE Proposal(
    Id_Proposal COUNTER,
    release_date DATETIME,
    statut VARCHAR(50),
    Id_Users INT NOT NULL,
    Id_Offer INT NOT NULL,
    Id_Users_1 INT NOT NULL,
    PRIMARY KEY(Id_Proposal),
    UNIQUE(Id_Offer),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
    FOREIGN KEY(Id_Offer) REFERENCES Offer(Id_Offer),
    FOREIGN KEY(Id_Users_1) REFERENCES Users(Id_Users)
);

CREATE TABLE Platform(
    Id_Platform COUNTER,
    name VARCHAR(50),
    PRIMARY KEY(Id_Platform)
);

CREATE TABLE Users_Keyword(
    Id_Users INT,
    Id_Keyword INT,
    PRIMARY KEY(Id_Users, Id_Keyword),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
    FOREIGN KEY(Id_Keyword) REFERENCES Keyword(Id_Keyword)
);

CREATE TABLE platform_user(
    Id_Users INT,
    Id_Platform INT,
    PRIMARY KEY(Id_Users, Id_Platform),
    FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
    FOREIGN KEY(Id_Platform) REFERENCES Platform(Id_Platform)
);