// @ts-nocheck

import * as React from 'react';

import './MessageIn.scss';

import { generateDateTimeString } from '../../utils/utils';

export default function MessageIn(props) {
    const { message: {from, time, content}, clockDisplay } = props;
    const datetime = generateDateTimeString(time, clockDisplay);
    
    return (
        <div className="received_msg">
            <div className="received_withd_msg">
            <span className="time_date">{`${from} | ${datetime}`}</span>
                <p>{content}</p>
            </div>
        </div>
    );
}
