const express = require("express");
const mongoose = require("mongoose");
const Notes = require("./models/note-model");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "16mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Notes Server is running");
});

// Post new notes to MongoDB database
app.post("/notes", async (req, res) => {
  try {
    const note = await Notes.create(req.body);
    const notes = await Notes.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message, ok: false });
  }
});

// Get notes from MongoDB database
app.get("/notes", async (req, res) => {
  try {
    const filter = req.query.filter;
    let notes = [];
    if (filter === "archived")
      notes = await Notes.find({ isArchived: true }).sort("zIndex");
    else notes = await Notes.find({ isArchived: false }).sort("zIndex");

    res.status(200).json({ ok: true, notes: notes });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ ok: false, message: error.message });
  }
});

// Get single note from MongoDB database
app.get("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Notes.findById(id);
    res.status(200).json(note);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update a note from MongoDB database
app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await Notes.find();
    const note = await Notes.findByIdAndUpdate(id, req.body);
    if (!note) {
      return res
        .status(404)
        .json({ message: `Cannot find note with ID: ${id}`, ok: false });
    }

    const updatednote = await Notes.findById(id);
    res.status(200).json({ ok: true, notes: notes });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ ok: false, message: error.message });
  }
});

// Update a batch of notes from MongoDB database
app.put("/notes", async (req, res) => {
  try {
    const notes = req.body;

    for (let i = 0; i < notes.length; i++) {
      const id = notes[i]._id;
      const note = await Notes.findByIdAndUpdate(id, notes[i]);
      console.log(note);

      if (!note) {
        return res
          .status(404)
          .json({ ok: false, message: `Cannot find note with ID: ${id}` });
      }
    }

    const updatednotes = await Notes.find();
    res.status(200).json({ ok: true, notes: updatednotes });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ ok: false, message: error.message });
  }
});

// Delete a note from MongoDB database
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findByIdAndDelete(id);
    if (!note) {
      return res
        .status(404)
        .json({ message: `Cannot find note with ID: ${id}` });
    }

    res.status(200).json(note);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://dejavu:Draven0521@traveloverloadapi.7qqrj.mongodb.net/Travel-API?retryWrites=true&w=majority&appName=TravelOverloadApi",
  )
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(5000, console.log("Server started on 5000"));
  })
  .catch((error) => {
    console.log(error);
  });
