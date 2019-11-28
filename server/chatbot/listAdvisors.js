const {randomChoice} = require('./helpers')
const {Advisor} = require('../db/models')

async function listAdvisors() {
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
  return randomChoice(text)
}

module.exports = listAdvisors
