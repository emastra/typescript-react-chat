// @ts-nocheck

import * as React from 'react';

import { FaTelegramPlane } from 'react-icons/fa';

import { CtxConsumer } from '../../context/context';

export default class SendForm extends React.Component {
    state = {
        textInput: ''
    }

    onInputChange = (e) => {
        const textInput = e.target.value;
        this.setState({ textInput });
    };

    onSubmit = (e, callback) => {
        e.preventDefault();

        callback(this.state.textInput);

        this.setState({
            textInput: ''
        })
    }

    render() {
        return (
            <CtxConsumer>
                {(ctx) => {
                    const { handleMessageSubmit, checkEnterKey } = ctx;

                    return (
                        <form onSubmit={(e) => { this.onSubmit(e, handleMessageSubmit) }}>
                            <div className="chat-bottom-wrapper">
                                <input 
                                    id="chat-input" 
                                    type="text" 
                                    name="textInput" 
                                    autoComplete="off" 
                                    placeholder="type something..." 
                                    autoFocus
                                    value={this.state.textInput}
                                    onChange={this.onInputChange}
                                    onKeyDown={checkEnterKey}
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="send-button"
                            >
                                <FaTelegramPlane className="send-icon" />
                            </button>     
                        </form>
                    );
                }}
            </CtxConsumer>
        );
    }
}
