'use strict'

const { Consumer } = require('sqs-consumer')
const { handleMessage } = require('./Publisher')

// Consume --> Package_Queue
const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/872892230630/Package_Queue',
  handleMessage: handleMessage
})

app.on('error', (err) => {console.log('*** err ', err)})
app.on('processing_error', (err) => { console.log('*** err ', err)})

module.exports = { app }
