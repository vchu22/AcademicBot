const router = require('express').Router()
module.exports = router

router.post('/webhook', (req, res, next) => {
  try {
    const intent = req.body.queryResult.intent.displayName
    const params = req.body.queryResult.parameters
    console.log({intent, params})
    const response = createResponse()
    console.log(response)
    res.json(response)
  } catch (err) {
    res.status(404).send('Not Found')
  }
})

function createResponse() {
  return {
    fulfillmentText: 'This is just a response',
    fulfillmentMessages: [
      {
        text: {
          text: ['This is just a response']
        }
      }
    ]
  }
}
