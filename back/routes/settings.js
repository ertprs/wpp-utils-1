const express = require('express')
const routes = express.Router()
const connection = require('../bd/index')

routes.get('/', (req, res)=>{
    let {name, email, number} = req.body

    connection.query(`SELECT * FROM settings `, (error, results, fields)=>{
        if(error) console.log(error)

        if(results.length === 0){
            connection.query(`INSERT INTO settings (name, email, number) VALUES('', '', '')`, () => {
                connection.query(`SELECT * FROM settings `, (error, results, fields)=>{
                    res.send(results[0])
                })
            })
        }else{
            res.send(results[0])
        }
    })
})

routes.post('/', (req, res)=>{
    let {name, email, number} = req.body

    connection.query(`UPDATE settings SET name='${name}', email='${email}', number='${number}'`)
})

module.exports = routes