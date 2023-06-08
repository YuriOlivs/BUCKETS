var database = require("../database/config");

function listar() {
   // console.log("ACESSEI O JOGADOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
   
   var instrucao = `
   SELECT idStats, pontos, assists, rebotesDef, rebotesOff, arrmsErrados, arrmsCertos, lancesLivresCertos, lancesLivresErrados, faltasCometidas, faltasSofridas, roubosBola, tocos, turnovers, DATE_FORMAT(dataStat, '%d/%m/%y') as 'data_stat', fkJogador FROM stats
      ORDER BY dataStat;
   `;

   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
}

function cadastrar(pontos, assists, rebotesDef, rebotesOff, arrmsCertos, arrmsErrados, lancesLivresCertos, lancesLivresErrados, minutosJogador, faltasCometidas, faltasSofridas, roubosBola, tocos, turnovers, pie,idUsuario) {
   var instrucao = `
   INSERT INTO stats (pontos, assists, rebotesDef, rebotesOff, arrmsCertos, arrmsErrados, lancesLivresCertos, lancesLivresErrados, minutosJogados, faltasCometidas, faltasSofridas, roubosBola, tocos, turnovers, pie, dataStat, fkJogador) 
      VALUES (${pontos}, ${assists}, ${rebotesDef}, ${rebotesOff}, ${arrmsCertos}, ${arrmsErrados}, ${lancesLivresCertos}, ${lancesLivresErrados}, '${minutosJogador}', ${faltasCometidas}, ${faltasSofridas}, ${roubosBola}, ${tocos}, ${turnovers}, ${pie}, CURDATE(), ${idUsuario});
   `;

   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
}
function listarPIE(idUsuario) {
   var instrucao = `
      SELECT dataStat, pie FROM stats 
      JOIN usuario ON fkJogador = usuario.id
      WHERE usuario.id = ${idUsuario}
      GROUP BY dataStat
      LIMIT 10;
   `;

   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao); 
}

function listarAcimaDaMedia(idUsuario) {
   var instrucao = `
   
   `;

   console.log("Executando a instrução SQL: \n"+ instrucao);
   return database.executar(instrucao);
}

function listarAcimaDaMedia(idUsuario) {
   var instrucao = `
   SELECT COUNT(pie) as qtd_acima FROM stats
   JOIN usuario ON fkJogador = usuario.id
   WHERE usuario.id = ${idUsuario} AND pie > 0.13;
   `;

   console.log("Executando a instrução SQL: \n"+ instrucao);
   return database.executar(instrucao);
}

function listarNaMedia(idUsuario) {
   var instrucao = `
   SELECT COUNT(pie) as qtd_media FROM stats
   JOIN usuario ON fkJogador = usuario.id
   WHERE usuario.id = ${idUsuario} AND 
   pie BETWEEN 0.12 AND 0.14;
   `;

   console.log("Executando a instrução SQL: \n"+ instrucao);
   return database.executar(instrucao);
}

function listarAbaixoDaMedia(idUsuario) {
   var instrucao = `
   SELECT COUNT(pie) as qtd_abaixo FROM stats
   JOIN usuario ON fkJogador = usuario.id
   WHERE usuario.id = ${idUsuario} AND pie < 0.12;
   `;

   console.log("Executando a instrução SQL: \n"+ instrucao);
   return database.executar(instrucao);
}


function listarDatasStats(idUsuario) {
   var instrucao = `
   SELECT DATE_FORMAT(dataStat, '%d/%m/%y') as datas, idStats as dataStat FROM stats
   JOIN usuario ON fkJogador = usuario.id
   WHERE usuario.id = ${idUsuario};
   `;

   console.log("Executando a instrução SQL: \n"+ instrucao);
   return database.executar(instrucao);
}

function listarPontos(idUsuario) {
   var instrucao = `
   SELECT pontos, DATE_FORMAT(dataStat, "%d/%m/%y") as dataStat FROM stats 
   JOIN usuario ON fkJogador = ${idUsuario}
   WHERE usuario.id = 100
   LIMIT 12;
   `;

   console.log("Executando a instrução SQL: \n"+ instrucao);
   return database.executar(instrucao);
}  

module.exports = {
   listar,
   cadastrar,
   listarPIE,
   listarDatasStats,
   listarAbaixoDaMedia,
   listarAcimaDaMedia,
   listarNaMedia,
   listarPontos
}