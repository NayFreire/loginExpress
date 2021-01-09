const express = require('express');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3308,
    database: 'loginexpressnode'
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