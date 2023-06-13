CREATE DATABASE dbBUCKETS;
USE dbBUCKETS;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
) auto_increment = 100;

ALTER TABLE usuario ADD CONSTRAINT verifEmail UNIQUE(email);

CREATE TABLE stats( 
	idStats INT AUTO_INCREMENT, 
    pontos FLOAT, 
    assists FLOAT, 
    rebotesDef FLOAT, 
    rebotesOff FLOAT, 
	arrmsCertos FLOAT, 
    arrmsErrados FLOAT, 
    lancesLivresCertos FLOAT, 
    lancesLivresErrados FLOAT, 
	minutosJogados TIME, 
    faltasCometidas FLOAT, 
    faltasSofridas FLOAT, 
    roubosBola FLOAT,
	tocos FLOAT, 
    turnovers FLOAT,
    pie FLOAT,
    dataStat DATE, 
    fkJogador INT,	 
    CONSTRAINT fkJogadorStats FOREIGN KEY (fkJogador) REFERENCES usuario(id),
    PRIMARY KEY (idStats, fkJogador)
); 

INSERT INTO usuario VALUES
(null, 'Yuri', 'yuri', '123');

INSERT INTO stats VALUES
(NULL, 15, 6, 3, 2, 8, 3, 6, 1, '00:35:20', 2, 3, 1, 0, 2, 0.25, '2023-06-01', 100),
(NULL, 20, 4, 2, 1, 7, 2, 4, 1, '00:40:15', 1, 2, 1, 1, 2, 0.11, '2023-06-02', 100),
(NULL, 18, 8, 4, 2, 6, 3, 5, 1, '00:38:45', 3, 4, 1, 1, 3, 0.12, '2023-06-03', 100),
(NULL, 23, 5, 3, 1, 9, 2, 6, 1, '00:42:10', 2, 3, 2, 0, 2, 0.16, '2023-06-04', 100),
(NULL, 16, 7, 3, 2, 7, 2, 4, 1, '00:36:55', 2, 3, 1, 1, 2, 0.13, '2023-06-05', 100),
(NULL, 14, 5, 2, 1, 7, 2, 5, 1, '00:34:45', 2, 3, 1, 0, 2, 0.08, '2023-06-06', 100),
(NULL, 17, 6, 3, 2, 8, 3, 6, 1, '00:37:25', 2, 3, 1, 1, 2, 0.26, '2023-06-07', 100),
(NULL, 19, 4, 2, 1, 7, 2, 4, 1, '00:39:15', 1, 2, 1, 0, 2, 0.24, '2023-06-08', 100),
(NULL, 21, 7, 4, 2, 9, 3, 5, 1, '00:41:35', 2, 3, 2, 1, 2, 0.22, '2023-06-09', 100),
(NULL, 16, 5, 3, 1, 6, 2, 4, 1, '00:36:55', 2, 3, 1, 0, 2, 0.17, '2023-06-10', 100);

SELECT * FROM stats;

SELECT DATE_FORMAT(dataStat, '%d/%m/%y'), pie as dataStat FROM stats
JOIN usuario ON fkJogador = usuario.id
WHERE usuario.id = 100;

SELECT pontos, DATE_FORMAT(dataStat, "%d/%m/%y") as dataStat FROM stats 
JOIN usuario ON fkJogador = usuario.id
WHERE usuario.id = 100;

SELECT * FROM usuario;

SELECT DATE_FORMAT(dataStat, "%d/%m/%y"), pie FROM stats 
JOIN usuario ON fkJogador = usuario.id
WHERE usuario.id = 100
LIMIT 10;
  
SELECT COUNT(pie) as qtd_acima FROM stats
JOIN usuario ON fkJogador = usuario.id
WHERE usuario.id = 100 AND pie > 0.13;

SELECT AVG(pie) as media_pie FROM stats
JOIN usuario ON fkJogador = usuario.id
WHERE usuario.id = 100;

SELECT AVG(pontos) as media_pts, AVG(pie) as media_pie, AVG(assists) as media_ast FROM stats
JOIN usuario ON fkJogador = usuario.id
WHERE usuario.id = 100;

SELECT AVG(soma_campos) AS media_soma
FROM (
    SELECT rebotesOff + rebotesDef AS soma_campos
    FROM stats
    JOIN usuario ON fkJogador = usuario.id
    WHERE usuario.id = 100
) subconsulta;

SELECT AVG(assists) as media_pie FROM stats
JOIN usuario ON fkJogador = usuario.id
WHERE usuario.id = 100;

SELECT pontos, pie FROM stats
JOIN usuario ON fkJogador = usuario.id
WHERE usuario.id = 100
LIMIT 6;