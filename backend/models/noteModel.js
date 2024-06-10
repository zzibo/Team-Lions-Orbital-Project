const mongoose = require('mongoose')


const Schema = mongoose.Schema

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Note', NoteSchema)

