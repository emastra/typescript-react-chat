// @ts-nocheck

import * as React from 'react';

import { NavLink } from 'react-router-dom';

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
                            <NavLink 
                                className={isBlinking ? 'header-link blinking' : 'header-link'}
                                activeClassName="active"
                                exact={true}
                                to='/'
                                onClick={checkBlinking}
                            >
                                Chat
                            </NavLink>
                            <NavLink 
                                // className={pathname === '/settings' ? 'header-link active': 'header-link'}
                                className='header-link'
                                activeClassName="active"
                                to='/settings'
                            >
                                Settings
                            </NavLink>
                        </div>
                    </div>
                );
            }}
        </CtxConsumer>
    );
}
