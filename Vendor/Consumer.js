'use strict'

const AWS = require('aws-sdk')
const { Consumer } = require('sqs-consumer')
AWS.config.update({region: 'us-west-2'})

// Consume --> Delivered Queue
const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/872892230630/Vendor_Queue',
  handleMessage: handleMessage
})

function handleMessage(message){
  const { Message } = JSON.parse(message.Body)
  const parsedMessage = JSON.parse(Message)
  console.log(`4. Vendor recieved package for ${parsedMessage.customer}`)
}
app.on('error', (err) => {console.log('*** err ', err)})
app.on('processing_error', (err) => {console.log('*** err ', err)})

module.exports = { app }
