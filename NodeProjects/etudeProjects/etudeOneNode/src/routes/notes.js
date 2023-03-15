const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/notes/add", (req, res) => {
  res.render("notes/new-note");
});

router.post("/notes/new-note", (req, res) => {
  const { title, description } = req.body;
  const errors = [];

  if (!title) errors.push({ text: "Write a Title" });
  if (!description) errors.push({ text: "Write a description" });

  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const note = new Note({ title, description });

    console.log(note);
  }
});

router.get("notes", (req, res) => {
  res.send("notes from database");
});

module.exports = router;
