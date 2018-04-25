var myTest = require('./testModule'); //makes call to testModule.js file located in same directory

myTest.sayHello();
myTest.sayGoodbye();

var myCar = require('./carTest');

//var markdown = require('markdown').markdown; //the module handbook tells us we need to use require('markdown').markdown...
//console.log( markdown.toHTML('A paragraph in **markdown**!')); //prints out <p>A paragraph in <strong>markdown</strong>!</p>