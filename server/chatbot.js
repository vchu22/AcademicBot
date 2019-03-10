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
  if (intent === 'Default Welcome Intent') {
    return {
      fulfillmentText:
        'Welcome to the Academic Advising Center! How can I help you?',
      fulfillmentMessages: [
        {
          text: {
            text: [
              'Welcome to the Academic Advising Center! How can I help you?'
            ]
          }
        }
      ]
    }
  } else if (intent === 'List Available Advisers') {
    const response = await Advisor.findAll({
      where: {
        available: true
      }
    })
    const advisors = response.map(
      item => `${item.dataValues.firstname} ${item.dataValues.lastname} `
    )
    const insertText = advisors.join(', ').replace(/, ([^,]*)$/, ' and $1')
    const text = `Sure. We have ${insertText} available. Do you want to make an appointment with them?`
    return {
      fulfillmentText: text,
      fulfillmentMessages: [
        {
          text: {
            text: [text]
          }
        }
      ]
    }
  }
}
