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
   var pontos = req.body.pontosServer;
   var assists = req.body.assistsServer;
   var rebotes = req.body.rebotesServer;
   var tocos = req.body.tocosServer;
   var arrmsErrados = req.body.arrmsErradosServer;
   var arrmsCertos = req.body.arrmsCertosServer;
   var llCertos = req.body.llCertosServer;
   var llErrados = req.body.llErradosServer;
   var minutos = req.body.minutosServer;
   var foulCometidas = req.body.foulCometidasServer;
   var foulSofridas = req.body.foulSofridasServer;
   var roubosBola = req.body.roubosBolaServer;

   if (nome === undefined) {
      return res.status(400).send("O nome está undefined!");
   } else if (pontos === undefined) {
      return res.status(400).send("Os pontos estão undefined!");
   } else if (assists === undefined) {
      return res.status(400).send("Os assists estão undefined!");
   } else if (rebotes === undefined) {
      return res.status(400).send("Os rebotes estão undefined!");
   } else if (tocos === undefined) {
      return res.status(400).send("Os tocos estão undefined!");
   } else if (llErrados === undefined) {
      return res.status(400).send("Os lances livres errados estão undefined!");
   } else if (llCertos === undefined) {
      return res.status(400).send("Os lances livres certos estão undefined!");
   } else if (arrmsErrados === undefined) {
      return res.status(400).send("Os arremessos errados estão undefined!");
   } else if (arrmsCertos === undefined) {
      return res.status(400).send("Os arremessos certos estão undefined!");
   } else if (foulCometidas === undefined) {
      return res.status(400).send("As faltas cometidas estão undefined!");
   } else if (foulSofridas === undefined) {
      return res.status(400).send("As faltas sofridas estão undefined!");
   } else if (minutos === undefined) {
      return res.status(400).send("Os minutos estão undefined!");
   } else if (roubosBola === undefined) {
      return res.status(400).send("Os roubos de bola estão undefined!");
   }

   jogadorModel.cadastrar(nome, pontos, assists, rebotes, tocos, arrmsErrados, arrmsCertos, llErrados, llCertos, minutos, foulCometidas, foulSofridas, roubosBola)
      .then(
         function(resultado) {
            res.json(resultado);
         }
      ).catch(
         function (erro) {
            console.log(erro);
            console.log(
               "\nHouve um erro ao realizar o cadastro Erro: ", erro.sqlMessage
            );
         }
      )

}



module.exports = {
   testar,
   listar,
   cadastrar
}
