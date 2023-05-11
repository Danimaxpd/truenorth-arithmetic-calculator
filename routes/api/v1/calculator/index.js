'use strict'


const CalculatorController = require('../../../../controllers/calculator')

async function calculatorRoutes(fastify, options) {
  const calculatorCtrl = new CalculatorController(fastify);
  // Addition endpoint
  fastify.post('/operation', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const { operationType, a, b, length} = request.body;
      const userId = request.user.id
      const result = calculatorCtrl.performOperation(userId, operationType, a, b, length);
      reply.send(result);
    } catch (error) {
      reply.status(error.code).send(error.message);
    }
  });
}

module.exports = calculatorRoutes;