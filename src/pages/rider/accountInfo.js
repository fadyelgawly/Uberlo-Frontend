import React, { Component } from 'react';
import "react-table/react-table.css"
import axios from 'axios';
import '../../global'

export class accountInfo extends Component {



    state = {
        user: {},
        token: null
    };
    componentWillMount() {
        const token = JSON.parse(localStorage.getItem("jwt"));
        console.log(token);
        this.setState({
            token: token
        });

        axios.get(global.baseURL + '/user', {
            headers: {
                Authorization: 'JWT ' + token
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    user: response.data.user
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        if (!(this.state.token))
            return (<div>Please login then come back</div>);

        else if (this.state.user.id)
            return (
                <form>
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

