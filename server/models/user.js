/*
    Mongoose.model() helps us to create a model i.e it helps us to define a structure for our document.
*/
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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

//mongoose middleware
userSchema.pre('save', hashPassword);
//statics allow us to add model methods
userSchema.statics = {
    findByToken
};
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
function hashPassword(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash;
                next();
            });
        });
    } else{
        next();
    }
}
//overided to json method so that mongoose return only email and _id in response.
function toJSON(){
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}
function findByToken(token){
    var User = this; //here this is model
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (error) {
        return Promise.reject();
    }
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    })
}

var User = mongoose.model('User', userSchema);

module.exports = {
    User
};
