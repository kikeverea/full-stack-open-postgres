const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: '0'
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      validYear(value) {
        const year = parseInt(value)
        const thisYear = new Date().getFullYear()

        if (year > thisYear)
          throw new Error(`Invalid creation year: ${ year }. Creation year can't be in the future`)
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'blog'
})

module.exports = Blog