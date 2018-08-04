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
    completed : {
        type : Boolean,
        default : false
    },
    completedAt : {
        type : Number,
        default : null
    },
    _creator : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    }
});
module.exports = {
    Todo
}