// requires and variables
const fs = require("fs");
const { v4: uuid } = require("uuid");
const path = require("path");
const express = require("express");
const { response } = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// route for the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// route to db.json
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

// route for home page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// route for specific note with ID
app.get("/api/notes/id", (req, res) => res.json(notes[req.param.id]));

// post new note
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    console.log(req.body);
    if (err) throw err;
    let notes = JSON.parse(data);
    let newTask = { title: req.body.title, text: req.body.text, id: uuid() };
    notes.push(newTask);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
      res.json(notes);
    });
  });
});

// delete note
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    let notes = JSON.parse(data);
    const result = notes.filter((notes) => notes.id !== noteId);
    fs.writeFile("./db/db.json", JSON.stringify(result), (err, data) => {
      res.json({ok: true});
    });
  });
});

// listening on port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);