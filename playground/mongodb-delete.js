//const MongoClient = require('mongodb').MongoClient; // The mongo client lets you connect to the mongo server.
const {MongoClient, ObjectID} = require('mongodb'); // The mongo client lets you connect to the mongo server.

//This is used to connect to the database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db)=>{
    if(error){
      return  console.log("Unable to connect to mongodb server");
    }
    console.log("Connected to mongodb server");
   //deleteMany() - > is used to delete many documents.
   //deleteOne() - > is used to delete one document.
   //findAndDeleteOne() - is used to find and delete a document and returns that document which is deleted.

   /* db.collection("Todos").deleteMany({text : "eat lunch"}).then((result)=>{
    console.log(result);
   }) */;
   
   /* db.collection("Todos").deleteOne({text : "eat lunch"}).then((result)=>{
    console.log(result);
   }); */ 

   db.collection("Todos").findOneAndDelete({completion: false}).then((result)=>{
    console.log(result);
   }) 
  
    //db.close();
});