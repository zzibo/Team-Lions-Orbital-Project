const express = require('express')
const {
    createNote,
    getNote,
    getNotes,
    deleteNote
} = require('../controllers/noteController')

const router = express.Router()

// GET all notes
router.get('/', getNotes)

// GET a single note
router.get('/:id', getNote)
  
// POST a new note
router.post('/', createNote)

// DELETE a note
router.delete('/:id', deleteNote)


module.exports = router
