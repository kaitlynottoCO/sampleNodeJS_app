var http = require('http'); //require makes call to Node.js library; http library allows us to create a web server
var url = require('url'); //finding out which page was requested
var querystring = require('querystring'); //retrieve the query string from the URL

var server = http.createServer(function(req, res) {//create server contains the function to be run when a visitor hits the website; this is a callback function
	var params = querystring.parse(url.parse(req.url).query);
	res.writeHead(200, {"Content-Type": "text/html"}); //sending back code 200 to say to the server it's all okay.

	if('firstname' in params && 'lastname' in params) {
		res.write('Your name is ' + params['firstname'] + ' ' + params['lastname']);
     }
     else {
     	res.write('You do have a first name and a last name, don\'t you?');
     }
     res.end();
 });
server.listen(8080); 

//To run this once you input 'node server.js' open browser and go to: http://localhost:8080/


//http://localhost:8080/path/to/the/page?param1=value&param2=value2
// 'path/to/the/page' = url.parse(req.url).pathname
// 'param1=value&param2=value2' = url.parse(req.url).query
// 'value2' = querystring.parse(url.parse(req.url).query)['param2']