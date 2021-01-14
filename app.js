const express = require('express');
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