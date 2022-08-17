//var jwt = require('jsonwebtoken');

function newToken (user){ //this function to use when creating with @fastify/jwt;
    return this.jwt.sign({ user });
}


async function tokenValidator (req,reply){
    try{
         await req.jwtVerify();
    }catch(err){
        return reply.code(400).send(err);
    }
}


// const newToken =(user) =>{
//     return jwt.sign({
//         data: user
//       }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
// }
 


module.exports = {newToken,tokenValidator}

