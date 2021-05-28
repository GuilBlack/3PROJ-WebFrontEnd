import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { logout } from '../api';
import AuthContext from '../context/AuthContext';

export default function AppNavbar() {
    const { loggedIn, setLoggedIn } = React.useContext(AuthContext);
    return (
        <Navbar id="navbar" collapseOnSelect expand="sm" variant="light" bg="light" sticky="top">
            <Navbar.Brand href="/">
                The Good Fork
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/staff">Staff</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/menu">Menu</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button hidden={!loggedIn} variant="link" onClick={() => { logout(); setLoggedIn(false) }}>Log out</Button>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
