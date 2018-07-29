//const MongoClient = require('mongodb').MongoClient; // The mongo client lets you connect to the mongo server.
const {MongoClient, ObjectID} = require('mongodb'); // The mongo client lets you connect to the mongo server.

//This is used to connect to the database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db)=>{
    if(error){
      return  console.log("Unable to connect to mongodb server");
    }
    console.log("Connected to mongodb server");
   //findOneAndUpdate - > get the document and update and it returns the updated document. 

   db.collection("Users").findOneAndUpdate({
       _id: new ObjectID('5b5cce473ad50a124455fb1f')
    }, {
        $set :{
            name : 'Amrender singh'
        },
        $inc :{
            age  : 1
        }
    }, {
        returnOriginal : false
    }).then((result)=>{
    console.log(result);
   }) 
  
    //db.close();
});