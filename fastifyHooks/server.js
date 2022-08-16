const fastify = require("fastify")({ logger: false });
require('dotenv').config()
const port = process.env.PORT || 4500



fastify.get('/testtinHooks',async(req,reply) =>{
  try{
      return reply.status(200).send("Hello to fastify hooks");
  }catch(err){
    return reply.status(400).send(err)
  }
})







fastify.listen({port:port}, (err) => {
  if (err) throw err;
  else console.log("listening on port " + port);
});
