var app = require('./app');

var server = app.listen(3000, function (){
    console.log("Server is Running on Port 3000.");
});