const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();

app.use(express.static('public'));

const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile('index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });
});

server.listen(3000, () => {
    console.log('Server running at port 3000.');
});