const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seed data
const dbSeed = require(`./seeds/tickets.js`);

// Define model
const Ticket = require(`./models/ticket.js`);

/*******************************/
/* Mongoose/MongoDB Connection */
/*******************************/

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('CONNECTED TO DATABASE');
});

Comic.insertMany(dbSeed, function(error, comic) {
  console.log('Data import completed.')
  mongoose.connection.close();
});