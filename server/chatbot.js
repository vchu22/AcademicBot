const router = require('express').Router()
const {Advisor} = require('./db/models')
module.exports = router

router.post('/webhook', async (req, res, next) => {
  try {
    const intent = req.body.queryResult.intent.displayName
    const params = req.body.queryResult.parameters
    console.log({intent, params})
    const response = await createResponse(intent, params)
    res.json(response)
  } catch (err) {
    res.status(404).send('Not Found')
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
    default:
      return returnedObj
  }
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
