// Vendor Imports
const path = require('path');
const fs = require('fs');

// Runtime constants
const models = {};
const dir = path.resolve(__dirname, './');
const files = fs
   .readdirSync(dir)
   .filter( file => (file.indexOf('.js') !== -1) && (file !== 'index.js') )

// Cumulate all models
files.forEach( file => {
   file = file.slice(0, file.indexOf('.js') );
   const key = file.toLocaleLowerCase();
   models[key] = require(`./${file}`) 
})

// Debug logger
// console.log(dir)
console.log(`All Database Models: [${files}]`)
// console.log(models);


module.exports = models;