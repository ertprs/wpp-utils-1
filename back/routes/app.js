const express = require('express')
const routes = express.Router()
const connection = require('../bd/index')

routes.post('/saveNewRule', (req, res)=>{
    let { title, type, text, caseYes, caseNo } = req.body
    connection.query(`INSERT INTO rules (rule_title, rule_type, rule_text, rule_case_yes, rule_case_no) VALUES('${title}', '${type}', '${text}', '${caseYes}', '${caseNo}')`, (error, results, fields)=>{
        if(error) console.log(error)

        res.send('inseridoo')
    })
})

routes.get('/list', (req, res)=>{

    connection.query(`SELECT * FROM rules`, (error, results, fields)=>{
        if(error) console.log(error)

        res.send(results)
    })
})

routes.post('/sendMessage', (req, res)=> {
    let {initialMessage, history} = req.body

    start()

    function start() {
        let formatedOptions = ''

        req.body.options.forEach((option, index) => {
            formatedOptions+=`\n*${index+1}* - ${option}`
        })

        cliente.sendText(
        '5514999040647@c.us', `${initialMessage}\n${formatedOptions}`
        )
    }
})

module.exports = routes