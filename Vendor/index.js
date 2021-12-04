'use strict'
const AWS = require('aws-sdk')
const { Consumer } = require('sqs-consumer')
AWS.config.update({region: 'us-west-2'})
const sns = new AWS.SNS()
const uuid = require('uuid').v4
const faker = require('faker')

// Publish --> Package Queue
  const newOrder = {
    company: faker.company.companyName(),
    orderId: uuid(),
    customer: `${faker.name.lastName()}, ${faker.name.firstName()}`,
    vendorId: 'arn:aws:sqs:us-west-2:872892230630:Vendor_Queue'
  }
  // Message must be a string
  const payload = {
    Message: JSON.stringify(newOrder),
    TopicArn: 'arn:aws:sns:us-west-2:872892230630:pick-up'
  }
  // set interval here
  // Publish to SNS Topic Pickup
  sns.publish(payload).promise()
  .then( () => { 
      console.log(`1. Vendor ${newOrder.company} published new Order`)  
    })
    .catch(console.error())

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

// poll Delivered_Queue
app.start()
