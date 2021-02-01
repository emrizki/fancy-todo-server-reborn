const router = require('express').Router()
const { TodoController } = require('../controllers')

router.get('/', TodoController.getAllTodos)

module.exports = router