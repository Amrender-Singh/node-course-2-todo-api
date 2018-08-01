const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


//used by heroku
const port = process.env.PORT || 3000;
var app = express();
//middleware
app.use(bodyParser.json());
// /todos is route which create a new Todo
app.post('/todos' ,(req,res)=>{
    var todo = new Todo({
        text : req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    }, (err)=>{
        res.status(400).send(err);
    });
});

app.get("/todos", (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (err)=>{
        res.status(400).send(err);
    });
});

app.get("/todos/:id", (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id))
        return res.status(404).send();
    Todo.findById(id).then((todo)=>{
        if(!todo)
           return  res.status(404).send();
        res.send({todo});
    }, (err)=>{
        res.status(400).send();
    });
});

app.delete("/todos/:id", (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id))
        return res.status(404).send();
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo)
            return res.status(404).send();
        res.send({todo});
    }, (err)=>{
        res.status(400);
    });
});
app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    //It extracts properties from an object and makes another object with the child passed in array.
    var body = _.pick(req.body, ['text', 'completed']);
  
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
  });
//This is done for testing purpose
module.exports ={app};