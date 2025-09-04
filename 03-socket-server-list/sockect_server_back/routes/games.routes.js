const express = require('express');
const router = express.Router();
const  { obtenerJuegos} = require('../controllers/games.controller');


router.get('/', obtenerJuegos)

module.exports = router;