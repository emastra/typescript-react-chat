// @ts-nocheck

import * as React from 'react';

import './ChatMain.scss';

import MessageIn from '../MessageIn/MessageIn';
import MessageOut from '../MessageOut/MessageOut';

import { CtxConsumer } from '../../context/context';

export default function ChatMain() {
    return (
        <CtxConsumer>
            {(ctx) => {
                const { messages, settings: { clockDisplay } } = ctx;

                return (
                    <div className="chat-wrapper">
                        <div className="chat-main">
                            {messages.map((message) => {
                                if (message.isOut)
                                    return <MessageIn key={message.id} message={message} clockDisplay={clockDisplay} />
                                else 
                                    return <MessageOut key={message.id} message={message} clockDisplay={clockDisplay} />
                            })}
                        </div>
                    </div>
                );
            }}
        </CtxConsumer>
    );
}
