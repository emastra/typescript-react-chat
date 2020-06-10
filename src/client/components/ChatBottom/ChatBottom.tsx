// @ts-nocheck

import * as React from 'react';

import './ChatBottom.scss';

import SendForm from '../SendForm/SendForm';

import { FaTelegramPlane } from 'react-icons/fa';

export default function ChatBottom() {
    return (
        <div className="chat-bottom">
           <SendForm />
        </div>
        
    )
}
