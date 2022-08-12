const {getAllUsers,getSingleUser} = require("../controller/users.controller")

//Options to configure the schemas or we can say like validation the responses;

const userProperties = { //destructuring the common properties to avoid repeating the same;
  type: "object",
  properties: {
    id: { type: "string" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    email: { type: "string" },
    gender: { type: "string" },
    //phone: { type: "integer" }, //we can control the numeric values here like we can convert id to string or integer as well as pgone numbers,pincode also;
  },
};

const allUserGetOptions = {
  schema: {
    response: {
      200: {
        type: "array",
        items: userProperties,
      },
    },
  },
  handler:getAllUsers
};

const singleUserGetOptions = {
  //done nesting here like user we can also add some more data in response;
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          user: userProperties,
        },
      },
    },
  },
  handler:getSingleUser
};

const userRoutes = (app, options, done) => {
  //get all users
  app.get("/allUsers", allUserGetOptions);

  //get a single specific user with the help of ID passed in params;

  app.get("/singleUser/:id", singleUserGetOptions);

  done();
};

module.exports = userRoutes;
