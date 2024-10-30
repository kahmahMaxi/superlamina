
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const agenciesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    creatorName: {
        type: String,
        required: true,
    },
    memebers: {
        type: Array,
    },
    date: {
        type: Number,
    },
}, { timestamps: true })


module.exports = mongoose.model('Agencies', agenciesSchema)

