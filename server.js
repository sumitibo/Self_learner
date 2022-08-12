const app = require("fastify")({ logger: false });//logger is default true,but I have make it false as working in development mode not in production mode;
const port = process.env.PORT || 7448;
const { REPL_MODE_SLOPPY } = require("repl");

const userRoutes = require('./routes/users.routes');//getting all the routes of user in var name userRoutes to register , basically doing a destructuring;

app.register(userRoutes);//registered the routes od user to fastify which is named by app;


const start = async () => {
  try {
    await app.listen({ port });
    console.log(`Server is listening on port ${port}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
start();
