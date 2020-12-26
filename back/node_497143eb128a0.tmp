const venom = require('venom-bot')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes/app')

const app = express()

app.use(cors())
app.use(bodyParser.json())    //pesquisar isso
app.use(bodyParser.urlencoded({extended: false})) //pesquisar isso

let cliente 

venom
    .create({
        autoClose: 9999999999,
    })
    .then((client) => cliente = client)
    .catch((erro) => {
        console.log(erro);
    });

app.use('/', routes)

app.listen('3030', ()=>{
    console.log('rodando em 3030')
})
