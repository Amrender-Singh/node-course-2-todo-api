const MongoClient = require('mongodb').MongoClient; // The mongo client lets you connect to the mongo server.

//This is used to connect to the database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db)=>{
    if(error){
      return  console.log("Unable to connect to mongodb server");
    }
    console.log("Connected to mongodb server");
    /* db.collection('Todos').insertOne({
        text :"Something to do",
        completion : false
    }, (err, result)=>{
        if(err){
            return console.log("Unable to insert Todo", err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    }); */
    db.collection('Users').insertOne({
        name :"Amrender singh",
        age : 23,
        location : "India"
    }, (err, result)=>{
        if(err){
            return console.log("Unable to insert User", err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.close();
});