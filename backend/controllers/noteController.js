require("dotenv").config();
const OpenAI = require("openai");

const Note = require("../models/noteModel");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }).single("pdf");
const pdfParse = require("pdf-parse");

//get all notes
const getNotes = async (req, res) => {
  try {
    const user_id = req.user._id;

    const notes = await Note.find({ user_id })
      .sort({ createdAt: -1 })
      .allowDiskUse(true)
      .exec();

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching notes",
      details: error.message,
    });
  }
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
    
    //functiont to generate mcqs
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
              The question generated serves as active recall questions to test students on the content in the text.
              When generating questions, follow these steps:
              1. Find the question and generated the correct answer
              2. Use your knowledge of common misunderstandings, common errors, or related but incorrect concepts to generate ten candidate distractors.
              3. Ensure that the distractors are similar in format and length to the correct answer.
              4. Review each distractor and evaluate its potential to mislead or confuse the test-taker.
              5. Eliminate any distractors that are clearly incorrect or irrelevant.
              6. Keep the distractors that are plausible but incorrect.
              7. Randomly select four distractors from the remaining candidates.
              8. Randomize the order of the five options (including the correct answer and the four distractors) to avoid any bias in the test-taker’s selection.
              9. Ensure that the correct answer is not always in the same position (e.g. not always the first or last option).

              Make sure the correct answer is clearly demarkated with a *. Furthermore, there must be a ; infront of every option. A example of a sample question 
              is shown below:
              What is 2+3?
              ;*a) 1.25 + 3.75
              ;b) 1+3
              ;c) 10/2.12
              ;d) 2 * 2
              Make sure no question sent is duplicated, there is no need for question number but seperate every question with |.
              Furthermore, the disctraction you provide should be close to the correct answer to the make the mcqs more challenging.
              Your respond should start with the question immediately.
              Make sure the last character is not ; and strictly follow all requirement I have mentioned above`,
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

    //function to generate flash cards
    const generateFlashCards = async (pdfText) => {
      const { apiKey } = process.env.OPENAI_API_KEY;
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

      try {
        //get response from chatgpt
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: `You are a flash card content generator. Your role is to make flash cards to test the knowledge of students to ensure they
              remember key concepts taught. Generate 10 flash cards from this text extracted from its PDF: ${pdfText}. 
              The question generated serves as active recall to test students on the content in the text.
              When generating flash cards, follow these steps:
              1. Read the text, understand what the text is about and decide what are the important concepts taught
              2. Make sure you focus on concepts with more nuance and difficult to remember
              3. From the text, find 15 flash card content containing key concept and facts that you want your students to remember
              4. Based on your knowledge, evaluate content and grade it form 0 - 10 based on accuracy, importance and educational value
              5. Select 10 best content and generate 10 flashcards
              6. Present the content in the following format:

              What is capital of france?;The capital of France is Paris

              Make sure no content sent is duplicated, there is no need for flashcard number but seperate every flashcard content with |.
              Your respond should start with the flash card content immediately.
              Make sure the last character is not ; and strictly follow all requirement I have mentioned above`,
            },
          ],
        });
        const flashcard = response.choices.map(
          (choice) => choice.message.content
        );
        //makes a list of all the flashcard
        const newflashcard = flashcard.map((f) => f.split("|"));
        return newflashcard[0];
      } catch (error) {
        console.error("Error generating MCQs:", error);
      }
    };

    try {
      // Parse the PDF buffer to extract text
      const data = await pdfParse(pdfFile.buffer);
      const mcqText = await generateMCQs(data.text);
      const flashCardText = await generateFlashCards(data.text);
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
        flashCardText,
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
