//tell node which packages to use
var http = require("http");
var express = require('express');
var app = express();
var path = require('path');

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('my app is listening at http://%s:%s', host, port);
});
//Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

app.use(express.static(path.join(__dirname, 'public')));

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