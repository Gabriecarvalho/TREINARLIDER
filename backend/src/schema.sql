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
    videoLink VARCHAR(255),
    description TEXT,
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

--Comando para interir coachs e treinamentos
USE treina_lider;

-- Inserir treinadores
INSERT INTO Coach (coachName, email) VALUES ('John Doe', 'john.doe@example.com');
INSERT INTO Coach (coachName, email) VALUES ('Edi born', 'ediborn@example.com');
INSERT INTO Coach (coachName, email) VALUES ('Alice Johnson', 'alice.johnson@example.com');

-- Inserir treinamentos
INSERT INTO Training (trainingName, coachId, videoLink, description) VALUES 
('Treinamento de liderança', 1, 'https://www.youtube.com/watch?v=FthieE5qfwg', 
'Este treinamento de liderança é projetado para ajudar os participantes a desenvolver habilidades essenciais de liderança. O curso cobre tópicos como comunicação eficaz, tomada de decisão, resolução de conflitos e motivação de equipe. Os participantes aprenderão a liderar com confiança e a inspirar suas equipes a alcançar resultados excepcionais.');

INSERT INTO Training (trainingName, coachId, videoLink, description) VALUES 
('Habilidades de comunicação', 2, 'https://www.youtube.com/watch?v=vfgI80iqtSw', 
'Este curso de habilidades de comunicação é ideal para quem deseja melhorar suas habilidades interpessoais e de comunicação. O treinamento aborda técnicas de escuta ativa, comunicação verbal e não verbal, e como transmitir mensagens de forma clara e eficaz. Os participantes sairão do curso com ferramentas práticas para melhorar suas interações profissionais e pessoais.');

INSERT INTO Training (trainingName, coachId, videoLink, description) VALUES 
('Gerenciamento de tempo e planejamento', 3, 'https://www.youtube.com/watch?v=PzUZsoyMXuY', 
'Este treinamento de gerenciamento de tempo e planejamento é projetado para ajudar os participantes a maximizar sua produtividade e eficiência. O curso cobre técnicas de priorização, organização e planejamento de tarefas, além de estratégias para evitar a procrastinação. Os participantes aprenderão a gerenciar seu tempo de forma eficaz e a alcançar seus objetivos com mais facilidade.');