const router = require('express').Router()
const { TodoController } = require('../controllers')
const { authorization } = require('../middlewares')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.getAllTodos)


router.get('/:id', authorization, TodoController.getTodoById)
router.put('/:id', authorization, TodoController.updateTodo)
router.patch('/:id', authorization, TodoController.updateStatus)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router