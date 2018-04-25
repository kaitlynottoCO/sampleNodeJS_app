var http = require('http'); //calls for http.js
var url = require('url'); // calls for url.js
var express = require('express'); //include express module

var app = express(); //creating app object and calling express

app.get('/', function(req, res) { //created a single route, the "/" root. A callback function is called when someone asks for this route.
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are in reception. How can I help you?');
});

app.get('/basement', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are in the wine cellar. Those bottles are mine!');
});

app.get('/floor/1/bedroom', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hey, this is a private area!');
});

app.get('/floor/:floornum/bedroom', function(req, res) { //this generates dynamic routes where :floornum may change
    res.render('bedroom.ejs', {floor: req.params.floornum});ß
});

app.get('/count/:number', function(req, res) {
    var names = ['Robert', 'Jack', 'David'];
    res.render('page.ejs', {counter: req.params.number, names: names});
});

app.use(function(req, res, next){ //managing 404 errors
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page cannot be found!');
});


//app.listen(process.env.PORT);
app.listen(8080);