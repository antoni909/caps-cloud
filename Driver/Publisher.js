'use strict'

const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'})
const sns = new AWS.SNS()

const handleMessage = (message) => {
  const { Message } = JSON.parse(message.Body)
  const parsedMessage = JSON.parse(Message)
  console.log(`2. Driver in transit with package for customer ${parsedMessage.customer}`)

  const payload = {
    Message: Message,
    TopicArn: 'arn:aws:sns:us-west-2:872892230630:delivered'
  }

// publish 'delivered' event to SNS
  sns.publish(payload).promise()
    .then( () => {console.log('3. Driver delivered package')})
    .catch(console.error())
}

module.exports = { handleMessage }
