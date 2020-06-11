// @ts-nocheck

import * as io from 'socket.io-client';

export default class Socket {
    constructor(setNewMessage) {
        // init socket
        this.socket = io(process.env.SERVER_URL);
        this.setNewMessage = setNewMessage;
    }
    
    onConnect = () => {
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
        this.socket.on('newMessage', (newMessage) => {
            // call setNewMessage from context
            this.setNewMessage(newMessage);
        });
    }

    emit = (ioEvent, message) => {
        // add isOut property to message
        const outMessage = Object.assign({}, message, { isOut: true });
        // emit event with message
        this.socket.emit(ioEvent, outMessage);
    }
}

