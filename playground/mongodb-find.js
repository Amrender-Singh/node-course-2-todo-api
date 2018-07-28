//const MongoClient = require('mongodb').MongoClient; // The mongo client lets you connect to the mongo server.
const {MongoClient, ObjectID} = require('mongodb'); // The mongo client lets you connect to the mongo server.

//This is used to connect to the database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db)=>{
    if(error){
      return  console.log("Unable to connect to mongodb server");
    }
    console.log("Connected to mongodb server");
    /*
        find not returns the docs but it only returns a pointer to those docs to get the docs we use the toArray()
        method which returns a promise containing the array of docs.
        for more method  goto mongodb git page and api and then click cursor from toc. There are more methods
        like forEach, filter, sort, count etc.

    */
    /* db.collection('Todos').find({_id : new ObjectID('5b5cc5ea538cdf0980497433')}).toArray().then((docs)=>{
        console.log(docs);
    }, (err)=>{
        console.log("Unable to fetch the Todo docs", err);
    }); */
    //count method returns the number of docs present in db for that specific query
    db.collection('Todos').find().count().then((count)=>{
        console.log(`count : ${count}`);
    }, (err)=>{
        console.log("Unable to fetch the Todo docs", err);
    });
  
    //db.close();
});