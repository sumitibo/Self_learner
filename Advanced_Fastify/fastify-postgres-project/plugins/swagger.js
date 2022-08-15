const fp = require("fastify-plugin");

module.exports = fp((fastify, options, next) => {
    fastify.register(require('@fastify/swagger'), {
        routePrefix: '/swagger',
        swagger: {
          info: {
            title: 'Test swagger',
            description: 'Testing the Fastify swagger API',
            version: '0.1.0'
          },
        },
        exposeRoute: true
      })

  next();
});
