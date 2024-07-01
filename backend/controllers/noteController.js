const Note = require("../models/noteModel");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }).single("pdf");
const pdfParse = require("pdf-parse");

//get all notes
const getNotes = async (req, res) => {
  const user_id = req.user._id;

  const notes = await Note.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

//get one note
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

//create new note
const createNote = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Failed to upload file." });
    }

    const { title, subject } = req.body;
    const pdfFile = req.file; // PDF is available here after multer processing
    const missing = [];

    if (!title) {
      missing.push("title");
    }
    if (!subject) {
      missing.push("subject");
    }
    if (!pdfFile) {
      missing.push("PDF");
    }
    if (missing.length > 0) {
      return res
        .status(400)
        .json({ error: `Missing fields: ${missing.join(", ")}` });
    }

    try {
      // Parse the PDF buffer to extract text
      const data = await pdfParse(pdfFile.buffer);
      const pdfText = data.text;
      const user_id = req.user._id;
      const note = await Note.create({
        title,
        subject,
        pdf: {
          data: pdfFile.buffer,
          contentType: pdfFile.mimetype,
        },
        pdfText,
        user_id,
      });
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

//delete note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such note" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

//update note

module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  //updateNote
};
