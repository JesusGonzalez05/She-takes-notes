// import express package as router
const apiRoute = require('express').Router();



// Route for retrieving all saved notes
router.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);