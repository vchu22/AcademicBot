const router = require('express').Router()
const {fulfillmentObjFactory} = require('./helpers')
const listAdvisors = require('./listAdvisors')
const makeAppointment = require('./makeAppointment')
module.exports = router

router.post('/webhook', async (req, res, next) => {
  try {
    const intent = req.body.queryResult.intent.displayName
    const params = req.body.queryResult.parameters
    const response = await createResponse(intent, params)
    res.json(response)
  } catch (err) {
    res.sendStatus(500)
  }
})

async function createResponse(intent, params) {
  console.log({intent, params})
  let response = ''
  switch (intent) {
    case 'Default Welcome Intent':
      return fulfillmentObjFactory(
        'Welcome to the Academic Advising Center! How can I help you?'
      )
    case 'List Available Advisers':
      response = await listAdvisors()
      return fulfillmentObjFactory(response)
    case 'List Available Advisers - yes':
      response = await makeAppointment(params)
      return fulfillmentObjFactory(response)
    default:
      return fulfillmentObjFactory()
  }
}
