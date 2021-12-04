'use strict'
const uuid = require('uuid').v4
const id = uuid()
const faker = require('faker')

const createOrder = ( id, fake ) =>{
  const newOrder = {
    company: fake.company.companyName(),
    orderId: id,
    customer: `${fake.name.lastName()}, ${fake.name.firstName()}`,
    vendorId: 'arn:aws:sqs:us-west-2:872892230630:Vendor_Queue'
  }
  // Message must be a string
  const payload = {
    Message: JSON.stringify(newOrder),
    TopicArn: 'arn:aws:sns:us-west-2:872892230630:pick-up'
  }
  return payload
}

const payload = createOrder(id,faker)

module.exports = { payload }
