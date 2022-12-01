// requires express and path core module
const express = require('express');
const path = require('path');
const fs = require('fs');

// allows us to use express object and establishes port const
const app = express();
const PORT = process.env.port || 3001;

// middleware that states where to serve static data from
app.use(express.static('public'));

// route to homepage n
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// route to notes page (where you enter your notes)
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// server :)
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);