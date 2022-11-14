const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// middleware that handles the request and response objects through the server
// app.use runs for every type of requests to all routes 
// order of middleware is important, it runs through each request until it matches and sends a response

// interprets the incoming request object as a string
app.use(express.urlencoded({ extended: true}));
// interprets the incoming request object as a json
app.use(express.json());
app.use(routes);


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
