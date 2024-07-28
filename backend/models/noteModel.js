const { json } = require("express");
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
    mcqText: {
      type: [String],
      required: false,
    },
    flashCardText: {
      type: [String],
      required: false,
    },
    pdfName: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
