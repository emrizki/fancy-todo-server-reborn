const { Todo } = require('../models');

class TodoController {
  static async getAllTodos(req, res) {
    res.send('hello');
  }
}

module.exports = TodoController;
