'use strict'
// Consume Package_Queue JSON Messages
const { Consumer } = require('sqs-consumer')
// need Package_Queue url 
const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/872892230630/Package_Queue',
  handleMessage: handleMessage
})
const polledMessage = [] 

function handleMessage(message){
  //JSON Message
  const { Message } = JSON.parse(message.Body)
  polledMessage.push(Message)
  console.log('*** Message: ', Message)
  console.log('*** polledMessages: ', Message)
}

app.on('error', (err) => {
  console.log('*** err ', err)
} )
app.on('processing_error', (err) => {
  console.log('*** err ', err)
} )

// poll the queue
app.start()

module.exports = { polledMessage: polledMessage }
