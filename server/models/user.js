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
    findByToken,
    findByCredentials
};
//Adding an instance method 
userSchema.methods = {
    genrateAuthToken,
    toJSON,
    removeToken
};
function genrateAuthToken(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(()=>{
        return token;
    })
}
function removeToken(token){
    var user =  this;
    //$pull in mongo db lets you remove an item from array that matches certain criteria
   return user.update({
        $pull : {
            tokens : {token}
        }
    });
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
function findByCredentials(email, password){
    var User = this;
    return User.findOne({email}).then((user)=>{
        if(!user){
           return  Promise.reject();
        }
        return new Promise((resolve, reject)=>{
           bcrypt.compare(password, user.password, (err, res)=>{
                if(res){
                    return resolve(user);
                }
                reject();
            });
        });
    });
}
function findByToken(token){
    var User = this; //here this is model
    var decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
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
