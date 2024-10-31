const AgencyChat = require('./../model/agencychat')


// get global chats for anyone accessing the page
const getAgencyChats = async (req, res) => {
    const { agencyname } = req.body

    const agencychats = await AgencyChat.find({ agencyname }).sort({ createdAt: -1 })
    const sortedChats = agencychats.reverse(); // This will show the latest messages from top to bottom
    
    res.status(200).json(sortedChats)
}

// send agency chats for logged in user
const sendAgencyChat = async (req, res) => {
    const user_id = req.users._id
    const { username, agencyname, time, colorCode, content, } = req.body

    const agencychat = await AgencyChat.create({ userid: user_id, username, agencyname, time, label: 'chat', colorCode, content })

    res.status(200).json(agencychat)
}


module.exports = {
    getAgencyChats,
    sendAgencyChat,
}
