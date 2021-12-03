'use strict'
// Publish --> Package

const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'})
const sns = new AWS.SNS()
// topic arn to subscribe-to
const topic = 'arn:aws:sns:us-west-2:872892230630:pick-up'
const uuid = require('uuid').v4

// Message must be a string
const data = { 
  msg: 'Package',
  orderId: uuid(),
  customer: 'First Last Name',
  vendorId: 'arn:aws:sqs:us-west-2:872892230630:Vendor_Queue'
}
const jsonData = JSON.stringify(data)

const payload = {
  Message: jsonData,
  TopicArn: topic
}

console.log('data: ', data, 'Payload: ', payload)

sns.publish(payload).promise()
  .then( data => { console.log('*** data',data) })
  .catch(console.error())
