import * as React from 'react';

import { Link } from 'react-router-dom';

import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Container } from 'reactstrap';

import './Navigation.scss';

export default function Navigation() {
    return (
        <Container>
            <Navbar className='navigation'>
                <Nav className="mr-auto">
                    <NavItem>
                        <NavLink>
                            <Link to='/'>
                                Chat
                            </Link>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>
                            <Link to='/settings'>
                                Settings
                            </Link>
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </Container>
        
    )
}
