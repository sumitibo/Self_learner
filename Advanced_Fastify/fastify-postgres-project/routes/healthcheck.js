'use strict'

module.exports = async function (fastify, opts,next) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema:{
      tags:['Healthcheck'],
      description: 'Endpoint to determine server is up',
      response:{
        200:{
          type:'object',
          properties: {
            status: {type:'string'},
            timestamp:{type:'string',format:'date-time'}
          }
        }
      }
    },
    handler: async(request,reply)=>{
      reply.send({status:"Server is up",timestamp:new Date().toISOString()})
    }
  })

  next()
}
