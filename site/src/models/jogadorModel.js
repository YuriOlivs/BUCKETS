var database = require("../database/config");

function listar() {
   var instrucao = `
      SELECT * FROM jogador;
   `;
   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
};

function cadastrar(nomeJogador, posicaoJogador, timeJogador) {
   var instrucao = `
      INSERT INTO jogador (nome, posicao, fkTime) VALUES (${nomeJogador}, ${posicaoJogador}, (SELECT idFranquia FROM franquia WHERE sigla = '${timeJogador}'))
   `;

   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
}

module.exports = {
   listar,
   cadastrar,
}