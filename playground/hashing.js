const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
var data = {
    id : 4
};
//It takes the object an creates a hash and return a token
var token = jwt.sign(data, '123Abc');

console.log(`Token : ${token}`);
//takes a token and verify that the data was not manipulated.
var decoded = jwt.verify(token, '123Abc');
console.log(decoded);
/* 
All the above stuff is handled by using jwt library
var message = "I am user 3";
var hash = SHA256(message).toString();

console.log(`Message : ${message}`);
console.log(`Hash : ${hash}`);

//token for authentication

var data = {
    id: 4,
};
var token = {
    id : 4,
    hash : SHA256(JSON.stringify(data)+"some secret").toString()
};

var resultHash =  SHA256(JSON.stringify(data)+"some secret").toString();

if(resultHash === token.hash){
    console.log("Data was not changed");
} else{
    console.log("Data was changed !! don`t trust");
} */