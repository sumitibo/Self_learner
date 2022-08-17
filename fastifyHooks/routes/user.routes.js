const {createNewUser,checkUser} = require('../handler/user.handler');
const {checkuser} = require('../controllers/user.controller')

const userRoutes = (fastify,options,done) =>{
    //create a new user;

    fastify.post('/newUser',createNewUser);
    fastify.get('/checkUser',checkUser);
   
    done()
}


module.exports = userRoutes;