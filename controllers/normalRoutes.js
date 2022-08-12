const items = require('./items');

//route to get all the items
   app.route({
    method: 'GET',
    url: '/testing',
    schema: {
      // request needs to have a querystring with a `name` parameter
      querystring: {
        name: { type: 'string' }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: { 
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      // E.g. check authentication
      console.log('Some info about the current request')
    },
    handler: async (request, reply) => {
      return { hello: 'world' }
    }
  })