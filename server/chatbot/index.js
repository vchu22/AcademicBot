const router = require('express').Router()
const {Advisor, Appointment} = require('../db/models')
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
  switch (intent) {
    case 'Default Welcome Intent':
      return fulfillmentObjFactory(
        'Welcome to the Academic Advising Center! How can I help you?'
      )
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
        `OK. ${insertText} have some available time slots. Do you want to make an appointment with them?`
      ]
      return fulfillmentObjFactory(randomChoice(text))
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
        return fulfillmentObjFactory(
          "Sorry, I wasn't able to find the advisor you mentioned."
        )
      }
      // set the appointment
      await Appointment.create({
        studentId: 1,
        advisorId: res.dataValues.id,
        apptime: new Date(time)
      })
      return fulfillmentObjFactory(
        'I have made the appointment for you. Is there anything else I can help you with?'
      )
    default:
      return fulfillmentObjFactory()
  }
}

function fulfillmentObjFactory(text = '') {
  /**
   * A factory function that returns a fulfillment object in a format that Dialogflow server can understand
   * @param {string} text   A string representing the message to be displayed to the user
   * @return {object}       An object that will be returned to the Dialogflow server
   */
  return {
    fulfillmentText: text,
    fulfillmentMessages: [
      {
        text: {text: [text]}
      }
    ]
  }
}

function randomChoice(arr) {
  /**
   * A function that randomly select a choice within an array
   * @param {array} arr An array containing all the possible responses for a given intent
   * @return {string}   A string representing the choice
   */
  return arr[Math.floor(Math.random() * arr.length)]
}
