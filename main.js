//Tell node which packages to import
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

//Sets up the mongoose db connection
var mongoDB = 'mongodb://xcom:xcom@ds127126.mlab.com:27126/xcom';
mongoose.connect(mongoDB);

//sets up the server to use port 8081
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
//prints the address of the server to the console
  console.log('my app is listening at http://%s:%s', host, port);
});
//Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
//tells express to use the "public" folder for it's path
app.use(express.static(path.join(__dirname, 'public')));

//defines the scheme for the mongooseDB
var Schema = mongoose.Schema;
//define schema
var soldierSchema = new Schema({
	name	: String,
    nationality	: String,
    gender	: String,
	background	: String
});

var Soldiers = mongoose.model('Soldiers', soldierSchema);

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

//routepoint for displaying the database
app.get('/viewsoldiers', function(req,res){
	Soldiers.find({}, function(err, soldier) {
                if (err)
                    res.send(err)
                res.json(soldier);
            });
});

//routepoint for inserting new data into the database
app.post('/create', urlencodedParser, function(req, res) {
	console.log("Creating new soldier");
	console.log(req.body.name);
	  Soldiers.create({
            name : req.body.name,
            nationality : req.body.nationality,
			gender: req.body.gender,
            background: req.body.background
        })
		console.log("Inserting item");
	res.redirect('/');
 });

 
app.get('/', function(req, res){
    res.sendfile('', { root: __dirname + "/index.html" } );
});
app.get('/gallery', function(req, res){
    res.sendfile('', { root: __dirname + "/public/content/gallery.html" } );
});
app.get('/home', function(req, res){
    res.sendfile('', { root: __dirname + "/public/content/home.html" } );
});
app.get('/roster', function(req, res){
    res.sendfile('', { root: __dirname + "/public/content/roster.html" } );
});
app.get('/armoury', function(req, res){
    res.sendfile('', { root: __dirname + "/public/content/armoury.html" } );
});