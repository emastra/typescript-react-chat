const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));

// // test middleware
// app.use((req, res, next) => {
//     console.log(req.method, req.url, req.params, req.query);
//     next();
// });

// all routes route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// socket on connection
io.on('connection', (socket) => {
    console.log('New user connected. Socket:', socket.id);

    // event listener for createMessage
    socket.on('createMessage', (message, callback) => {
        // emit the received message
        io.emit('newMessage', message);
    });

    // on disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});


server.listen(port, () => {
    console.log(`App is up on port ${port}`);
});
