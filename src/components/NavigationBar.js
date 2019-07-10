import React from 'react';
import { Nav, Navbar,DropdownButton,Dropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { SwitchUser }  from './SwitchUser';

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

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/"> Uberlo </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                
                    <Nav.Item><Nav.Link href= "/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href= "/ride">Ride</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href= "/drive">Drive</Nav.Link></Nav.Item>
                    <Nav.Item><SwitchUser/></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)