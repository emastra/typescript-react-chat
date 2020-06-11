// @ts-nocheck

import * as React from 'react';

import './MessageOut.scss';

import { generateDateTimeString } from '../../utils/utils';

export default function MessageOut(props) {
    const { message: {from, time, content}, clockDisplay } = props;
    const datetime = generateDateTimeString(time, clockDisplay);

    return (
        <div className="sent_msg">
            <span className="time_date right">{`${datetime}`}</span>
            <div className="sent_withd_msg">
                <p>{content}</p>
            </div>
        </div>
    );
}