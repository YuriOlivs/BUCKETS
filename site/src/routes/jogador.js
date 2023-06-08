var express = require("express");
var router = express.Router();

var jogadorController = require("../controllers/jogadorController");

router.get("/", function (req, res) {
   jogadorController.testar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
   jogadorController.listar(req, res);
});

router.post("/cadastrar", function(req, res) {
   jogadorController.cadastrar(req, res);
});

router.get("/listaPIE/:idUsuario", function (req, res) {
   jogadorController.listarPIE(req, res);
})

router.get("/listarAcimaDaMedia/:idUsuario", function (req, res) {
   jogadorController.listarAcimaDaMedia(req, res);
})

router.get("/listarAbaixoDaMedia/:idUsuario", function (req, res) {
   jogadorController.listarAbaixoDaMedia(req, res);
})

router.get("/listarNaMedia/:idUsuario", function (req, res) {
   jogadorController.listarNaMedia(req, res);
})

module.exports = router;