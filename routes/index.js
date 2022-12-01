// require express
const express = require('express');

//import modular routers from /apiRoutes
const apiRoutes = require('./apiRoutes')

// create app to use the express object 
const app = express();

// tell express to use api routes
app.use('./apiRoutes', apiRoutes);

module.exports = app