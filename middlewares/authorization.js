const { Todo } = require('../models');

module.exports = async (req, res, next) => {
  // console.log('ini dari authorization')
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (todo.UserId === req.user.id) {
      next();
    } else {
      res
        .status(401)
        .json({ message: 'you are not authorize to access this todo' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
