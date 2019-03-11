const Sequelize = require('sequelize')
const db = require('../db')

const Appointment = db.define('appointments', {
  apptime: {
    type: Sequelize.DATE
  },
  advisorId: Sequelize.INTEGER,
  studentId: Sequelize.INTEGER
})

module.exports = Appointment
