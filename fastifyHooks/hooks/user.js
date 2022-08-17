async function checkAuthentication(req,reply) {
    //we can check the authentication here like we can extractt the bearer token and get match with jwt;
    if(req.raw.url === '/user') reply.status(400).send("Site is under maintenance");
    console.log('Entered to onRequest custom hook',req.raw.url);
    console.log('Client IP address is:', req.socket.remoteAddress);
    const user = { //attaching the finded user 
      id:1234567890,
      name:"Sumit Singh",
      email:"sumit.kumar@ibo.com",
      username:"sumitibo",
      phone:8507547919
    }
  
    req.user = user;
  }

  module.exports = {
    checkAuthentication
  }