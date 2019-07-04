var express = require('express');
var router = express.Router();
const cliente = require('../bd/bd');


/* GET home page. */
router.get('/api/todo', function(req, res, next) {
  cliente.getTodo(req,res);
});
router.get('/api/anio/:anio', function(req, res, next) {
  cliente.getAnio(req,res);
});
router.get('/api/mes/:fecha', function(req, res, next) {
  cliente.getMes(req,res);
});
router.get('/api/dia/:fecha', function(req, res, next) {
  cliente.getDia(req,res);
});
router.get('/api/fecha_importe_dolares', function(req, res, next) {
  cliente.getFechaImporteDolares(req,res);
});
router.get('/api/tipo_cambio', function(req, res, next) {
  cliente.getTipoCambio(req,res);
});

module.exports = router;
