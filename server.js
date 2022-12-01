// requires express and path core module
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


// allows us to use express object and establishes port const
const app = express();
const PORT = process.env.port || 3001;

// middleware that states where to serve static data from
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route to homepage n
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// route to notes page (where you enter your notes)
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);



// Route for retrieving all saved notes
app.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// server :)
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);