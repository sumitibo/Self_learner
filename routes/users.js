const users = require("../items");

const userRoutes = (app, options, done) => {
  //get all users
  app.get("/", async (req, res) => {
    try {
      return res.status(200).send(users);
    } catch (err) {
      res.status(500).send({ error: err });
    }
  });

  //get a single specific user with the help of ID passed in params;

  app.get("/user/:id", (req, res) => {
    try {
      const { id } = req.params; //destructuring the id to find the actual user;

      if (id > users.length || id < 1)
        return res
          .status(500)
          .send({ error: "Sorry you are out of userlist range" });
      const user = users.find((e) => e.id === id); //find accepts a function to return the user object;
      return res.status(200).send({ user });
    } catch (err) {
      return res.status(500).send({ error: err });
    }
  });


  done()
};


module.exports = userRoutes;
