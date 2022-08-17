const {createNewUser} = require('../handler/user.handler');


const userRoutes = (fastify,options,done) =>{
    //create a new user;

    fastify.post('/newUser',createNewUser);

    done()
}


module.exports = userRoutes;