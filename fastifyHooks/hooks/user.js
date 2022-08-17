const jwt = require('jsonwebtoken');

function verifyToken(token) {
  return new Promise(function (resolve, reject) {
      jwt.verify(token,process.env.JWT_SECRET_KEY,function (error, user) {
          if(error) return reject(error);
        
          return resolve(user);
      })
  })
}

async function checkAuthentication(req,reply) {
    //we can check the authentication here like we can extractt the bearer token and get match with jwt;
    if(req.raw.url !== '/newUser') {
         //getting the bearer token from the response cookies 
         const bearerToken = req.headers.authorization;
         console.log(bearerToken);
         //If not we will throw an error
         if(!bearerToken || !bearerToken.startsWith('Bearer ')) return res.status(400).send("Please provide a bearer token");
         
         const token = bearerToken.split(' ')[1];
         const {user} = await verifyToken(token);
         req.user = user
    }
    console.log('Entered to onRequest custom hook',req.raw.url);
    console.log('Client IP address is:', req.socket.remoteAddress)
  }

  module.exports = {
    checkAuthentication
  }