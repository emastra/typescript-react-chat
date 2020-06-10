// @ts-nocheck

import * as React from 'react';

import { Link } from 'react-router-dom';

import './Navigation.scss';

import { CtxConsumer } from '../../context/context';

export default function Navigation() {
    // const pathname = window.location.pathname;

    return (
        <CtxConsumer>
            {(ctx) => {
                const { isBlinking, checkBlinking } = ctx;

                return (
                    <div className="header">
                        <div className="link-wrapper">
                            <Link 
                                className={isBlinking ? 'header-link blinking' : 'header-link'}
                                to='/'
                                onClick={checkBlinking}
                            >
                                Chat
                            </Link>
                            <Link 
                                // className={pathname === '/settings' ? 'header-link active': 'header-link'}
                                className='header-link active'
                                to='/settings'
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                );
            }}
        </CtxConsumer>
    );
}
