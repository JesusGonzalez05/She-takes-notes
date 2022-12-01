// import express package as router
const apiRoutes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fs');




// Route for retrieving all saved notes
apiRoutes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);