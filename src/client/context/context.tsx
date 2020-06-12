// @ts-nocheck

import * as React from 'react';

import Socket from '../socket/Socket';
import StorageClient from '../utilities/StorageClient';

const Context = React.createContext();


class CtxProvider extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
            settings: {},
            messages: []
        };

        // init socket class
        this.socket = new Socket(this.setNewMessage);
        // init localStorage client
        this.storage = new StorageClient();
    }

    componentDidMount() {
        // start socket event listeners
        this.socket.onConnect();
        this.socket.onDisconnect();
        this.socket.onNewMessage();

        // read localstorage, or set defaults
        let { 
            settings = this._defaultSettings, 
            messages = []
        } = this.storage.getStorage();

        // set state
        this.setState({
            settings: { ...settings },
            messages: [ ...messages ]
        });
    }

    _defaultSettings = {
        username: 'guest',
        selectedTheme: 'light',
        clockDisplay: '12',
        ctrlEnter: 'on',
        language: 'en'
    };

    _generateNextId = () => {
        const { messages = [] } = this.storage.getStorage('messages');

        const lastMessage = messages[messages.length - 1];
        let lastId = lastMessage ? lastMessage.id : null;

        if (!lastId) return '1';
        else return String(++lastId);
    }

    setNewMessage = (newMessage) => {
        // check if message is incoming
        const isReceived = !this.state.messages.some(m => m.id === newMessage.id);

        if (isReceived) {
            const messages = [ ...this.state.messages ];

            // add newMessage to state and sync the localStorage
            this.setState((state) => {
                return { 
                    messages: [ ...messages, newMessage ]
                };
            }, () => {
                this.storage.syncStorage('messages', this.state.messages);
            });
        }
    }

    resetSettings = () => {
        // set settings state to defaults, and sync the localStorage
        this.setState({
            settings: {
                ...this._defaultSettings
            }
        }, () => {
            this.storage.syncStorage('settings', this.state.settings);
        });
    }

    handleInputChange = (event) => {
        const settings = Object.assign({}, this.state.settings);
        const name = event.target.name;
        const value = event.target.value;

        // add updated value to settings property
        this.setState({
            settings: {
                ...settings,
                [name]: value
            }
        }, () => {
            this.storage.syncStorage('settings', this.state.settings);
        });
    }

    handleMessageSubmit = (text) => {
        const messages = [ ...this.state.messages ];

        // generate new message
        const newMessage = {
            id: this._generateNextId(), 
            from: this.state.settings.username, 
            time: new Date().getTime(), 
            content: text
        }

        // emit new message to all connected clients
        this.socket.emit('createMessage', newMessage);

        // add new message to state
        this.setState((state) => {
            return {
                messages: [ ...messages, newMessage ]
            }
        }, () => {
            this.storage.syncStorage('messages', this.state.messages);
        });
    }

    checkEnterKey = (event) => {
        const { ctrlEnter } = this.state.settings;

        if (event.key === 'Enter' && ctrlEnter === 'off') 
            event.preventDefault();
    }

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,

                    handleInputChange: this.handleInputChange,
                    resetSettings: this.resetSettings,
                    handleMessageSubmit: this.handleMessageSubmit,
                    checkEnterKey: this.checkEnterKey
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

const CtxConsumer = Context.Consumer;

export { CtxProvider, CtxConsumer };

