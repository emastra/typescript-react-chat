// @ts-nocheck

import * as React from 'react';

import './ChatPage.scss';

import ChatMain from '../components/ChatMain/ChatMain';
import ChatBottom from '../components/ChatBottom/ChatBottom';

export default class ChatPage extends React.Component {


    componentDidMount() {
        console.log('chatpage mounted');
    }

    render() {
        return (
            <>
                <ChatMain />
                <ChatBottom />
            </>
        );
    }
}

