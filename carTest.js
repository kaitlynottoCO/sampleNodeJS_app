/* Declare the function 'myFunc' */
function carFunction(carObject) {
  carObject.brand = "Toyota";
}

/*
 * Declare variable 'mycar';
 * create and initialize a new Object;
 * assign reference to it to 'mycar'
 */
var mycar = {
  brand: "Honda",
  model: "Accord",
  year: 1998
};

/* Logs 'Honda' and 1998 becuase the values are initially set to those*/
console.log(mycar.brand);
console.log(mycar.year);

/* Pass object mycar reference to the function created above */
carFunction(mycar);

/* Updates the bran of mycar to Toyota as changed to by the function. and prints */
console.log(mycar.brand);