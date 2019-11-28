const {Advisor, Appointment} = require('../db/models')

async function makeAppointment(params) {
  let [firstname, lastname] = params.name.split(' ')
  let time = params.time
  console.log(firstname, lastname, typeof time, time)
  // find the advisor from database and get the id
  let res = await Advisor.findOne({
    where: {
      firstname: firstname,
      lastname: lastname
    }
  })
  if (!res) {
    return "Sorry, I wasn't able to find the advisor you mentioned."
  }
  // set the appointment
  await Appointment.create({
    studentId: 1,
    advisorId: res.dataValues.id,
    apptime: new Date(time)
  })
  return 'I have made the appointment for you. Is there anything else I can help you with?'
}

module.exports = makeAppointment
