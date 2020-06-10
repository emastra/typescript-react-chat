// @ts-nocheck

import * as io from 'socket.io-client';

// const socket = io();

// // On connect
// socket.on('connect', function() {
//     console.log('Connected to server');
// });

// // on disconnect
// socket.on('disconnect', function() {
//     console.log('Disconnected from server');
// });

// // on newMessage
// socket.on('newMessage', function(message) {
//     // var formattedTime = moment(message.createdAt).format('h:mm a');
//     // var template = document.getElementById('message-template').innerHTML;
//     // var html = Mustache.render(template, {
//     //   text: message.text,
//     //   from: message.from,
//     //   createdAt: formattedTime
//     // });
//     // document.querySelector('#messages').insertAdjacentHTML('beforeend', html); // The insertAdjacentHTML() method parses the specified text as HTML or XML and inserts the resulting nodes into the DOM tree at a specified position. It does not reparse the element it is being used on, and thus it does not corrupt the existing elements inside that element. This avoids the extra step of serialization, making it much faster than direct innerHTML manipulation.
//     // scrollToBottom();
//     console.log('New message in!');
// });

export default class Socket {
    constructor() {
        this.socket = io('localhost:3000'); // !!! dinamico here!
    }
    

    onConnect = () => {
        console.log('connect called!');
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
    }

    onDisconnect = () => {
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }

    onNewMessage = () => {
        this.socket.on('newMessage', (message) => {
            console.log('New message in:', message);

            
        });
    }

    emit = (ioEvent, message) => {
        this.socket.emit(ioEvent, {
            text: message
        });
    }
}

