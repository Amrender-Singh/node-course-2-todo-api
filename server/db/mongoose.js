var mongoose = require('mongoose');

//This is required only once
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
module.exports = {
    mongoose
};

/* var newTodo = new Todo({
    text : 'Cook dinner'
});
//It saves the data in the database and returns a promise.
newTodo.save().then((doc)=>{
    console.log('Saved Todo', doc);
}, (err)=>{
    console.log('Unable to save Todo', err);
}); */

/* var otherTodo = new Todo({
    text : 'Feed the cat',
    complete : true,
    completeAt : 123
});
otherTodo.save().then((doc)=>{
    console.log('Saved Todo', doc);
}, (err)=>{
    console.log('Unable to save Todo', err);
}); */


/* var newUser = new User({
    email : "amrender@example.com"
});
newUser.save().then((doc)=>{
    console.log('Saved Todo', doc);
}, (err)=>{
    console.log('Unable to save Todo', err);
}); */