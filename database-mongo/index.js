var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var librarySchema = mongoose.Schema({
  title: String,
  artist: String,
  url: String,
  fullUrl: String
});

var Library = mongoose.model('Library', librarySchema);

var selectAll = function(callback) {
  Library.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.Library = Library;