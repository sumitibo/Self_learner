async function generateTokenForNewUser(req,reply){
    try{
        const {email} = req.body;
  
        const token = this.newToken(email);
  
        return reply.code(201).send({status:"Account created successfully",token,flag:true});
    }catch(err){
      return reply.code(400).send(err)
    }
}

async function checkuser(req,reply){
    try{
        //if(!req.user) return reply.code(404).send({status:"Bad Credentials"})
        const user = req.user;
        console.log(user)
        return reply.code(200).send({status:"OK",user:user})
    }catch(err){
        return reply.code(400).send(err)
    }
}

module.exports={
    generateTokenForNewUser,checkuser
}