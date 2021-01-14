const express = require('express');
const path = require('path')
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' })

const app = express();
const db = mysql.createConnection({
    //Os dados da conexão com o banco de dados estão no arquivo .env
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: 3308,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public') //O módulo path, com o método join, junta caminhos de arquivos para criar um novo caminho diferente. Nesse caso, está juntando o caminho deste projeto, 'C:\Users\nayfr\TestesTecnologias\loginNode', com o caminho './public'. Dessa forma o caminho fica 'C:\Users\nayfr\TestesTecnologias\loginNode\public', apontando para a pasta públic

app.use(express.static(publicDirectory)) //Aqui se trata do uso dos elementos que estão na pasta do caminho publicDirectory

app.set('view engine', 'hbs');

db.connect((error)=> {
    if(error){
        console.log('O pai não tá conectado, porque ' + error)
    }
    else{
        console.log('O pai tá conectado')
    }
})

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>')
})

app.listen(5005, () => {
    console.log('O pai tá on')
})