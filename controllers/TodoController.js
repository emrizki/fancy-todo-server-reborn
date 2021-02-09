const { Todo } = require('../models');

class TodoController {
  static async createTodo(req, res, next) {
    try {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        UserId: req.user.id
      };

      const newTodo = await Todo.create(payload);
      res.status(201).json(newTodo);
    } catch (error) {
      if (error.errors[0].path === 'due_date') {
        next({name: 'due_date', message: error.errors[0].message})
      } else {
        next(error)
      }
    }
  }

  static async getAllTodos(req, res, next) {
    try {
      const todos = await Todo.findAll({
        where: {
          UserId: +req.user.id
        }
      });
      res.status(200).json(todos);
    } catch (error) {
      next(error)
    }
  }

  static async getTodoById(req, res, next) {
    try {
      const id = +req.params.id;
      const todo = await Todo.findOne({
        where: {
          id: id,
          UserId: req.user.id
        }
      });
      if (todo) {
        res.status(200).json(todo);
      } else {
        next({name: 'todoNotFound'})
      }
    } catch (error) {
      next(error)
    }
  }

  static async updateTodo(req, res, next) {
    try {
      const id = +req.params.id;
      const payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
      };

      const todo = await Todo.update(payload, {
        where: { id },
        returning: true,
      });
      if (todo[0] === 0) {
        next({name: 'todoNotFound'})
      } else {
        res.status(200).json(todo[1][0]);
      }
    } catch (error) {
      if (error.errors[0].path === 'due_date') {
        next({name: 'due_date', messsage: error.errors[0].message})
      } else {
        next(error)
      }
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const id = +req.params.id;

      const payload = {
        status: req.body.status,
      };

      const todo = await Todo.update(payload, {
        where: { id },
        returning: true,
      });

      if (todo[0] === 0) {
        next({name: 'todoNotFound'})
      } else {
        res.status(200).json(todo[1][0]);
      }
    } catch (error) {
      if (error.errors[0].path === 'status') {
        next({name: 'status'})
      } else {
        next(error)
      }
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const id = +req.params.id;
      const todo = await Todo.destroy({
        where: { id },
      });
      if (todo) {
        res.status(200).json({ message: 'Todo success to delete' });
      } else {
        next({name: 'todoNotFound'})
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TodoController;
