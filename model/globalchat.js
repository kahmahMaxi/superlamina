
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const globalChatSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    useragency: {
        type: String,
    },
    time: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    colorCode: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true })


module.exports = mongoose.model('GlobalChat', globalChatSchema)

