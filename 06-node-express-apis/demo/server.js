'use strict';

// Require our dependencies
// ExpressJS allows us to use the "app.get" syntax
const express = require('express');

// Superagent makes our proxied API requests
const superagent = require('superagent');

// CORS allows our front end and back end to be deployed separately but still talk to each other
// This was added after lecture, and will be discussed
const cors = require('cors');

// Makes sure that all of our routes can utilize CORS
// This was added after lecture, and will be discussed
app.use(cors());

// Instantiate ExpressJS so we can utilize its methods
const app = express();

// Allows us to make a .env file and securely store our API keys
require('dotenv').config();

// Tells our server which port to listen for requests on
const PORT = 3000;

// This route will respond when a request with a method of "GET" and a path of "/location" comes in
app.get('/location', (request, response) => {
  // console.log(request.query);

  // URL for the Google Geocoding API
  // request.query.data === what the user put in, such as "seattle"
  // the "data" part directly corresponds to the object literal the client sent
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.data}&key=${process.env.GOOGLE_API_KEY}`;

  // use "return" so we can obtain and therefore use the API response
  return superagent.get(url)
    // "result" correlates to the HUGE response object we saw in Postman
    .then(result => {
      // console.log(result.body.results[0].formatted_address);
      // Create an object literal using only certain portions of the API response
      // The client is expecting a response that is an object containing these four properties
      const locationResult = {
        search_query: request.query.data,
        formatted_query: result.body.results[0].formatted_address,
        latitude: result.body.results[0].geometry.location.lat,
        longitude: result.body.results[0].geometry.location.lng
      }

      // Send the object as the server's response to the client
      // When this line executes, the object will be passed into the .then of the original AJAX request
      response.send(locationResult);
    })
})

// Turn on our server so it listens for requests
// This must come after all of our other Express code, but helper functions can be written below
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
