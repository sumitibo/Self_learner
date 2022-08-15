const fp = require('fastify-plugin');
const pgp = require('pg-promise')();




module.exports = fp((fastify,options,next)=>{
    //fastify.log.info(process.env.POSTGRES_URL); to confirm we are getting address from env file.
    const db = pgp(process.env.POSTGRES_URL);


    next();
})