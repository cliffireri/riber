const path = require('path')
const express = require('express');
const http = require('http')
const socketio = require('socket.io')

const app = express();

const server = http.createServer(app);

const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//run when client connects
io.on('connection', socket => {
    console.log('New Websocket connection')
})

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server running on port ${port}`))

//module.exports = app