'use strict'




async function usersRoutes(fastify, options) {
    fastify.get('/users',{
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