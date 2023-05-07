var database = require("../database/config");

function listar() {
   console.log("ACESSEI O JOGADOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
   var instrucao = `
      SELECT * FROM jogador;
   `;
   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
};

function cadastrar(nomeJogador, posicaoJogador, timeJogador) {
   console.log("ACESSEI O JOGADOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeJogador, posicaoJogador, timeJogador);

   var instrucao = `
      INSERT INTO jogador (nome, posicao, fkTime) VALUES (${nomeJogador}, ${posicaoJogador}, (SELECT idFranquia FROM franquia WHERE sigla = '${timeJogador}'))
   `;

   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
}

module.exports = {
   listar,
   cadastrar
}