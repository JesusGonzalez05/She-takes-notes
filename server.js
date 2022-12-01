// requires express and path core module
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');


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

// Route for posting/saving note
app.post("/api/notes", (req, res) => {
  const { text, title } = req.body;
    readFromFile("./db/db.json").then((data) => {
      let dataBase = JSON.parse(data);
      dataBase.push({ id: uuidv4(), text, title });
      writeToFile("./db/db.json", dataBase);
      res.json(dataBase)
    });
  });
// Route for deleting notes
app.delete("/api/notes/:id", (req, res) => {
    const {id } = req.params;
    readFromFile("./db/db.json").then((data) => {
        let dataBase = JSON.parse(data);
        dataBase = dataBase.filter(note => note.id !== id)
        writeToFile("./db/db.json", dataBase);
        res.json(dataBase)
      });
  });

// server :)
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);