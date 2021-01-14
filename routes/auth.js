const express = require('express');
const authController = require('../controllers/auth')
const router = express.Router();

//Rota para a página register
router.post('/register', authController.register)

module.exports = router; //exporta as rotas do router. Em app.js, uma rota carrega este arquivo e, consequentemente, suas rotas