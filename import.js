const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seed data
const gallerySeed = require(`./seeds/tickets.js`);
const subscribeSeed = require('./seeds/subscribe');

// Define model
const ticket = require('./models/ticket.js');
const subscribe = require('./models/subscribe.js');


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

// ticket.insertMany(gallerySeed, function(error, ticket) {
//   console.log('Data import completed.')
//   mongoose.connection.close();
// });

subscribe.insertMany(subscribeSeed, function(error, ticket) {
  console.log('Data import completed.')
  mongoose.connection.close();
});