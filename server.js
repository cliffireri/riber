const path = require('path')
const express = require('express');
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/message')

const app = express();

const server = http.createServer(app);

const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'Riba Bot';

//run when client connects
io.on('connection', socket => {
    socket.emit('message',formatMessage(botName,'Welcome to riber')) //emit just to the client connected

    socket.broadcast.emit('message', formatMessage(botName,'A user has joined the chat')); //emit to all the clients except the client connecting

    //when a user disconnects

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', formatMessage(botName,'A user has left the chat'))
    })

    //io.emit() //broadcast to everyone in general
    //listen for chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('message',formatMessage('USER',msg))
    })

})

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server running on port ${port}`))

//module.exports = app