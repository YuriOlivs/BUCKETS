var database  = require("../database/config");

function listar() {
   console.log("ACESSEI O JOGADOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
   var instrucao = `
      SELECT * FROM jogador ORDER BY dataStat;
   `;
   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
}

function cadastrar(nome, pontos, assists, rebotes, tocos, arrmsErrados, arrmsCertos, llCertos, llErrados, minutos, foulCometidas, foulSofridas, roubosBola) {
   console.log("ACESSEI O JOGADOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, pontos, assists, rebotes, tocos, arrmsErrados, arrmsCertos, llCertos, llErrados, minutos, foulCometidas, foulSofridas, roubosBola);

   var instrucao = `
   INSERT INTO jogador (nome) VALUES ('${nome}');
   `;

   var instrucao2 = `
      INSERT INTO stats (pontos, assists, rebotes, tocos, arrmsErrados, arrmsCertos, lancesLivresCertos, lancesLivresErrados, minutosJogados, faltasCometidas, faltasSofridas, roubosBola, dataStat, fkJogador) 
      VALUES (${pontos}, ${assists}, ${rebotes}, ${tocos}, ${arrmsErrados}, ${arrmsCertos}, ${llCertos}, ${llErrados}, '${minutos}', ${foulCometidas}, ${foulSofridas}, ${roubosBola}, CURDATE(), (SELECT idJogador FROM jogador WHERE jogador.nome = '${nome}'));
   `;

   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao), database.executar(instrucao2);
}

module.exports = {
   listar,
   cadastrar,
}