'use strict'

require('dotenv').config();
const path = require('path')
const AutoLoad = require('@fastify/autoload');
const { currentDate, encodedJWT, validPassId, expiresIn } = require('./helpers/global-variables');
const  {onSendHandler} = require("./hooks/index");

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Hooks
  onSendHandler(fastify);
  // Add the global variables to the Fastify instance
  fastify.decorate('CURRENT_DATE', currentDate)
  fastify.decorate('ENCODE_JWT', encodedJWT)
  fastify.decorate('VALID_PASS_ID', validPassId)
  fastify.decorate('EXPIRES_IN_JWT', expiresIn)

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
