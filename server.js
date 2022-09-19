// requires and variables
const fs = require('fs')
const { v4: uuid } = require('uuid');
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 3001;
const app = express ()

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// GET route for home page
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for the notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

 // route to db.json
 app.get('/api/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/db/db.json'))
);

// post new note
app.post('/api/notes', (req, res) => {
    const {title, text, id} = req.body
    if(title && text && id) {
        const newNote = {
            title,
            text,
            id,
            note_id: uuid (),
        };

        readAndAppend(newTip, './db/db.json');
        res.json(`Note added successfully 🗒️`);
      } else {
        res.error('Error in adding note');
      }    
})


// listening on port 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);