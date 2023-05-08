'use strict'


const { onSendHandler } = require('../../../../hooks');


async function usersRoutes(fastify, options) {
    onSendHandler(fastify);
    fastify.get('/users',  {
        onRequest: [fastify.authenticate]
      }, async (request, reply) => {
        // TODO
    })

    fastify.get('/users/:id',  {
        onRequest: [fastify.authenticate]
      }, async (request, reply) => {
        // TODO
    })
}

module.exports = usersRoutes;