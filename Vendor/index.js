'use strict'
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'})
const sns = new AWS.SNS()
const { app } = require('./Consumer')
const { payload } = require('./Publisher')

// Publish --> SNS Topic Pickup
sns.publish(payload).promise()
.then( () => {
  const { company } = JSON.parse(payload.Message)
  console.log(`1. Vendor ${company.toUpperCase()} published new Order`)
})
.catch(console.error())

// poll Delivered_Queue
app.start()
