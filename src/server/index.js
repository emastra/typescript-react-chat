const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));

// test middleware
app.use(function (req, res, next) {
    console.log(req.method, req.url, req.params, req.query);
    next();
});


io.on('connection', (socket) => {
    console.log('New user connected. Socket:', socket.id);

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});


server.listen(port, () => {
    console.log(`App is up on port ${port}`);
});
