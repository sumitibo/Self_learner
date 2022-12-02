require("dotenv").config();

const port = process.env.PORT || 4444;
const { default: fastify } = require("fastify");
const { knexConfig } = require("../config/index");
const knex = require("../plugins/knex");

// Run the server!
const Routes = require("./routes/index");

const create = () => {
  const fastify = require("fastify")({ logger: false });
  fastify.register(knex, knexConfig);
  fastify.register(Routes, { prefix: "/v1" });

  return fastify;
};
const start = async () => {
  const fastify = create();
  try {
    await fastify.listen({ port: port });
    console.log(`Server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
