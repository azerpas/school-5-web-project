CREATE TABLE Users(
   Id_Users COUNTER,
   name VARCHAR(50),
   firstName VARCHAR(50),
   password VARCHAR(50),
   login VARCHAR(50),
   PRIMARY KEY(Id_Users)
);

CREATE TABLE Ad(
   Id_Ad COUNTER,
   price DECIMAL(15,2),
   unit VARCHAR(50),
   Id_Users INT NOT NULL,
   PRIMARY KEY(Id_Ad),
   FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users)
);

CREATE TABLE Role(
   Id_Role COUNTER,
   name VARCHAR(50),
   PRIMARY KEY(Id_Role)
);

CREATE TABLE Platform(
   Id_Platform COUNTER,
   name VARCHAR(50),
   PRIMARY KEY(Id_Platform)
);

CREATE TABLE Work(
   Id_Work COUNTER,
   link VARCHAR(50),
   name VARCHAR(50),
   release_date VARCHAR(50),
   PRIMARY KEY(Id_Work)
);

CREATE TABLE Keyword(
   Id_Keyword COUNTER,
   name VARCHAR(50),
   PRIMARY KEY(Id_Keyword)
);

CREATE TABLE Role_Users(
   Id_Users INT,
   Id_Role INT,
   PRIMARY KEY(Id_Users, Id_Role),
   FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
   FOREIGN KEY(Id_Role) REFERENCES Role(Id_Role)
);

CREATE TABLE Answer(
   Id_Users INT,
   Id_Ad INT,
   Accept LOGICAL,
   PRIMARY KEY(Id_Users, Id_Ad),
   FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
   FOREIGN KEY(Id_Ad) REFERENCES Ad(Id_Ad)
);

CREATE TABLE Link(
   Id_Ad INT,
   Id_Platform INT,
   PRIMARY KEY(Id_Ad, Id_Platform),
   FOREIGN KEY(Id_Ad) REFERENCES Ad(Id_Ad),
   FOREIGN KEY(Id_Platform) REFERENCES Platform(Id_Platform)
);

CREATE TABLE Platform_Users_Work(
   Id_Users INT,
   Id_Platform INT,
   Id_Work INT,
   link_profil VARCHAR(50),
   PRIMARY KEY(Id_Users, Id_Platform, Id_Work),
   FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
   FOREIGN KEY(Id_Platform) REFERENCES Platform(Id_Platform),
   FOREIGN KEY(Id_Work) REFERENCES Work(Id_Work)
);

CREATE TABLE Users_Keyword(
   Id_Users INT,
   Id_Keyword INT,
   PRIMARY KEY(Id_Users, Id_Keyword),
   FOREIGN KEY(Id_Users) REFERENCES Users(Id_Users),
   FOREIGN KEY(Id_Keyword) REFERENCES Keyword(Id_Keyword)
);
