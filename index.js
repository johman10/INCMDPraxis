var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var mongoose = require('mongoose');

mongoose.connect('Johman10:1234567890@ds039251.mongolab.com:39251/mower_preorders', function (error) {
  if (error) {
    console.log(error);
  }
});

var userSchema = mongoose.Schema({
  name: String
});

var User = mongoose.model('users', userSchema);

app.get('/getuser', function (req, res, next) {
  User.find({}, function (err, docs) {
   res.json(docs);
 });
});

app.get('/createuser', function(req, resp) {
  var newUser = new User({name: req.query.userName});
    newUser.save(function(err){ // will this callback always be called correctly?
      if(err) {
        resp.send('ERROR!');
      }
      else {
        resp.redirect('/');
      }
    });
  });

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
