const router = require('express').Router()
const {Advisor, Appointment} = require('./db/models')
module.exports = router

router.post('/webhook', async (req, res, next) => {
  try {
    const intent = req.body.queryResult.intent.displayName
    const params = req.body.queryResult.parameters
    console.log({intent, params})
    const response = await createResponse(intent, params)
    res.json(response)
  } catch (err) {
    res.sendStatus(500)
  }
})

async function createResponse(intent, params) {
  let returnedObj = {
    fulfillmentText: '',
    fulfillmentMessages: [
      {
        text: {text: ['']}
      }
    ]
  }
  switch (intent) {
    case 'Default Welcome Intent':
      returnedObj.fulfillmentText = returnedObj.fulfillmentMessages[0].text.text[0] =
        'Welcome to the Academic Advising Center! How can I help you?'
      return returnedObj
    case 'List Available Advisers':
      const response = await Advisor.findAll({
        where: {
          available: true
        }
      })
      const advisors = response.map(
        item => `${item.dataValues.firstname} ${item.dataValues.lastname}`
      )
      const insertText = advisors.join(', ').replace(/, ([^,]*)$/, ' and $1')
      const text = [
        `Sure. We have ${insertText} available. Do you want to make an appointment with them?`,
        `Sure. ${insertText} are available right now. Do you want to make an appointment with them?`
      ]
      returnedObj.fulfillmentText = returnedObj.fulfillmentMessages[0].text.text[0] = randomChoice(
        text
      )
      return returnedObj
    case 'List Available Advisers - yes':
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
        returnedObj.fulfillmentText = returnedObj.fulfillmentMessages[0].text.text[0] =
          "Sorry, I wasn't able to find the advisor you mentioned."
        return returnedObj
      }
      // set the appointment
      await Appointment.create({
        studentId: 1,
        advisorId: res.dataValues.id,
        apptime: new Date(time)
      })
      returnedObj.fulfillmentText = returnedObj.fulfillmentMessages[0].text.text[0] =
        'I have made the appointment for you. Is there anything else I can help you with?'
      return returnedObj
    default:
      return returnedObj
  }
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
