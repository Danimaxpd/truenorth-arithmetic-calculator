const fastifyPlugin = require('fastify-plugin');
const { PrismaClient } = require('@prisma/client');

async function prismaPlugin(fastify, options) {
  const prisma = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  });
  prisma.$on("query", async (e) => {
    console.log(`${e.query} ${e.params}`)
  });

  // Add the prisma instance to the fastify decorator
  fastify.decorate('prisma', prisma);

  // Register a hook to clean up the prisma instance when the server closes
  fastify.addHook('onClose', async (fastifyInstance) => {
    await fastifyInstance.prisma.$disconnect();
  });
}

module.exports = fastifyPlugin(prismaPlugin);