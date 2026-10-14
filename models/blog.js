const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

const getCurrentYear = () => {
  const date = new Date()
  return date.getFullYear()
}

class Blog extends Model{}
Blog.init({
  id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }, 
  author: {
    type: DataTypes.TEXT
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
    defaultValue: 0,
    validate: {
      isInt: true
    }
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      isInt: true,
      min: 1991,
      max: getCurrentYear()
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog'
})

module.exports = Blog