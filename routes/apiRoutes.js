// import express package as router
const apiRoute = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fs');




// Route for retrieving all saved notes
apiRoute.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);