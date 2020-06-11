// @ts-nocheck

import * as React from 'react';

import './StyleWrapper.scss';

import { CtxConsumer } from '../../context/context';

export default function Container(props) {
    return (
        <CtxConsumer>
            {(ctx) => {
                const { selectedTheme } = ctx.settings;
                
                return (
                    <div className={`theme-${selectedTheme}`}>
                        <div className="style-wrapper">
                            <div className="container-fluid">
                                {props.children}
                            </div>
                        </div>
                    </div>
                );
            }}
        </CtxConsumer>
    );
}
