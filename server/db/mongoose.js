var mongoose = require('mongoose');

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://amrender:amy1234@ds159631.mlab.com:59631/todoapp'
};
//This is required only once
mongoose.Promise = global.Promise;
mongoose.connect(process.env.PORT ? db.mlab : db.localhost);
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