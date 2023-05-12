'use strict'


const Record = require('../../../../services/record');

async function recordsRoutes(fastify, options) {

  const RecordService = new Record(fastify.prisma);

  fastify.post('/', async (request, reply) => {
    try {
      const newUser = await RecordService.createRecord(request.body);
      reply.send(newUser);
    } catch (error) {
      reply.status(error.code).send(error.message);
    }
  });

  fastify.get('/filter', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      let { skip = 0, take = 10, orderBy = { id: 'asc' }, where = {} } = request.query;
      skip = parseInt(skip, 10);
      take = parseInt(take, 10);

      const users = await RecordService.getRecords(skip, take, orderBy, where);
      reply.send(users);
    } catch (error) {
      reply.status(error.code).send(error.message);
    }
  });

  fastify.get('/by_id/:id', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const user = await RecordService.getRecordById(request.params.id);
      reply.send(user);
    } catch (error) {
      reply.status(error.code).send(error.message);
    }
  });

  fastify.put('/by_id/:id', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const updatedUser = await RecordService.updateRecord(request.params.id, request.body);
      reply.send(updatedUser);
    } catch (error) {
      reply.status(error.code).send(error.message);
    }
  });

  fastify.delete('/by_id/:id', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    try {
      const deletedUser = await RecordService.deleteRecord(request.params.id);
      reply.send(deletedUser);
    } catch (error) {
      reply.status(error.code).send(error.message);
    }
  });
}

module.exports = recordsRoutes;