const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    pdf: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
