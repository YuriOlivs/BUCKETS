var database  = require("../database/config");

function listar() {
   console.log("ACESSEI O JOGADOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
   var instrucao = `
      SELECT * FROM jogador;
   `;
   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
}

function cadastrar(nome) {
   console.log("ACESSEI O JOGADOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome);

   var instrucao = `
      INSERT INTO jogador (nome) VALUES ('${nome}');
   `;
   console.log("Executando a instrução SQL: \n" + instrucao);
   return database.executar(instrucao);
}

module.exports = {
   listar,
   cadastrar
}