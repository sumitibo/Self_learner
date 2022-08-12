let users = require("../items");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = (req, reply) => {
  try {
    return reply.status(200).send(users);
  } catch (err) {
    return reply.status(500).send({ error: err });
  }
};

const getSingleUser = (req, reply) => {
  try {
    const { id } = req.params; //destructuring the id to find the actual user;

    // let isnum = /^\d+$/.test(id); //logic to check whether id contains only integer or not;

    // if (!isnum || id > users.length || id < 1) {
    //   // val is not a number or range is outside of user database;
    //   return reply
    //     .status(500)
    //     .send({ error: "Sorry you are out of userlist range" });
    // }

    const user = users.find((e) => e.id === id); //find accepts a function to return the user object;
    return reply.status(200).send({ user });
  } catch (err) {
    return reply.status(500).send({ error: err });
  }
};

const addUser = (req, reply) => {
  try {
   
    const userDetails = { id: uuidv4(), ...req.body }; //spreading id and user details into a single object;
    console.log(userDetails)
    users = [...users, userDetails];

    return reply.code(201).send(userDetails);
  } catch (err) {
    console.log(err)
    return reply.status(500).send({ error: err });
  }
};

module.exports = { getAllUsers, getSingleUser, addUser };
