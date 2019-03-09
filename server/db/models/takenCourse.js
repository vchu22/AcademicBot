const Sequelize = require('sequelize')
const db = require('../db')

const TakenCourse = db.define('takenCourse', {
  grade: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 4
    }
  }
})

module.exports = TakenCourse
