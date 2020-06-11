// @ts-nocheck

import * as React from 'react';
import * as io from 'socket.io-client';

const Context = React.createContext();


class CtxProvider extends React.Component {
    state = {
        settings: {},
        messages: [],
        isBlinking: false
    };

    componentDidMount() {
        // start socket event listeners
        this.onConnect();
        this.onDisconnect();
        this.onNewMessage();

        // read localstorage and set state of settings!!
        const settings = this.getStorageSettings();
        this.setState({
            settings: {
                ...settings
            }
        });

        // read localstorage and set state of messages!!
        const messages = this.getStorageMessages();
        this.setState({
            messages: [ ...messages ]
        });
    }


    // Socket

    socket = io('localhost:3000'); // !!! dinamico here!

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
        this.socket.on('newMessage', (newMessage) => {
            // if it's not the sender of the message - check if message.id is already in state.messages -NO: check isOut
            if (!this.state.messages.some(m => m.id === newMessage.id)) {
                const messages = [ ...this.state.messages ];

                //toggle
                let { isBlinking } = this.state;
                if (window.location.pathname !== '/') {
                    isBlinking = !isBlinking
                }

                this.setState((state) => {
                    return { 
                        messages: [ ...messages, newMessage ],
                        isBlinking
                    };
                },
                    this.syncStorageMessages
                );
            }
        });
    }

    emit = (ioEvent, message) => {
        console.log('emit method just called with message:', message);
        const outMessage = Object.assign({}, message, { isOut: true });
        console.log('emitting', outMessage);
        this.socket.emit(ioEvent, outMessage);
    }

    // Settings

    // defaultSettings
    defaultSettings = {
        username: 'guest',
        selectedTheme: 'light',
        clockDisplay: '12',
        ctrlEnter: 'on',
        language: 'en'
    };

    syncStorageSettings = () => {
        localStorage.setItem('settings', JSON.stringify(this.state.settings));
    };

    getStorageSettings = () => {
        let settings;

        if (localStorage.getItem('settings')) {
            settings = JSON.parse(localStorage.getItem('settings'));
        } else {
            // set default settings
            settings = this.defaultSettings;
        }

        return settings;
    };

    resetStorageSettings = () => {
        // set settings state to defaults, and sync the storage
        this.setState({
            settings: {
                ...this.defaultSettings
            }
        }, 
            this.syncStorageSettings
        )
    }

    handleInputChange = (event) => {
        const settings = Object.assign({}, this.state.settings);
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            settings: {
                ...settings,
                [name]: value
            }
        }, 
            this.syncStorageSettings
        );
    }

    // Messages

    generateNextId = () => {
        const messages = this.getStorageMessages();
        const lastMessage = messages[messages.length - 1];
        let lastId = lastMessage ? lastMessage.id : null;

        if (!lastId) return '1';
        else return String(++lastId);
    }

    syncStorageMessages = () => {
        localStorage.setItem('messages', JSON.stringify(this.state.messages));
    };

    getStorageMessages = () => {
        let messages;

        if (localStorage.getItem('messages')) {
            messages = JSON.parse(localStorage.getItem('messages'));
        } else {
            messages = [];
        }

        return messages;
    }

    handleMessageSubmit = (text) => {
        const messages = [ ...this.state.messages ];
        const newMessage = {
            id: this.generateNextId(), 
            from: this.state.settings.username, 
            time: new Date().getTime(), 
            content: text
        }

        this.emit('createMessage', newMessage);

        this.setState((state) => {
            return {
                messages: [ ...messages, newMessage ]
            }
        },
            this.syncStorageMessages
        );
    }

    checkEnterKey = (event) => {
        const { ctrlEnter } = this.state.settings;

        if (event.key === 'Enter' && ctrlEnter === 'off') 
            event.preventDefault();
    }

    // altro

    checkBlinking = (e) => {
        if (this.state.isBlinking) {
            this.setState((state) => {
                return {
                    isBlinking: !state.isBlinking
                }
            })
        }
    }
   

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,

                    handleInputChange: this.handleInputChange,
                    resetStorageSettings: this.resetStorageSettings,
                    handleMessageSubmit: this.handleMessageSubmit,
                    checkEnterKey: this.checkEnterKey,
                    checkBlinking: this.checkBlinking
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

const CtxConsumer = Context.Consumer;

export { CtxProvider, CtxConsumer };

