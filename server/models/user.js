/*
    Mongoose.model() helps us to create a model i.e it helps us to define a structure for our document.
*/
var mongoose = require('mongoose');
var User = mongoose.model('User',{
    email :{
        type : String,
        required : true,
        minlength : 7,
        trim : true
    }
});

module.exports = {
    User
}
