var sayHello = function() { //creating sayHello function
    console.log('Hello!');
}

exports.sayHello = sayHello; //calling sayHello function and exporting for external use


exports.sayGoodbye = function() { //doing the same as aboove but creating the function, calling it and exporting all at once
    console.log('Goodbye!')
};