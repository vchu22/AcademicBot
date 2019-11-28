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

module.exports = {
  fulfillmentObjFactory,
  randomChoice
}
