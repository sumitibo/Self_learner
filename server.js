const app = require('fastify')({logger:true})
const port = process.env.PORT || 7448;
const { REPL_MODE_SLOPPY } = require('repl');
const items = require('./items');



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
      console.log("It will run before route gets execute")
    },
    handler: async (request, reply) => {
      return { hello: 'world' }
    }
  })


const start = async() =>{
    try{
        await app.listen({port})
        console.log(`Server is listening on port ${port}`)
    }catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
}
start()