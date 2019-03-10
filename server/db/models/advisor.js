const Sequelize = require('sequelize')
const db = require('../db')

const Advisor = db.define('advisor', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  available: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Advisor
