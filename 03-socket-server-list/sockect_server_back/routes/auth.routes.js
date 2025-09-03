const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/auth.controller');
const { registerUser} = require ('../controllers/auth.controller')


// Login y register
router.post('/login', loginUser);
router.post('/register',  registerUser);

module.exports = router;
