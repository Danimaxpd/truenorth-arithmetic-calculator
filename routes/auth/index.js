'use strict'

const authController = require('../../controllers/auth');

module.exports = async function (fastify, opts) {

  fastify.post('/getToken', (request, reply) => {
    authController.getToken(request, reply, fastify)
  })
}