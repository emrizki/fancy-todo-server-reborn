'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Todo)
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'First Name is Required',
          },
        },
      },
      last_name: DataTypes.STRING,
      full_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid Email / Password Format',
          },
        },
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6],
            msg: 'Password at least 6 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate((user, options) => {
    user.full_name = `${user.first_name} ${user.last_name}`;
    if (user.last_name === '') {
      user.full_name = user.first_name;
    }
    user.password = hashPassword(user.password);
  });
  return User;
};
