var statsModel = require("../models/statsModel.js");

var sessoes = [];

function testar(req, res) {
   console.log("ENTRAMOS NA statsController");
   res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
   statsModel.listar()
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
   var idUsuario = req.body.idUsuarioServer;
   var pontos = req.body.pontosServer;
   var assists = req.body.assistsServer;
   var rebotesDef = req.body.rebotesDefServer;
   var rebotesOff = req.body.rebotesOffServer;
   var arrmsErrados = req.body.arrmsErradosServer;
   var arrmsCertos = req.body.arrmsCertosServer;
   var llCertos = req.body.llCertosServer;
   var llErrados = req.body.llErradosServer;
   var minutos = req.body.minutosServer;
   var foulCometidas = req.body.foulCometidasServer;
   var foulSofridas = req.body.foulSofridasServer;
   var roubosBola = req.body.roubosBolaServer;
   var tocos = req.body.tocosServer;
   var turnovers = req.body.turnoversServer;
   var pie = req.body.pieServer;

   if (pontos === undefined) {
      return res.status(400).send("Os pontos estão undefined!");
   } else if (assists === undefined) {
      return res.status(400).send("Os assists estão undefined!");
   } else if (rebotesDef === undefined) {
      return res.status(400).send("Os rebotes defensivos estão undefined!");
   } else if (rebotesOff === undefined) {
      return res.status(400).send("Os rebotes ofensivos estão undefined!");
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
   } else if(turnovers === undefined) {
      return res.status(400).send("Os turnovers estão undefined!")
   } else if(pie === undefined) {
      return res.status(400).send("O índice PIE está undefined!")
   }

   statsModel.cadastrar(pontos, assists, rebotesDef, rebotesOff, arrmsCertos, arrmsErrados, llCertos, llErrados, minutos, foulCometidas, foulSofridas, roubosBola, tocos, turnovers, pie, idUsuario)
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

function listarPIE(req, res) {
   var idUsuario = req.params.idUsuario;
   
   statsModel.listarPIE(idUsuario)
   .then(function (resposta) {
      res.json(resposta);
   })
   .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao puxar dados vindos do banco de dados", erro.sqlMessage);
   })
}

function listarAcimaDaMedia(req, res) {
   var idUsuario = req.params.idUsuario;
   
   statsModel.listarAcimaDaMedia(idUsuario)
   .then(function (resposta) {
      res.json(resposta);
   })
   .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao puxar dados vindos do banco de dados", erro.sqlMessage);
   })
}

function listarNaMedia(req, res) {
   var idUsuario = req.params.idUsuario;
   
   statsModel.listarNaMedia(idUsuario)
   .then(function (resposta) {
      res.json(resposta);
   })
   .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao puxar dados vindos do banco de dados", erro.sqlMessage);
   })
}

function listarAbaixoDaMedia(req, res) {
   var idUsuario = req.params.idUsuario;
   
   statsModel.listarAbaixoDaMedia(idUsuario)
   .then(function (resposta) {
      res.json(resposta);
   })
   .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao puxar dados vindos do banco de dados", erro.sqlMessage);
   })
}

function listarPontos(req, res) {
   var idUsuario = req.params.idUsuario;
   
   statsModel.listarPontos(idUsuario)
   .then(function (resposta) {
      res.json(resposta);
   })
   .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao puxar dados vindos do banco de dados", erro.sqlMessage);
   })
}

function listarAvgPiePts(req, res) {
   var idUsuario = req.params.idUsuario;
   
   statsModel.listarAvgPiePts(idUsuario)
   .then(function (resposta) {
      res.json(resposta);
   })
   .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao puxar dados vindos do banco de dados", erro.sqlMessage);
   })
}

function listarMediaDeReb(req, res) {
   var idUsuario = req.params.idUsuario;
   
   statsModel.listarMediaDeReb(idUsuario)
   .then(function (resposta) {
      res.json(resposta);
   })
   .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao puxar dados vindos do banco de dados", erro.sqlMessage);
   })
}

module.exports = {
   testar,
   listar,
   cadastrar,
   listarPIE,
   listarAbaixoDaMedia,
   listarAcimaDaMedia,
   listarNaMedia,
   listarPontos,
   listarAvgPiePts,
   listarMediaDeReb
}