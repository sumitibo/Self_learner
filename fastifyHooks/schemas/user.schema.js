const newUserProperties ={
    type:'object',
    properties:{
        first_name:{type:'string'},
        last_name:{type:'string'},
        age:{
            type: 'integer'
          },
          gender:{
            type: "string",
                    enum:["m","f"]
          },
          phone:{
            type:"string",
            minLength:10,
            maxLength:10,
          },
          email:{
            type:"string",
            format:"email",
            minLength:3,
            maxLength:25,
          }

    },
    required: ['first_name','age','phone','email']
}

module.exports={
    newUserProperties
}