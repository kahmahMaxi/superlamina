
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const authsSchema = new Schema({
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    agency: {
        type: String,
    },
    agDate: {
        type: Number,
    },
}, { timestamps: true })



// static signup method
authsSchema.statics.handleauth = async function(email, username) {

    // validation
    if(!email || !username) {
        throw Error('Please, fill in all fields')
    }

    const auths = await this.findOne({ useremail: email })

    if(auths) {
        return auths
    } 
    
    if (!auths) {
        const auths = await this.create({ useremail: email, username, agency: '', agDate: 0 })

        return auths
    }
}

// static login method
// authsSchema.statics.login = async function(email, password) {

//     // validation
//     if(!email || !password) {
//         throw Error('Please, fill in all fields')
//     }

//     const auths = await this.findOne({ useremail: email })

//     if(!auths) {
//         throw Error('User does not exists')
//     }

//     const match = await bcrypt.compare(password, auths.password)

//     if(!match) {
//         throw Error('Incorrect password')
//     }

//     return auths
// }


module.exports = mongoose.model('Auths', authsSchema)