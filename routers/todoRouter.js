const router = require('express').Router()
const { TodoController } = require('../controllers')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.getAllTodos)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router