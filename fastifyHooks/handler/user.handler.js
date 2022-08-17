const {generateTokenForNewUser,checkuser} = require('../controllers/user.controller');
const {newUserProperties} = require('../schemas/user.schema');
const {tokenValidator} = require('../utils/newToken');

const createNewUser = {
    schema:{
        body:newUserProperties,
        response:{
            201:{
                properties:{
                    status:{type:'string'},
                    flag:{type:'boolean'},
                    token:{type:'string'}
                }
            }
        }
    },
    handler:generateTokenForNewUser
}

const checkUser ={
    schema:{
        response:{
            200:{
                properties:{
                    status:{type:'string'},
                    user:{
                        type:'object',
                        properties:{
                            user:{type:'string'},
                            iat:{type:'integer'},
                        }
                    }
                }
            }
        }
    },
    preHandler:[tokenValidator],
    handler:checkuser
}

module.exports ={
    createNewUser,checkUser
}