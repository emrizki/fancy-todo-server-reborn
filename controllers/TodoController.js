const { Todo } = require('../models');

class TodoController {
  static async createTodo(req, res) {
    try {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
      };

      const newTodo = await Todo.create(payload);
      res.status(201).json(newTodo);
    } catch (error) {
      if (error.errors[0].path === 'due_date') {
        res.status(400).json({message: error.errors[0].message});
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  static async getAllTodos(req, res) {
    try {
      const todos = await Todo.findAll();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getTodoById(req, res) {
    try {
      const id = +req.params.id;
      const todo = await Todo.findByPk(id);
      if (todo === null) {
        res.status(404).json({ message: 'Todo Not Found' });
      } else {
        res.status(200).json(todo);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async updateTodo(req, res) {
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
        res.status(404).json({ message: 'Todo Not Found' });
      } else {
        res.status(200).json(todo[1][0]);
      }
    } catch (error) {
      if (error.errors[0].path === 'due_date') {
        res.status(400).json(error.errors[0]);
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  static async updateStatus(req, res) {
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
        res.status(404).json({ message: 'Todo Not Found' });
      } else {
        res.status(200).json(todo[1][0]);
      }
    } catch (error) {
      if (error.errors[0].path === 'status') {
        res.status(400).json(error.errors[0]);
      } else {
        rezs.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  static async deleteTodo(req, res) {
    try {
      const id = +req.params.id;
      const todo = await Todo.destroy({
        where: { id },
      });

      if (todo === 0) {
        res.status(404).json({ message: 'Todo Not Found' });
      } else {
        res.status(200).json({ message: 'Todo success to delete' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = TodoController;
