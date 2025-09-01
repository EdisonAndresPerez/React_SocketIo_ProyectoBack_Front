const express = require('express');
const router = express.Router();
const { obtenerBandas } = require('../controllers/usuarios.controller');

router.get('/', obtenerBandas);

module.exports = router;
