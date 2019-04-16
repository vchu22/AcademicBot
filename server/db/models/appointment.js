const Sequelize = require('sequelize')
const db = require('../db')

const Appointment = db.define('appointments', {
  apptime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  advisorId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  studentId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Appointment
