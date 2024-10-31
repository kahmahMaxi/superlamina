require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const { Server } = require("socket.io")

// routes
const userRt = require('./routes/auth')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        methods: "GET,POST,PATCH,DELETE",
        credentials: true,
    })
)


// routes and funcs
app.use('/user', userRt)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN,
        methods: ["GET", "POST", "PATCH", "DELETE"],
    },
})

let connectedUsers = 0

io.on('connection', (socket) => {
    // Listen for the "connect" event to increment the counter
     socket.on('send_connected_users', () => {
        connectedUsers++;
        socket.broadcast.emit('receive_connected_users', connectedUsers)
        // console.log(`Total connected users: ${connectedUsers}`)
    });

    socket.broadcast.emit('send_connected_users', connectedUsers)

    // listen to an event from the client side
    socket.on('send_global_message', (data) => {
        socket.broadcast.emit('receive_global_message', data)
    })

    // join the agency event before listening
    socket.on('join_agency_chat', (data) => {
        socket.join(data)
    })

    socket.on('send_agency_message', (data) =>  {
        socket.to(data.itemagency).emit('receive_agency_message', data.itemupdate)
    })

     // Listen for the "disconnect" event to decrement the counter
     socket.on('disconnect', () => {
        connectedUsers--;
        // console.log(`User disconnected: ${socket.id}`);
        // console.log(`Total connected users: ${connectedUsers}`);
        socket.broadcast.emit('receive_connected_users', connectedUsers)
    });
})


const port = process.env.PORT || 7070
// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // const currentDate = Date.now()
        console.log('successfully connected to the db')
        // listen for request
        server.listen(port, () => {
            console.log('listening on port', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })

