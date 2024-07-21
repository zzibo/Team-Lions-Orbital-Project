require("dotenv").config();
const OpenAI = require("openai");

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

    const generateMCQs = async (pdfText) => {
      const { apiKey } = process.env.OPENAI_API_KEY;
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      try {
        //get response from chatgpt
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `You are a MCQ generator for national examination. Your role is to make MCQs to test the knowledge of students to ensure they
              remember key concepts taught. Generate 10 multiple-choice questions from this text extracted from its PDF: ${pdfText}. 
              The question generated serves as active recall questions to test students on the content in the text
              Make sure the correct answer is clearly demarkated with a *. Furthermore, there must be a ; infront of every option. A example of a sample question 
              is shown below:
              What is 2+3?
              ;*a) 1.25 + 3.75
              ;b) 1+3
              ;c) 10/2.12
              ;d) 2 * 2
              Do not end the paragraph with a ;
              Make sure no question sent is duplicated, there is no need for question number but seperate every question with |.
              Furthermore, the disctraction you provide should be close to the correct answer to the make the mcqs more challenging`,
            },
          ],
        });
        const qns = response.choices.map((choice) => choice.message.content);
        //makes a list of all the qns
        const newMcqs = qns.map((q) => q.split("|"));
        return newMcqs[0];
      } catch (error) {
        console.error("Error generating MCQs:", error);
      }
    };

    try {
      // Parse the PDF buffer to extract text
      const data = await pdfParse(pdfFile.buffer);
      const mcqText = await generateMCQs(data.text);
      const pdfName = pdfFile.originalname;
      const user_id = req.user._id;
      const note = await Note.create({
        title,
        subject,
        pdf: {
          data: pdfFile.buffer,
          contentType: pdfFile.mimetype,
        },
        mcqText,
        pdfName,
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
