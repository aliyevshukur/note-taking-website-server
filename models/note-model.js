const mongoose = require("mongoose");

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
  },
  {
    timestamp: true,
  },
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
