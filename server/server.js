const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


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

/**Users route setup */
app.post("/users", (req, res)=>{
    var body = _.pick(req.body, ["email","password"]);
    var user = new User(body);
    user.save()
    .then(()=>{
        return user.genrateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    });
});
app.get('/users/me',authenticate, (req , res)=>{
    res.send(req.user);
});
//Login route
app.post("/users/login", (req, res)=>{
    var body = _.pick(req.body,["email", "password"]);
    User.findByCredentials(body.email, body.password).then((user)=>{
       return  user.genrateAuthToken().then((token)=>{
            res.header('x-auth', token).send();
       });
    }).catch((err)=>{
        res.status(400).send();
    });

});
//logout route
app.delete("/users/logout", authenticate, (req, res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }).catch((err)=>{
        res.status(400).send();
    });
});
app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

//This is done for testing purpose
module.exports ={app};