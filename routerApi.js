const apiRouter = require('express').Router()
const userController = require('./controllers/userControllers')


apiRouter.post('/login', userController.apiLogin)

module.exports = apiRouter