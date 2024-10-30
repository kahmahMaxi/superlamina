const Auths = require('./../model/users')
const Agencies = require('./../model/agencies')
const jwt = require('jsonwebtoken')

// create token
const createToken = (_id) => {
    return jwt.sign({_id: _id}, process.env.JWT_SECRET, { expiresIn: '90d', })
}


// handle auth
const handleAuth = async (req, res) => {
    const { email, username } = req.body

    try {
        const auths = await Auths.handleauth(email, username)

        // create a token
        const token = createToken(auths._id)

        res.status(200).json({username, useremail: auths.useremail, agency: auths.agency, agDate: auths.agDate, token})
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

// get user
const getUser = async (req, res) => {
    const user_id = req.users._id

    const exists = await Auths.findOne({ _id: user_id })

    if(!exists) {
        res.status(400).json({ error: "no such user" })
    } else {
        res.status(200).json(exists)
    }
}

// create agency
const createAgency = async (req, res) => {
    const user_id = req.users._id
    const username = req.usernames.username
    const { agencyname } = req.body

    
    const exists = await Agencies.findOne({ name: agencyname, })
    
    if(exists) {
        res.status(400).json({ error: "agency already exists, please enter a different name" })
    }
    
    if(!exists) {
        const now = Date.now()
        const agency = await Agencies.create({ name: agencyname, createdBy: user_id, creatorName: username, memebers: [`${username}`, ], date: now })
        
        const user = await Auths.findOneAndUpdate({ _id: user_id }, {
            agency: agencyname, agDate: now
        })

        res.status(200).json(user)
    }
}

// join agency
const joinAgency = async (req, res) => {
    const user_id = req.users._id
    const username = req.usernames.username
    const { agencyname } = req.body
    const now = Date.now()
    
    const user = await Auths.findOneAndUpdate({ _id: user_id }, {
        agencyname, agDate: now
    })
    const agency = await Agencies.findOne({ name: agencyname })

    if(user && agency) {
        const upadatedAgency = await Agencies.findOneAndUpdate({ name: agencyname }, {
            memebers: [...agency.memebers, `${username}`],
        })
        // console.log(upadatedAgency)
        res.status(200).json(user)
    }
    
    res.status(400).json({ error: "user does not exists or no such agency" })
}

// quit agency
const quitAgency = async (req, res) => {
    const user_id = req.users._id
    const username = req.usernames.username
    const { agencyname } = req.body
    
    const user = await Auths.findOneAndUpdate({ _id: user_id }, {
        agencyname: ''
    })
    const agency = await Agencies.findOne({ name: agencyname })

    if(user && agency) {
        const filtered = agency.memebers.filter(member => member !== username)
        // console.log(filtered)
        const upadatedAgency = await Agencies.findOneAndUpdate({ name: agencyname }, {
            memebers: [...filtered]
        })
        // console.log(upadatedAgency)
        res.status(200).json(user)
    }
    
    res.status(400).json({ error: "user does not exists or no such agency" })
}

// get agency
const getAgency = async (req, res) => {
    const { id } = req.params

    const exists = await Agencies.findOne({ name: id })

    if(!exists) {
        res.status(400).json({ error: "no such agency" })
    } else {
        res.status(200).json(exists)
    }
}

// get agencies
const getAgencies = async (req, res) => {
    const agencies = await Agencies.find()

    const sorted = agencies.sort((a, b) => b.memebers.length - a.memebers.length)
    
    res.status(200).json(sorted)
}

module.exports = {
    handleAuth,
    getUser,
    createAgency,
    joinAgency,
    quitAgency,
    getAgency,
    getAgencies,
}