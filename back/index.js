const venom = require('venom-bot')
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

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

app.post('/', (req, res)=> {
    
    start()

    function start() {
        cliente.sendText('5514999040647@c.us', `Essa é a messagem inicial: ${req.body.msg} Esse é o menu de opções: ${req.body.menu}`)
    }

})

app.listen('3030', ()=>{
    console.log('rodando em 3030')
})
