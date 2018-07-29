/*
    Mongoose.model() helps us to create a model i.e it helps us to define a structure for our document.
*/
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo',{
    text : {
        type : String, // set the type of text to be string. We can add many more properties like required true, whcih makes mandatory to add the text.
        required : true,
        minlength : 5,
        trim : true
    },
    complete : {
        type : Boolean,
        default : false
    },
    completeAt : {
        type : Number,
        default : null
    }
});
module.exports = {
    Todo
}