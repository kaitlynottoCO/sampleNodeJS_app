var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings. Allows retrieving from form vs URL
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Analytics = require('analytics-node');
var uniqid = require('uniqid'); // Creates unique id's
var analytics = new Analytics('b5U940oxggoOuEmRonq2bzJav4gviMr1');
var colors = require('ansi-colors');
var app = express();
var anonymousId = uniqid();


/* Using sessions */
app.use(session({secret: 'todotopsecret'})) //mandatory; allows the session cookies to be secured. Other options available too


/* If there is no todo list in the session, 
we create an empty one in the form of an array before continuing */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') { //only creating a new empty array if it doesn't already exist
        req.session.todolist = [];
    }
    next(); //this is calling the next function....get(‘/todo’, function (){})
})

.get('/todo', function(req, res) {
	res.render('todo.ejs', {todolist: req.session.todolist});
})

.post('/todo/add/', urlencodedParser, function(req, res) { //forms send data using the POST method, not GET. So adding tasks is going to be done on the route with POST. 
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo); //push to add
        analytics.track({
  			anonymousId: String(anonymousId),
  			event: 'Added todo',
  			properties: {
    			task: req.body.newtodo
  			}
		});
    }
    res.redirect('/todo'); //redirect the visitor to the list (/todo) after items were added or deleted
})

.post('/todo/identify/', urlencodedParser, function(req, res) { //forms send data using the POST method, not GET. So adding tasks is going to be done on the route with POST. 
	if (req.body.email != ''){
    		analytics.identify({
        		anonymousId: String(anonymousId),
	        	traits: {
        	    		name: req.body.name,
       	     	    		email: req.body.email
        		}});
    	}
	res.redirect('/todo'); //redirect the visitor to the list (/todo) after items were added or deleted
})

.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        analytics.track({
  			anonymousId: String(anonymousId),
  			event: 'Deleted todo',
  			properties: {
    				title: req.session.todolist[req.params.id]
  			}
	});
	req.session.todolist.splice(req.params.id, 1); //removing with a basic splice'
    }
    res.redirect('/todo'); //redirect the visitor to the list (/todo) after items were added or deleted
})

.get('/todo/complete/:id', function(req, res) {
    if (req.params.id != '') {
        analytics.track({
  			anonymousId: String(anonymousId),
  			event: 'Task Completed',
  			properties: {
    				title: req.session.todolist[req.params.id]
  			}
		});
    var task = req.session.todolist[req.params.id]; //completed task
    req.session.todolist.splice(req.params.id, 1); //remove
    res.render('page.ejs', {task: task});
    }
    //res.redirect('/todo'); //redirect the visitor to the list (/todo) after items were added or deleted
})

.get('/todo/fav/1/', function(req, res) {
	analytics.track({
  			anonymousId: String(anonymousId),
  			event: 'Product Clicked',
  			properties: {
    			product_id: '507f1f77bcf86cd799439011',
    			product_name: 'Tesla'
  			}
		});
	var task = 'Tesla'
	res.render('pic.ejs', {task: task});
	//res.redirect('/todo'); //redirect the visitor to the list (/todo) after items were added or deleted
})

.get('/todo/fav/2/', function(req, res) { 
	analytics.track({
			anonymousId: String(anonymousId),
			event: 'Product Clicked',
			properties: {
			product_id: '507f1f77bcf86cd799439012',
			product_name: 'Porsche'
			}
	});
	var task = 'Porsche'
	res.render('pic.ejs', {task: task});
    //res.redirect('/todo'); //redirect the visitor to the list (/todo) after items were added or deleted
})

.get('/todo/fav/3/', function(req, res) { 
	analytics.track({
			anonymousId: String(anonymousId),
			event: 'Product Clicked',
			properties: {
			product_id: '507f1f77bcf86cd799439013',
			product_name: 'Ferrari'
			}
	});
	var task = 'Ferrari'
	res.render('pic.ejs', {task: task});
    //res.redirect('/todo'); //redirect the visitor to the list (/todo) after items were added or deleted
})
    
.get('/todo/fav/4/', function(req, res) { 
	analytics.track({
			anonymousId: String(anonymousId),
			event: 'Product Clicked',
			properties: {
			product_id: '507f1f77bcf86cd799439014',
			product_name: 'Lambourghini'
			}
	});
	var task = 'Lambourghini'
	res.render('pic.ejs', {task: task});
    //res.redirect('/todo'); //redirect the visitor to the list (/todo) after items were added or deleted
})


/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(process.env.PORT);
//.listen(8080);
