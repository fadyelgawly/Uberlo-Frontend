import React, { Component } from 'react';
import "react-table/react-table.css"
import { Redirect } from 'react-router';
import '../../global';
import { Button } from 'react-bootstrap';

export class accountInfo extends Component {



    state = {
        user: null,
        token: null
    };
    componentWillMount() {

        const token = JSON.parse(localStorage.getItem("jwt"));
        const user = JSON.parse(localStorage.getItem("user"));
        

        this.setState({
            token: token,
            user: user
        });

    }

    render() {
        if (!(this.state.token))
            return (
                <Redirect to="/login" />
            );

        else if (this.state.user.id)
            return (
                <form>
                    <Button variant="primary" href="/rider/request">Primary</Button>
                    <div>
                        <label>
                            First Name:
                        </label>
                        {this.state.user.firstname}
                    </div>
                    <div>
                        <label>
                            Last Name:
                        </label>
                        {this.state.user.lastname}
                    </div>
                    <div>
                        <label>
                            Phone:
                        </label>
                        {this.state.user.phone}
                    </div>
                </form>
            );
        else
            return (<div>Retrieving user details.. Please wait</div>);

    }
}

