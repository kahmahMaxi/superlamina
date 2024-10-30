
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const agencyChatSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    agencyname: {
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


module.exports = mongoose.model('AgencyChat', agencyChatSchema)

