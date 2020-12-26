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

const initial = async (client, message, sequence, operation) => {
  let menu = ''

  sequence.map((option, index) => {
    menu += `*${index}* - ${option}\n`
  })

  client.sendText(message.from, `${operation[0].initial_message} \n\n${menu}`)
  await connection.awaitQuery(`UPDATE users SET step=step+1 WHERE user='${message.from}'`)
}

const sendOtherMsg = async (client, message, sequence, operation, user) => {
  let currentRuleTitle = sequence[user[0].step-1]

  let rule = await connection.awaitQuery(`SELECT * FROM rules WHERE rule_title='${currentRuleTitle}'`)

  client.sendText(message.from, `Título: *${rule[0].rule_title}*\n\n${rule[0].rule_text}`)
  await connection.awaitQuery(`UPDATE users SET step=step+1 WHERE user='${message.from}'`)
}

const start = (client) => {
  client.onAnyMessage( async (message) => {
    if (message.body === 'Hi') {
      try{
        let user = await connection.awaitQuery(`SELECT * FROM users WHERE user='${message.from}'`)
        if(user.length === 0){
          await connection.awaitQuery(`INSERT INTO users (user, step) VALUES('${message.from}', 0)`)
          user = await connection.awaitQuery(`SELECT * FROM users WHERE user='${message.from}'`)
        }

        let operation = await connection.awaitQuery(`SELECT * FROM botoperation`)
        let sequence = operation[0].sequence.split(', ')

        if(user[0].step === 0) initial(client, message, sequence, operation)
        else sendOtherMsg(client, message, sequence, operation, user)

        //let rule = await connection.awaitQuery(`SELECT * FROM rules WHERE rule_title='${sequence[user[0].step]}'`)
        
        //client.sendText(message.from, rule[0].rule_text)
        //await connection.awaitQuery(`UPDATE users SET step=step+1 WHERE user='${message.from}'`)

      }catch(e){
        console.log("erro: ",e)
      }
    }else{
      //verificar se já ta cadastrado no banco, se tiver, continuar
      //verificar o regra atual e se a resposta dele coincide com as que deve digitar, se n coindicir, avisar erro.
      //Caso contrário, chamar o sendOtherMsg
      //mudar de step para nome da regra atual e assim identificar as repostas
    }
  });
}
app.use('/', routes)

app.listen('3030', ()=>{
    console.log('rodando em 3030')
})
