const express = require('express')
const routes = express.Router()

const initial = require('./initial')
const rules = require('./rules')
const settings = require('./settings')

routes.use('/initial', initial )
routes.use('/rules', rules )
routes.use('/settings', settings )

module.exports = routes