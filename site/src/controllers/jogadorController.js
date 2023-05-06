var jogadorModel = require("../models/jogadorModel.js");

var sessoes = [];

function testar(req, res) {
   console.log("ENTRAMOS NA jogadorController");
   res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
   jogadorModel.listar()
      .then(function(resultado) {
         if(resultado.length > 0) {
            res.status(200).json(resultado);
         } else {
            res.status(204).send("Nenhum resultado encontrado!");
         }
      }).catch(
         function(erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
         }
      );
}

function cadastrar(req, res) {
   var nome = req.body.nomeServer;

   if(nome == undefined) {
      res.status(4000).send("Seu nome está undefined!");
   }

   jogadorModel.cadastrar(nome)
      .then(
         function(resultado) {
            res.json(resultado);
         }
      ).catch(
         function (erro) {
            console.log(erro);
            console.log(
               "\nHouve um erro ao realizar o cadastro1 Erro: ", erro.sqlMessage
            );
         }
      )
}

module.exports = {
   testar,
   listar,
   cadastrar
}