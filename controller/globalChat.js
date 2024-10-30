const GlobalChat = require('./../model/globalchat')


// get global chats for anyone accessing the page
const getGlobalChats = async (req, res) => {
    // const globalchats = await GlobalChat.find().sort({ createdAt: -1 })
    const globalchats = await GlobalChat.find().sort({ createdAt: -1 })
    const sortedChats = globalchats.reverse(); // This will show the latest messages from top to bottom
    
    res.status(200).json(sortedChats)
}

// send global chats for logged in user
const sendGlobalChats = async (req, res) => {
    const user_id = req.users._id
    const { username, useragency, time, colorCode, content, } = req.body

    const globalchat = await GlobalChat.create({ userid: user_id, username, useragency, time, label: 'chat', colorCode, content })
    
    res.status(200).json(globalchat)
}


module.exports = {
    getGlobalChats,
    sendGlobalChats,
}