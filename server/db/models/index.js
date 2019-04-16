const Student = require('./student')
const Advisor = require('./advisor')
const Course = require('./course')
const Appointment = require('./appointment')
const CourseHistory = require('./courseHistory')

Course.belongsToMany(Student, {through: 'courseHistory'})
Student.belongsToMany(Course, {through: 'courseHistory'})

Student.hasMany(CourseHistory)
Course.hasMany(CourseHistory)
CourseHistory.belongsTo(Student)
CourseHistory.belongsTo(Course)

Student.hasMany(Appointment)
Advisor.hasMany(Appointment)
Appointment.belongsTo(Student)
Appointment.belongsTo(Advisor)

module.exports = {
  Student,
  Advisor,
  Course,
  Appointment,
  CourseHistory
}
