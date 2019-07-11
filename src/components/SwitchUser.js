import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';


export class SwitchUser extends React.Component {



    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoggedIn: null,
            isAdmin: null,
            isDriver: null
        };
    }

    componentWillMount() {

        const token = JSON.parse(localStorage.getItem("jwt"));
        if (token) {
            axios.get(global.baseURL + '/admin/users', {
                headers: {
                    Authorization: 'JWT ' + token
                }
            })
                .then((response) => {
                    this.setState({
                        isLoggedIn: true,
                        isAdmin: response.data.isAdmin,
                        isDriver: response.data.isDriver
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            this.setState({
                loggedin: false
            });
        }

    }


    render() {
        if (this.state.isLoggedIn && (this.state.isAdmin || this.state.isDriver)) {
            return (
                <div>
                    <DropdownButton id="dropdown-basic-button" title="Switch">
                        <Dropdown.Item href="#/action-1">Rider</Dropdown.Item>
                        {this.state.isDriver?  <Dropdown.Item href="#/action-2">Driver</Dropdown.Item> : null}
                        {this.state.isAdmin? <Dropdown.Item href="#/action-3">Admin</Dropdown.Item> : null } 
                    </DropdownButton>
                </div>
            );
        }
    }
}

