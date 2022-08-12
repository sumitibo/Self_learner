const users = require("../items");

//Options to configure the schemas or we can say like validation the responses;

const allUserGetOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            first_name: { type: "string" },
            last_name: { type: "string" },
            email: { type: "string" },
            gender: { type: "string" },
            phone: { type: "integer" }, //we can control the numeric values here like we can convert id to string or integer as well as pgone numbers,pincode also;
          },
        },
      },
    },
  },
};

const singleUserGetOptions = {
  //done nesting here like user we can also add some more data in response;
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              first_name: { type: "string" },
              last_name: { type: "string" },
              email: { type: "string" },
              gender: { type: "string" },
              phone: { type: "integer" }, //we can control the numeric values here like we can convert id to string or integer as well as pgone numbers,pincode also;
            },
          },
          userParent: {
            type: "object",
          },
        },
      },
    },
  },
};

const userRoutes = (app, options, done) => {
  //get all users
  app.get("/", allUserGetOptions, (req, reply) => {
    try {
      return reply.status(200).send(users);
    } catch (err) {
      return reply.status(500).send({ error: err });
    }
  });

  //get a single specific user with the help of ID passed in params;

  app.get("/user/:id", singleUserGetOptions, (req, reply) => {
    try {
      const { id } = req.params; //destructuring the id to find the actual user;

      if (id > users.length || id < 1)
        return reply
          .status(500)
          .send({ error: "Sorry you are out of userlist range" });
      const user = users.find((e) => e.id === id); //find accepts a function to return the user object;
      return reply.status(200).send({ user });
    } catch (err) {
      return reply.status(500).send({ error: err });
    }
  });

  done();
};

module.exports = userRoutes;
