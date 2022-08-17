const { checkAuthentication } = require("./hooks/user");
const fastify = require("fastify")({ logger: false });
const {newToken} = require('./utils/newToken')
require("dotenv").config();

fastify.register(require('@fastify/jwt'),{
  secret:process.env.JWT_SECRET_KEY
});

fastify.decorate('newToken',newToken);

const port = process.env.PORT || 4500;

fastify.addHook("onRequest", checkAuthentication);

fastify.addHook("onResponse", (req, reply) => {
  console.log("Response sended to client");
});

const userRoutes = require('./routes/user.routes');
fastify.register(userRoutes);


//generate token for authentication from JWT;



fastify.listen({ port: port }, (err) => {
  if (err) throw err;
  else console.log("listening on port " + port);
});

