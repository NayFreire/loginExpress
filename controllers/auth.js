const { request } = require("express")

const mysql = require('mysql')
const db = mysql.createConnection({
    //Os dados da conexão com o banco de dados estão no arquivo .env
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: 3308,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body)

    // ---------- Forma convensional de buscar os dados do formulário de registro ----------
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

    // ---------- Forma desestruturada de buscar os dados do formulário de registro ----------
    const {name, email, password, passwordConfirm} = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
        if(error){ //Caso um erro apareça
            console.log(error)
        }

        if(results.length > 0){ //Caso haja um resultado dessa pesquisa
            return res.render('register', {message: 'That email is already in use'})
        }
        else if(password !== passwordConfirm){ //Caso as senhas não batam
            return res.render('register', {message: 'The passwords do not match'})
        }
    })

    res.send('Form submited')
}