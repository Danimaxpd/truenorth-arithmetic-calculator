'use strict'


const { onSendHandler } = require('../../../../hooks');

async function calculatorRoutes(fastify, options) {
    onSendHandler(fastify);


    fastify.post('/operation', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
        // TODO
    })

    fastify.get('/records/:user_id',  {
        onRequest: [fastify.authenticate]
      }, async (request, reply) => {
        // TODO
    })
}

module.exports = calculatorRoutes;