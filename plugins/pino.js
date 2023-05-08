const pino = require('pino');
const fp = require('fastify-plugin');

function loggerPlugin(fastify, options, next) {
    const logger = pino(options);
    fastify.decorate('logger', logger);
    fastify.addHook('onRequest', (req, res, next) => {
        req.log = logger;
        next();
    });
    next();
}

module.exports = fp(function (fastify, opts, next) {
    fastify.register(loggerPlugin, {
        level: 'info'
    });
    next();
});