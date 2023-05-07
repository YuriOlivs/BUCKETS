CREATE DATABASE dbBUCKETS;
USE dbBUCKETS;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
) auto_increment = 100;

ALTER TABLE usuario ADD CONSTRAINT verifEmail UNIQUE(email);

CREATE TABLE franquia( 
	idFranquia INT PRIMARY KEY AUTO_INCREMENT, 
    cidade VARCHAR(50), 
    nome VARCHAR(50), 
    conferencia VARCHAR(50) 
); 

CREATE TABLE jogador( 
	idJogador INT PRIMARY KEY AUTO_INCREMENT, 
    nome VARCHAR(100), 
    fkFranquia INT, 
    FOREIGN KEY (fkFranquia) REFERENCES franquia(idFranquia) 
); 

CREATE TABLE stats( 
	idStats INT PRIMARY KEY AUTO_INCREMENT, 
    pontos FLOAT, 
    assists FLOAT, 
    rebotes FLOAT, 
    tocos FLOAT, 
    arrmsErrados FLOAT, 
    arrmsCertos FLOAT, 
    lancesLivresCertos FLOAT, 
    lancesLivresErrados FLOAT, 
    minutosJogados FLOAT, 
    faltasCometidas FLOAT, 
    faltasSofridas FLOAT, 
    roubosBola FLOAT,
    dataStat DATE, 
    fkJogador INT,	 
    CONSTRAINT fkJogadorStats FOREIGN KEY (fkJogador) REFERENCES jogador(idJogador) 
); 

INSERT INTO franquia 
VALUES 
(null, 'Philadelphia', '76ers', 'Leste'), 
(null, 'Boston', 'Celtics', 'Leste'), 
(null, 'Chicago', 'Bulls', 'Leste'), 
(null, 'Miami', 'Heat', 'Leste'), 
(null, 'Milwaukee', 'Bucks', 'Leste'), 
(null, 'Houston', 'Rockets', 'Oeste'), 
(null, 'Dallas', 'Mavericks', 'Oeste'), 
(null, 'Sacramento', 'Kings', 'Oeste'), 
(null, 'Golden State', 'Warriors', 'Oeste'), 
(null, 'Charlotte', 'Hornets', 'Leste'), 
(null, 'Detroit', 'Pistons', 'Leste'), 
(null, 'Brooklyn', 'Nets', 'Leste'), 
(null, 'New York', 'Knicks', 'Leste'), 
(null, 'Denver', 'Nuggets', 'Oeste'), 
(null, 'Phoenix', 'Suns', 'Oeste'), 
(null, 'Utah', 'Jazz', 'Oeste'), 
(null, 'Cleveland', 'Cavaliers', 'Leste'), 
(null, 'Atlanta', 'Hawks', 'Leste'), 
(null, 'Washington', 'Wizards', 'Oeste'), 
(null, 'Oklahoma City', 'Thunder', 'Oeste'), 
(null, 'Memphis', 'Grizzlies', 'Oeste'), 
(null, 'San Antonio', 'Spurs', 'Oeste'), 
(null, 'Minnesota', 'Timberwolves', 'Oeste'), 
(null, 'Toronto', 'Raptors', 'Leste'), 
(null, 'Indiana', 'Pacers', 'Leste'), 
(null, 'Orlando', 'Magic', 'Leste'), 
(null, 'New Orleans', 'Pelicans', 'Oeste'), 
(null, 'Portland', 'Trail Blazers', 'Oeste'), 
(null, 'Los Angeles', 'Lakers', 'Oeste'), 
(null, 'Los Angeles', 'Clippers', 'Oeste'); 

SELECT * FROM usuario;
SELECT * FROM jogador;
SELECT * FROM franquia;
SELECT * FROM stats;

SELECT * FROM jogador JOIN franquia 
	ON fkFranquia = idFranquia 
		WHERE conferencia = 'Oeste'; 