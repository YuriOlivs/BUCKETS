var express = require("express");
var router = express.Router();

var statsController = require("../controllers/statsController");

router.get("/", function (req, res) {
   statsController.testar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
   statsController.listar(req, res);
});

router.post("/cadastrar", function(req, res) {
   statsController.cadastrar(req, res);
});

router.get("/listarPIE/:idUsuario", function (req, res) {
   statsController.listarPIE(req, res);
});

router.get("/listarAbaixoDaMedia/:idUsuario", function (req, res) {
   statsController.listarAbaixoDaMedia(req, res);
});

router.get("/listarAcimaDaMedia/:idUsuario", function (req, res) {
   statsController.listarAcimaDaMedia(req, res);
});

router.get("/listarNaMedia/:idUsuario", function (req, res) {
   statsController.listarNaMedia(req, res);
});

router.get("/listarPontos/:idUsuario", function (req, res) {
   statsController.listarPontos(req, res);
});

router.get("/listarAvgPiePts/:idUsuario", function (req, res) {
   statsController.listarAvgPiePts(req, res);
});

router.get("/listarMediaDeReb/:idUsuario", function (req, res) {
   statsController.listarMediaDeReb(req, res);
});

module.exports = router;