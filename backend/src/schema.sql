CREATE DATABASE treina_lider;
USE treina_lider;

-- Tabela de Coaches
CREATE TABLE Coach (
    id INT AUTO_INCREMENT PRIMARY KEY,
    coachName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela de Usuários
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    location VARCHAR(255)
);

-- Tabela de Treinamentos
CREATE TABLE Training (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trainingName VARCHAR(255) NOT NULL,
    coachId INT,
    FOREIGN KEY (coachId) REFERENCES Coach(id)
);

-- Tabela de Relacionamento Usuário-Treinamento
CREATE TABLE UserTraining (
    userId INT,
    trainingId INT,
    PRIMARY KEY (userId, trainingId),
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (trainingId) REFERENCES Training(id) ON DELETE CASCADE
);