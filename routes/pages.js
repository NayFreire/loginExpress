const express = require('express');
const router = express.Router();

//Rota para a página index
router.get('/', (req, res) => {
    res.render('index');
});

//Rota para a página register
router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router; //exporta as rotas do router. Em app.js, uma rota carrega este arquivo e, consequentemente, suas rotas