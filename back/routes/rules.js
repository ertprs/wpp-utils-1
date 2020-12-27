const express = require('express')
const routes = express.Router()
const connection = require('../bd/index')

routes.get('/', (req, res)=>{

    connection.query(`SELECT * FROM rules`, (error, results, fields)=>{
        if(error) console.log(error)

        res.send(JSON.stringify(results))
    })
})

routes.post('/', (req, res)=>{
    let { title, type, text, sequence, caseYes, caseNo } = req.body
    sequence = sequence.join(", ")

    connection.query(`INSERT INTO rules (rule_title, rule_type, rule_text, rule_sequence, rule_case_yes, rule_case_no) VALUES('${title}', '${type}', '${text}', '${sequence}', '${caseYes}', '${caseNo}')`, (error, results, fields)=>{
        if(error) console.log(error)

        res.send('inseridoo')
    })
})



module.exports = routes