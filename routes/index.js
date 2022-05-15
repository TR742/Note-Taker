const app = require("express").Router();
const path = require("path");
const util = require('util');
let api = require("../db/db.json");
const fs = require("fs");

// Get route for notes.html
app.get("/notes",function(req, res){
  res.sendFile(path.join(__dirname,"../public/notes.html"))
})

// Get route for index.html or landing page
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"../public/index.html"))
})

// 
app.get('/api/notes', (req, res) => {
    util.promisify(fs.readFile)('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // Post new note with random id
app.post("/api/notes", function (req, res) {
  api.push(
    {
      id: Math.floor(Math.random() * 50),
      title: req.body.title,
      text: req.body.text,
    },
  );
  fs.writeFileSync("./db/db.json", JSON.stringify(api), function (err) {
    if (err) throw err;
  });
  res.json(api);
});

module.exports = app