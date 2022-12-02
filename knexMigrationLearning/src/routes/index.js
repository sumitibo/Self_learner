module.exports = async (fastify) => {
  const { knex } = fastify;

  fastify.route({
    method: "POST",
    url: "/products",
    handler: async (req, res) => {
      const { body } = req;
      const { address, ...restProps } = body;
      const payload = { ...restProps, address: JSON.stringify(address || []) };

      const query = knex("testing")
        .insert(payload)
        .onConflict(["phone"])
        .merge();

      const response = await query;
      return res.code(201).send({ success: true });
    },
  });
};
