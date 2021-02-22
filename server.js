const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = app.listen(3000);
const io = socketIO(server);

app.use(express.static('public'));

io.sockets.on('connection', (socket) => {
    socket.on('control', (data) => console.log(`Received: ${data.id}`));
})


