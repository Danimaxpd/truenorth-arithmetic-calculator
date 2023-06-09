'use strict'


require('dotenv').config()
const fp = require("fastify-plugin")

module.exports = fp(async function (fastify, opts) {
    const encoded = fastify.ENCODE_JWT;
    fastify.register(require('@fastify/jwt'), {
        secret: encoded,
        verify: {
            maxAge: fastify.EXPIRES_IN_JWT,
            clockTimestamp: Date.now(),
            ignoreExpiration: false,
        },
    })

    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err)
        }
    })
})