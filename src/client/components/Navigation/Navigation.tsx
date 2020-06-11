// @ts-nocheck

import * as React from 'react';

import { NavLink } from 'react-router-dom';

import './Navigation.scss';


export default class Navigation extends React.Component {
    state = {
        isBlinking: false
    }

    componentDidUpdate(prevProps) {
        if (window.location.pathname !== '/' && prevProps.totalMessages < this.props.totalMessages) {
            this.setState({
                isBlinking: true
            });
        }
    }
  
    checkBlinking = () => {
        if (this.state.isBlinking) {
            this.setState({
                isBlinking: false
            });
        }
    }

    render() {
        const { isBlinking } = this.state;
        
        return (
            <div className="header">
                <div className="link-wrapper">
                    <NavLink 
                        className={`header-link ${isBlinking ? 'blinking' : ''}`}
                        activeClassName="active"
                        exact={true}
                        to='/'
                        onClick={this.checkBlinking}
                    >
                        Chat
                    </NavLink>
                    <NavLink 
                        className='header-link'
                        activeClassName="active"
                        to='/settings'
                    >
                        Settings
                    </NavLink>
                </div>
            </div>
        );
    }
}

