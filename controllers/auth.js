const { request } = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const mysql = require('mysql')
const db = mysql.createConnection({
    //Os dados da conexão com o banco de dados estão no arquivo .env
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: 3308,
    database: process.env.DATABASE
})

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).render('login', {message: 'Please provide an email and/or password'})
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results)
            if(!results || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render('login', {message: 'Email or password is incorrect'})
            }
            else{
                const id = results[0].id;
                const token = jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

                console.log('token: ' + token)

                const cookieOptions = {expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), httpOnly: true}
                
                res.cookie('jwt', token, cookieOptions)
                res.status(200).redirect('/')
            }

            
        })
    }
    catch(error){
        console.log(error)
    }
}

exports.register = (req, res) => {
    console.log(req.body)

    // ---------- Forma convensional de buscar os dados do formulário de registro ----------
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirm = req.body.passwordConfirm;

    // ---------- Forma desestruturada de buscar os dados do formulário de registro ----------
    const {name, email, password, passwordConfirm} = req.body

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){ //Caso um erro apareça
            console.log(error)
        }

        if(results.length > 0){ //Caso haja um resultado dessa pesquisa
            return res.render('register', {message: 'That email is already in use'})
        }
        else if(password !== passwordConfirm){ //Caso as senhas não batam
            return res.render('register', {message: 'The passwords do not match'})
        }

        let hashedPassword = await bcrypt.hash(password, 8); //hash(o que eu quero encriptar, quantas vezes eu quero encriptar)
        console.log('hashed: ' + hashedPassword)

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (error, results) => {
            if(error){
                console.log(error)
            }
            else{
                console.log(results)
                return res.render('register', {message: 'User registered'})
            }
        })
    })

    

}