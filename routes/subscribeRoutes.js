const express = require('express');
const subscribeModel = require('../models/subscribe');
const app = express();

app.get('/subscribers', async (req, res) => {
  const subscribers = await subscribeModel.find({});

  try {
    res.send(subscribers);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app


