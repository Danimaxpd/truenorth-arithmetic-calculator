'use strict'


const { onSendHandler } = require('../../../../hooks');
const Calculator = require('../../../../services/calculator')

async function calculatorRoutes(fastify, options) {
  onSendHandler(fastify);
  // Addition endpoint
  fastify.get('/add/:a/:b', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { a, b } = request.params;
    const result = Calculator.add(parseInt(a), parseInt(b));
    return { result };
  });

  // Subtraction endpoint
  fastify.get('/subtract/:a/:b', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { a, b } = request.params;
    const result = Calculator.subtract(parseInt(a), parseInt(b));
    return { result };
  });

  // Multiplication endpoint
  fastify.get('/multiply/:a/:b', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { a, b } = request.params;
    const result = Calculator.multiply(parseInt(a), parseInt(b));
    return { result };
  });

  // Division endpoint
  fastify.get('/divide/:a/:b', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { a, b } = request.params;
    const result = Calculator.divide(parseInt(a), parseInt(b));
    return { result };
  });

  // Square root endpoint
  fastify.get('/square-root/:a', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { a } = request.params;
    const result = Calculator.squareRoot(parseInt(a));
    return { result };
  });

  // Random string endpoint
  fastify.get('/random-string/:length', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const { length } = request.params;
    const result = Calculator.randomString(parseInt(length));
    return { result };
  });
}

module.exports = calculatorRoutes;