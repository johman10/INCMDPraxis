var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var mongoose = require('mongoose');

mongoose.connect('rick:BarBar@ds048537.mongolab.com:48537/prototyping-sucks', function (error) {
    if (error) {
        console.log(error);
    }
});

var kittySchema = mongoose.Schema({
        name: String
      });

var Kitten = mongoose.model('Kitten', kittySchema);

app.get('/getkitten', function (req, res, next) {
	Kitten.find({}, function (err, docs) {
       res.json(docs);
    });
});

app.get('/createKitten', function(req, resp) {
    var newKitten = new Kitten({name: req.query.katName});
    newKitten.save(function(err){ // will this callback always be called correctly?
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
