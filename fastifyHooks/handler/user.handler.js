const {generateTokenForNewUser} = require('../controllers/user.controller');
const {newUserProperties} = require('../schemas/user.schema');


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

module.exports ={
    createNewUser
}