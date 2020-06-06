const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../dist')));

// const { generateMessage, generateLocationMessage } = require('./utils/message');
// const { isRealString, ensureCase } = require('./utils/validation');
// const { Users } = require('./utils/users');

// const users = new Users();

// test middleware
app.use(function (req, res, next) {
    console.log(req.method, req.url, req.params, req.query);
    next();
});


io.on('connection', (socket) => {
    console.log('New user connected. Socket:', socket.id);

    // createMessage event listener. Emit to every single connection
    // acknowledgments allow the request listener to send something back to the request emitter // placing a callback as 2nd arg in the callback function and then call it after...
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });

    // Listen for createLocationMessage
    // socket.on('createLocationMessage', (coords) => {
    //     var user = users.getUser(socket.id);

    //     if (user) {
    //         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    //     }
    // });


    // disconnect event
    socket.on('disconnect', () => {
        // remove user from the list when disconnet.
        var user = users.removeUser(socket.id);
        if (user) {
            // if removed, send updated list and message
            console.log('User was disconnected');
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

});


server.listen(port, () => {
    console.log(`App is up on port ${port}`);
});
