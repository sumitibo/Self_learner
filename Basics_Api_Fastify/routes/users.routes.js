const {
  getAllUsers,
  getSingleUser,
  addUser,
} = require("../controller/users.controller");

//Options to configure the schemas or we can say like validation the responses;

const userProperties = {
  //destructuring the common properties to avoid repeating the same;
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
  handler: getAllUsers,
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
  handler: getSingleUser,
};

const newUserOptions = {
  //done nesting here like user we can also add some more data in response;
  schema: {
    body: {
      type: "object",
      properties: {
        first_name: { type: "string", minLength: 3, maxLength: 15 },
        last_name: { type: "string", minLength: 3, maxLength: 15 },
        email: {
          description: "It will contain user email",
          type: "string",
          format: "email",
          minLength: 3,
          maxLength: 25,
          uniqueItems: true,
        },
        gender: {
          type: "string",
          uniqueItems: true,
          enum: ["m", "f"],
        },
        phone: {
          description: "It will contain user mobile number",
          type: "integer",
          minLength: 10,
          maxLength: 10,
          uniqueItems: true,
        },
      },
      required:["phone","first_name","last_name","email","gender"]
    },
    response: {
      201: userProperties,
    },
  },
  handler: addUser,
};

const userRoutes = (app, options, done) => {
  //get all users
  app.get("/allUsers", allUserGetOptions);

  //get a single specific user with the help of ID passed in params;

  app.get("/singleUser/:id", singleUserGetOptions);

  //post a new user to the database

  app.post("/newUser", newUserOptions);

  done();
};

module.exports = userRoutes;
