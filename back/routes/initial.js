const express = require('express')
const routes = express.Router()
const connection = require('../bd/index')

routes.get('/', (req, res)=>{
    connection.query(`SELECT * FROM botoperation `, (error, results, fields)=>{
        if(error) console.log(error)

        if(results.length === 0){
            connection.query(`INSERT INTO botoperation (initial_message, sequence) VALUES('', '')`, ()=>{
                connection.query(`SELECT * FROM botoperation `, (error, results, fields)=>{
                    res.send({
                        initial_message: results[0].initial_message,
                        sequence: results[0].sequence,
                    })
                })
            })
        }else{
            res.send({
                initial_message: results[0].initial_message,
                sequence: results[0].sequence,
            })
        }
    })
})

routes.post('/', (req, res)=>{
    let {initial_message, sequence} = req.body
    sequence = sequence.join(", ")

    connection.query('SELECT * FROM botoperation', (error, results, fields) => {
        if(results.length === 0){
            connection.query(`INSERT INTO botoperation (initial_message, sequence) VALUES('${initial_message}', '${sequence}')`, ()=>{})
        }else{
            connection.query(`UPDATE botoperation SET initial_message  = '${initial_message}', sequence = '${sequence}'`, (er, res, fields)=>{
                console.log((er))
            })
        }
    })
})

module.exports = routes