const mongoose = require("mongoose");

const Position = mongoose.Schema({
  x: Number,
  y: Number,
});

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title"],
      default: "",
    },
    context: {
      type: String,
      required: [true, "Please enter context"],
      default: "",
    },
    color: {
      type: String,
      required: [true, "Please enter  color of note"],
      default: "",
    },
    isArchived: {
      type: Boolean,
      required: [true, "Please enter archive status of note"],
      default: false,
    },
    position: {
      type: Position,
      required: [true, "Please enter position of note"],
      default: { x: 0, y: 0 },
    },
  },
  {
    timestamp: true,
  },
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
