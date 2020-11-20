// dependencies
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

// require gallery module
const Tickets = require('./models/ticket');
const Subscribers = require('./models/subscribe');
// const Members = require('./models/member.js');

//create express app
const app = express();

// view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static(path.join(__dirname, 'public')));

// handle form data
app.use(express.urlencoded({ extended: true }));

// set up mongoose connection
mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true,useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to DB...');
});

// homepage render
app.get('/', function(request, response){
  response.render('pages/index',
    {
      title: "catJAM Concerts", 
      tagline: "Concerts for people who like concerts.",

      current: "home"
    })
});

// gallery page render
app.get('/gallery', function(request, response){
  response.render('pages/gallery',
    {
      title: "catJAM Gallery", 
      tagline: "Have a look at some shows.",

      current: "gallery"
    })
});

// team page render
app.get('/team', function(request, response){
  response.render('pages/team',
    {
      title: "catJAM Team", 
      tagline: "These are the catJAMMERS.",

      current: "team"
    })
});

// subscribe page render
app.get('/subscribe', function(request, response){
  response.render('pages/subscribe',
  {
    title: "catJAM Subscribe", 
    tagline: "Get the latest updates on your favorite products.",

    webpage: "subscribe"
  })
});

// admin page render
app.get('/admin', function(request, response){
  response.render('pages/admin',
  {
    title: "catJAM Admin", 
    tagline: "Some of the people that we know.",

    webpage: "admin"
  })
});

// json endpoint for gallery
app.get('/api/v0/gallery', function(request, response){
  Tickets.find(function(err, data) {
    if (err || data.length===0) {
      response.send('unable to find venues');
    }
    else {
      response.json(data);
    }
  });
});

// json endpoint for gallery single image
app.get('/api/v0/gallery/:id', function(request, response){
  Tickets.find({id: request.params.id}, function(err,data) {
    if (err || data.length===0) {
      response.send('unable to find venue location');
    }
    else {
      response.json(data);
    }
  });  
});

// endpoint for subscribers
app.get('/api/v0/subscribers', function(request, response){
  Subscribers.find(function(err, data){
    if (err || data.length===0) {
      response.send('unable to find subscribers');
    }
    else {
      response.json(data);
    }
  });
});

// post form data
app.post('/subscribers', function(request, response){
  const subscriber = new Subscribers(request.body);
  console.log(request);
  subscriber.save(function(error){
    if (error) {
      response.status(500).send(error);
    }
    else {
      response.status(200).send(`<p>Hey, ${request.body.name}! Thanks, we'll send updates to ${request.body.email}.</p>`);
    }
  });  
});

// middleware
app.use(function(req, res) {
  res.status(404);
  res.send('404: File Not Found');
});

// set port preference
const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});