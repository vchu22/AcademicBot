const Sequelize = require('sequelize')
const db = require('../db')

const Appointment = db.define('appointments', {
  apptime: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

module.exports = Appointment
