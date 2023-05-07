var express = require("express");
var router = express.Router();

var statsController = require("../controllers/statsController");

router.get("/", function (req, res) {
   statsController.testar(req, res);
});

router.get("/listar", function (req, res) {
   statsController.listar(req, res);
});

router.post("/cadastrar", function(req, res) {
   statsController.cadastrar(req, res);
});

module.exports = router;