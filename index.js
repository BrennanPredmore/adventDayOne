// Create variable for inputdata === data
// Convert it to a string
// Create an array for each direction (N,E,S,W)
// Map/loop through data and perform split ( , )
// If statement 
// Else statment returns the distance travelled



const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input-1.txt`).toString(); 
const data = input.split(', ');
const actionRegex =  /^(L|R)([0-9]+)$/;

