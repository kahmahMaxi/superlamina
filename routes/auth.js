const express = require('express')
const { handleAuth, getUser, createAgency, joinAgency, quitAgency, getAgency, getAgencies } = require('../controller/auth')
const { sendGlobalChats, getGlobalChats } = require('../controller/globalChat')
const usersAuth = require('./../middleware/user')
const { getAgencyChats, sendAgencyChat } = require('../controller/agencyChat')

const router = express.Router()

// handle auth route
router.post('/handleauth', handleAuth)

// get agency info
router.get('/getagency/:id', getAgency)

// get all agencies
router.get('/getagencies', getAgencies)

// get all global chats
router.get('/getglobalchats', getGlobalChats)


// require auth for all other route
router.use(usersAuth)

// get logged in user data
router.get('/getuser', getUser)

// create agency by user
router.post('/createagency', createAgency)

// join agency by user
router.patch('/joinagency', joinAgency)

// quit agency by user
router.patch('/quitagency', quitAgency)

// send a global chat
router.post('/sendglobalchat', sendGlobalChats)

// send a global chat
router.post('/sendagencychat', sendAgencyChat)

// send a global chat
router.get('/getagencychat', getAgencyChats)





module.exports = router