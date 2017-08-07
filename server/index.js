var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var library = require('../database-mongo');



// var client_id = credentials.credentials.client_id ; // Your client id
// var client_secret = credentials.credentials.client_secret; // Your secret
// var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', function(res, req) {

  res.send(redirect_uri);

});

app.post('/', (res,req) => {
  console.log(req.body);
  library.selectAll(console.log);
  
});




app.listen(3000, function() {
  console.log('listening on port 3000!');
});

