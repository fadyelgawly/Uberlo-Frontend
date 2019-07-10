import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import styled from 'styled-components';

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

export const SwitchUser = () => (
    <Styles>
        <DropdownButton id="dropdown-basic-button" title="Switch User">
            <Dropdown.Item href="#/action-1">Switch to Rider</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Switch to Driver</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Switch to Admin</Dropdown.Item>
        </DropdownButton>
    </Styles>
);