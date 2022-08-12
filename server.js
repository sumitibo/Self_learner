const app = require('fastify')({logger:false})
const port = process.env.PORT || 7448;
const { REPL_MODE_SLOPPY } = require('repl');
const users = require('./items');

//get all users
app.get('/', async(req, res)=>{
  try{
    return res.status(200).send(users)
  }catch(err){
    res.status(500).send({error: err});
  }
})

//get a single specific user with the help of ID passed in params;

app.get('/user/:id',(req, res)=>{
  try{
    const {id} = req.params;//destructuring the id to find the actual user;

    if(id > users.length || id <1)return res.status(500).send({error:"Sorry you are out of userlist range"})
    const user = users.find(e => e.id === Number(id))//find accepts a function to return the user object;
    
    console.log(user)
    return res.status(200).send({user});
  }
  catch(err){
    return res.status(500).send({error: err});
  }
}
)


const start = async() =>{
    try{
        await app.listen({port})
        console.log(`Server is listening on port ${port}`)
    }catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
}
start()