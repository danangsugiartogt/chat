const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

io.on("connection", socket => {
    console.log('socket connection');
    socket.on('send-message', message => {
        const data = { socketId: socket.id, message: message}
        socket.broadcast.emit('new-message', data.socketId, data.message);
    });
});

server.listen(3000, ()=>{
    console.log('server running on port 3000...');
});