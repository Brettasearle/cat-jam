// dependencies
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

// require gallery module
const tickets = require('./tickets');
//subform
const subscribeRouter = require('./routes/subscribeRoutes.js');

//create express app
const app = express();
//(subscribe form) make sure it comes back as json
app.use(express.json());

mongoose.connect('mongodb+srv://cat-jam:cat-jam@cluster0.a1zfn.mongodb.net/cat-jammers?retryWrites=true&w=majority', {useNewUrlParser: true
});

app.use(subscribeRouter);

// view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static(path.join(__dirname, 'public')));

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
  response.json(tickets);
});

// json endpoint for gallery single image
app.get('/api/v0/gallery/:id', function(request, response){
  response.send(`<img src="/images/venue-${request.params.id}.jpg">`)
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