import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';


export class SwitchUser extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoggedIn: null,
            isAdmin: null,
            isDriver: null
        };
    }

    componentDidMount() {

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            this.setState({
                isLoggedIn: true,
                isAdmin: user.isAdmin,
                isDriver: user.isDriver
            });
        } else {
            this.setState({
                loggedin: false
            });
        }
    }
    render() {
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title="Switch">
                    <Dropdown.Item href="/rider/dashboard">Rider</Dropdown.Item>
                    {this.state.isDriver ? <Dropdown.Item href="/driver/dashboard">Driver</Dropdown.Item> : null}
                    {this.state.isAdmin ? <Dropdown.Item href="/admin/dashboard">Admin</Dropdown.Item> : null}
                </DropdownButton>
            </div>
        );
    }
}

