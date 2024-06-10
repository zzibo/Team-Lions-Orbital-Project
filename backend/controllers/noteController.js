const Note = require('../models/noteModel')
const mongoose = require('mongoose')

//get all notes
const getNotes = async (req, res) => {
    const notes = await Note.find({}).sort({createdAt: -1})
    res.status(200).json(notes)
  }
  
//get one note
const getNote = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such note'})
    }
  
    const note = await Note.findById(id)
  
    if (!note) {
      return res.status(404).json({error: 'No such note'})
    }
  
    res.status(200).json(note)
  }

//create new note
const createNote = async (req, res) => {
    const {title, subject, body} = req.body

    try {
        const note = await Note.create({title, subject, body})
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }

}

//delete note
const deleteNote = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such note'})
    }
  
    const note = await Note.findOneAndDelete({_id: id})
  
    if(!note) {
      return res.status(400).json({error: 'No such note'})
    }
  
    res.status(200).json(note)
  }

//update note

module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    //updateWorkout
  }