import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { logout } from './api';

export default function AppNavbar() {
    return (
        <Navbar id="navbar" expand="sm" variant="light">
            <Navbar.Brand href="/">
                The Good Fork
            </Navbar.Brand>

            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/register-staff">Staff</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/menu">Menu</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant="link" onClick={() => logout()}>Log out</Button>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}