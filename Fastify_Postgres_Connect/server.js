const fastify = require('fastify')({logger:false});
require('dotenv').config()
const { Client } = require('pg');
const PORT = process.env.SERVER_PORT || 2448;

const client = new Client({
    user:process.env.USER,
    host:process.env.HOST,
    database: process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.PORT,
})

client.connect()

fastify.get('/',(req,reply)=>{
    reply.send({ hello: 'world'})
})


fastify.listen({port:PORT},(err)=>{
    if(err) throw err;
    else console.log(`Server is listening on ${PORT}`);
})
