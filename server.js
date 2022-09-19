// requires and variables
const fs = require("fs");
const { v4: uuid } = require("uuid");
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// GET route for the notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// route to db.json
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

// GET route for home page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

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



// listening on port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
