'use strict'
// polled messages
const { polledMessage } = require('./index')

// Publish to SNS --> 'delivered'
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'})
const sns = new AWS.SNS()
const topic = 'arn:aws:sns:us-west-2:872892230630:delivered'

// Message must be a string
const jsonData
if(polledMessage){
  jsonData = JSON.stringify(polledMessage)
}

const payload = {
  Message: jsonData,
  TopicArn: topic
}

// publish 'delivered' event to SNS
sns.publish(payload).promise()
  .then( data => { console.log('*** data',data) })
  .catch(console.error())
