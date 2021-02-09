const { Todo } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: +req.params.id,
      },
    });
    if (todo.UserId === req.user.id) {
      next();
    } else {
      next({ name: 'authorization' })
    }
  } catch (error) {
    next(error)
  }
};
