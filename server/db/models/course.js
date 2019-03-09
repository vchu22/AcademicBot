const Sequelize = require('sequelize')
const db = require('../db')

const Course = db.define('course', {
  coursecode: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  coursename: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dept: {
    type: Sequelize.STRING,
    validate: {
      isIn: ['CS', 'ART', 'ENG', 'FR', 'MATH', 'BIO', 'PHYS', 'CHEM']
    }
  }
})

module.exports = Course
