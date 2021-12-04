'use strict'
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'})
const sns = new AWS.SNS()
const { Consumer } = require('sqs-consumer')

// Consume --> Package_Queue
const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/872892230630/Package_Queue',
  handleMessage: handleMessage
})

function handleMessage(message){
  const { Message } = JSON.parse(message.Body)
  const parsedMessage = JSON.parse(Message)
  console.log(`2. Driver in transit with package for customer ${parsedMessage.customer}`)

  const payload = {
    Message: Message,
    TopicArn: 'arn:aws:sns:us-west-2:872892230630:delivered'
  }

// publish 'delivered' event to SNS
  sns.publish(payload).promise()
    .then( data => {console.log('3. Driver delivered package')})
    .catch(console.error())
}

app.on('error', (err) => {console.log('*** err ', err)})
app.on('processing_error', (err) => { console.log('*** err ', err)})

// poll the Package_Queue
app.start() 
