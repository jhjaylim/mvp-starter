var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
//var items = require('../database-mongo');

// var request = require('request'); 
// var querystring = require('querystring');
// var cookieParser = require('cookie-parser');
// var credentials = require('./credentials.js');

// var client_id = credentials.credentials.client_id ; // Your client id

// var client_secret = credentials.credentials.client_secret; // Your secret
// var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

var app = express();

//UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', function(res, req) {

  res.send(redirect_uri);

})




app.listen(3000, function() {
  console.log('listening on port 3000!');
});

