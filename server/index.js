var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var Library = require('../database-mongo').Library;


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', function(req, res, next) {

  res.send(redirect_uri);

});

app.get('/library', function(req, res, next) {

  console.log('Request accepted');
  Library.find()
  	.then((data)=>{
  		console.log('saved: ', data);
  		res.send(data);
  	});

});


app.post('/library', (req,res, next) => {
  console.log('received: ', req.body);
  
  var data = new Library(req.body);
  data.save();

  res.redirect('/');
  
  
});

app.post('/delete', (req,res, next) => {
  console.log('delete: ', req.body);
  Library.findByIdAndRemove(req.body._id).exec();


  res.redirect('/');
  
  
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

