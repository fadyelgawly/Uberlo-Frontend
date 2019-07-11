import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import './global'

export class RequestRide extends Component {


    state = {
        request: {
            fromArea: null,
            toArea: null
        },
        user: {
            firstname: null,
            lastname: null
        },

        requested: false,
        accepted: false,
        inride: false,
        ended: false

    };

    componentWillMount() {

        const user = JSON.parse(localStorage.getItem("user"));
        this.setState({
            user: user
        });
    }

    onSubmit = () => {
        console.log('On Submit');

        console.log(this.state);


        if (this.state.request.fromArea && this.state.request.toArea) {
            console.log('will request');
            const token = JSON.parse(localStorage.getItem("jwt"));
            axios.post(global.baseURL + '/requestride', {
                ...this.state.request
            }, {
                    headers: {
                        Authorization: `JWT ${token}`
                    }
                })
                .then((response) => {
                    if (response.data.successful) {
                        this.setState({
                            requested: response.data.successful
                        });
                    } else {
                        //Inform request failure
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (this.state.request.fromArea) {
            console.log('Choose a pickup');
            //NotificationManager.error('Please choose a pickup location');
        } else if (this.state.request.toArea) {
            console.log('Choose a destination');
            //NotificationManager.error('Please choose a destination location');
        }
        console.log('leaving onsub');


    };





    render() {
        if (!this.state.requested) {
            return (
                <div>
                    <h2>Enter request details</h2>
                    <Container>
                        <Grid>
                            <Dropdown onSelect={(e) => {
                                this.setState({
                                    request: {
                                        toArea: this.state.request.toArea,
                                        fromArea: e
                                    }
                                });
                            }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    From
                            </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey='0'>Masr El Gedida  </Dropdown.Item>
                                    <Dropdown.Item eventKey='1'>Tagamoa         </Dropdown.Item>
                                    <Dropdown.Item eventKey='2'>Zamalek         </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> {this.state.request.fromArea} &nbsp;
                        <Dropdown onSelect={(e) => {
                                this.setState({
                                    request: {
                                        fromArea: this.state.request.fromArea,
                                        toArea: e
                                    }
                                });
                            }}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    To
                    </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey='0'>Masr El Gedida</Dropdown.Item>
                                    <Dropdown.Item eventKey='1'>Tagamoa</Dropdown.Item>
                                    <Dropdown.Item eventKey='2'>Zamalek</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> {this.state.request.toArea}  &nbsp;
                <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="code"
                                label="Use Promo"

                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.onSubmit();
                                }}>
                                Request Ride
                </Button>
                        </Grid>
                    </Container>
                </div>
            )
        } else if (!this.state.accepted) {
            return (
                <div>
                    <h2>Waiting for driver to accept your trip</h2>

                </div>
            );
        } else {
            return (<div>Will see what got you here later</div>);
        }
    }
}
