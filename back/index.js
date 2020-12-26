const wa = require('@open-wa/wa-automate')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes/app')
const connection = require('./bd/index')

const app = express()

app.use(cors())
app.use(bodyParser.json())    //pesquisar isso
app.use(bodyParser.urlencoded({extended: false})) //pesquisar isso

wa.create().then(client => start(client));

const start = (client) => {
  client.onAnyMessage(message => {
    if (message.body === 'Hi') {
        connection.query(`SELECT * FROM users WHERE user='${message.from}'`, async (err, result, fields)=>{
            if(result.length === 0){
                connection.query(`INSERT INTO users (user, rule) VALUES('${message.from}', 'sla')`)
                //async awaitt mysql....
            }
        })
    }
  });
}
app.use('/', routes)

app.listen('3030', ()=>{
    console.log('rodando em 3030')
})
