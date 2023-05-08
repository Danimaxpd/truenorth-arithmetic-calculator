'use strict'

const {onSendHandler} = require('../../hooks')
const authController = require('../../controllers/auth');


module.exports = async function (fastify, opts) {

  onSendHandler(fastify);
  fastify.post('/getToken', (request, reply) => {
    authController.getToken(request, reply, fastify)
  })
}