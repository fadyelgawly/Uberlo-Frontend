import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { SwitchUser } from './SwitchUser';

const Styles = styled.div`
    .navbar{
        background-color: #222;
    }
    .navbar-brand, .navbar-nav .nav-link{
        color: #bbb;

    &:hover {
        color: white;
    }

    }
`;

const user = JSON.parse(localStorage.getItem("user"));

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/"> Uberlo </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    {user ? null : <Nav.Item><Nav.Link href="/signup">Signup</Nav.Link></Nav.Item> }
                    {user ? null : <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item> }
                    {user ?  <Nav.Item><Nav.Link href="/login" onClick={() => {localStorage.clear()}}>Logout</Nav.Link></Nav.Item> : null }
                    {user ? <Nav.Item><SwitchUser/></Nav.Item> : null }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)