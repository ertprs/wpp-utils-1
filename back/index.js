const wa = require('@open-wa/wa-automate')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes/app')
const connection = require('./bd/index')
const { awaitQuery } = require('./bd/index')

const app = express()

app.use(cors())
app.use(bodyParser.json())    //pesquisar isso
app.use(bodyParser.urlencoded({extended: false})) //pesquisar isso

wa.create().then(client => start(client));

const getMenu = (sequence) => {
  let menu = '\n\n'

  sequence.map((option, index) => {
    menu += `*${index}* - ${option}\n`
  })

  return menu
}

const getData = async () => {
  let operation = await connection.awaitQuery(`SELECT * FROM botoperation`)
  let sequence = operation[0].sequence.split(', ')
  operation = operation[0]

  return {operation, sequence}
}

const formatMessage = (rule, menu = false) => {
  if(menu){
    return rule.rule_text + getMenu(rule.rule_menu)
  }
  return `Você escolheu: *${rule.rule_title}*\n\n${rule.rule_text}`
}

const getRule = async (title) => {
  let rule = await connection.awaitQuery(`SELECT * FROM rules WHERE rule_title='${title}'`)
  rule = rule[0]
  return rule
}

const checkAnswer = (message, sequence) => {
  if(sequence[message.body]){

    return true

  }else{

    return false

  }
}

const nextStep = async (client, message, rule) => {

  if(rule.rule_type === 'finalizar'){

    await connection.awaitQuery(`UPDATE users SET step='initial' WHERE user='${message.from}'`)

  }else if(rule.rule_type === 'mostra_menu'){

    await connection.awaitQuery(`UPDATE users SET step='menu-${rule.rule_title}' WHERE user='${message.from}'`)

  }else if(rule.rule_type === 'sim/nao'){

    //ainda n sei

  }

}

const sendMessage = async (client, message, user, data) => {

  if(user.step === 'initial'){

    client.sendText(message.from, formatMessage({rule_text: data.operation.initial_message, rule_menu: data.sequence}, true))
    await connection.awaitQuery(`UPDATE users SET step='menu' WHERE user='${message.from}'`)

  }else if(user.step === 'menu'){

    if(checkAnswer(message, data.sequence)){

      let rule = await getRule(data.sequence[message.body])
  
      if(rule.rule_type === 'mostra_menu'){
        let sequence = rule.rule_sequence.split(', ')
        client.sendText(message.from, formatMessage({...rule, rule_menu: sequence}, true))
        //client.sendText(message.from, formatMessage({rule, rule_sequence: sequence}, true))
      }else{
        client.sendText(message.from, formatMessage(rule))        
      }

      nextStep(client, message, rule)

    }else{

      client.sendText(message.from, "Número inválido, redigite.")

    }

  }else if(user.step.indexOf('menu-') > -1){
    let ruleTitle = user.step.split("-")[1]
    let rule = await getRule(ruleTitle)

    let sequence = rule.rule_sequence.split(', ')
    rule = await getRule(sequence[message.body])
    
    if(checkAnswer(message, sequence)){

      if(rule.rule_type === 'mostra_menu'){
        let sequence = rule.rule_sequence.split(', ')
        client.sendText(message.from, formatMessage({...rule, rule_menu: sequence}, true))
      }else{
        client.sendText(message.from, formatMessage(rule))        
      }

      nextStep(client, message, rule)

    }else{

      client.sendText(message.from, "Número inválido, redigite.")

    }

  }
}

const start = (client) => {
  client.onAnyMessage( async (message) => {
    if (message.body === 'Hi' || message.body === 'hi') {
      try{
        let user = await connection.awaitQuery(`SELECT * FROM users WHERE user='${message.from}'`)
        if(user.length === 0){
          await connection.awaitQuery(`INSERT INTO users (user, step) VALUES('${message.from}', 'initial')`)
          user = await connection.awaitQuery(`SELECT * FROM users WHERE user='${message.from}'`)
        }
        let data = await getData()
        if(user[0].step === 'initial') sendMessage(client, message, user[0], data)
      }catch(e){
        console.log("erro: ",e)
      }
    }else{
      if(!isNaN(message.body)){
        let user = await connection.awaitQuery(`SELECT * FROM users WHERE user='${message.from}' AND step!='initial'`)
        if(user.length > 0){
          let data = await getData()
          sendMessage(client, message, user[0], data)
        }
      }
    }
  });
}

app.use('/', routes)

app.listen('3030', ()=>{
    console.log('rodando em 3030')
})
