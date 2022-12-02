const fp = require("fastify-plugin");
const knex = require("knex");

const knexPlugin = async (fastify, options) => {
  try {
    const db = knex({ ...options });
    fastify.decorate("knex", db);
  } catch (e) {
    fastify.log.error(`DB connection failed`);
    throw Error(`Connection Failed ${e}`);
  }
};

module.exports = fp(knexPlugin);
