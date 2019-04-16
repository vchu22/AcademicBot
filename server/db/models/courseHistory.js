const Sequelize = require('sequelize')
const db = require('../db')

const CourseHistory = db.define('courseHistory', {
  grade: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 4
    }
  },
  term: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['FALL', 'WINTER', 'SPRING', 'SUMMER']]
    }
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1900
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['TAKEN', 'TAKING']]
    }
  }
})

module.exports = CourseHistory
