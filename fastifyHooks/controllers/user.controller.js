async function generateTokenForNewUser(req,reply){
    try{
        const {email} = req.body;
  
        const token = this.newToken(email);
  
        return reply.code(201).send({status:"Account created successfully",token,flag:true});
    }catch(err){
      return reply.code(400).send(err)
    }
}

module.exports={
    generateTokenForNewUser
}