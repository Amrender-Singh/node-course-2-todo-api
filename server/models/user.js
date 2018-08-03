/*
    Mongoose.model() helps us to create a model i.e it helps us to define a structure for our document.
*/
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//schema is allows users to add on custom method

var userSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true,
        minlength : 7,
        unique : true,
        trim : true,
        validate : {
            validator : validator.isEmail,
            message : "{VALUE} is not a valid email"
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    tokens :[
        {
            access : {
                type : String,
                required : true
            },
            token : {
                type : String,
                required : true
            }
        }
    ]
});
//Adding an instance method 
userSchema.methods = {
    genrateAuthToken,
    toJSON 
};
function genrateAuthToken(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(()=>{
        return token;
    })
}
//overided to json method so that mongoose return only email and _id in response.
function toJSON(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

var User = mongoose.model('User', userSchema);

module.exports = {
    User
};
