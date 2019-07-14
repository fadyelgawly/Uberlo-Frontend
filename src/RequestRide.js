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
        ride: null,


        fromAreaString: null,
        toAreaString: null,

        requested: false,
        accepted: false,
        inride: false,
        ended: false

    };



    componentDidMount() {
        this.interval = setInterval(() => this.updateRideState(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    decodeLocation(id) {
        switch (parseInt(id)) {

            case 0:
                return ('Masr El Gedida');
            case 1:
                return ('Tagamoa');
            case 2:
                return ('Zamalek');
            default:
                return ('Unknown');
        }
    }

    updateRideState() {

        const token = JSON.parse(localStorage.getItem("jwt"));

        axios.get(global.baseURL + '/getrequestedride', {
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then((response) => {
                if (response.data.ride) {
                    this.setState({
                        ride: response.data.ride,
                        requested: true,
                        fromAreaString: this.decodeLocation(response.data.ride.fromArea),
                        toAreaString: this.decodeLocation(response.data.ride.toArea)

                    });
                } else {
                    //Inform request failure
                }

            })
            .catch(function (error) {
                console.log(error);
            });



    }


    componentWillMount() {

        this.updateRideState();
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


    cancelRequest = () => {
  
            console.log('will request');
            const token = JSON.parse(localStorage.getItem("jwt"));
            axios.patch(global.baseURL + '/rider/cancel', {
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
        } else if (this.state.ride) {
            if (this.state.ride.rideStatus === 'R')
            return (
                <div>
                    <h2>Waiting for a driver to accept your trip</h2>

                    You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString} 

                    <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.cancelRequest();
                                }}>
                                Cancel Request
                </Button>

                </div>
            );
            if (this.state.ride.rideStatus === 'A')
            return (
                <div>
                    <h2>A driver accepted the ride, wait for him to arrive</h2>

                    You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString} 

                    <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.cancelRequest();
                                }}>
                                Cancel Request
                </Button>
                You will charged 10LE if you cancel

                </div>
            );
            if (this.state.ride.rideStatus === 'V')
            return (
                <div>
                    <h2>Your driver is here</h2>

                    You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString} 

                    <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.cancelRequest();
                                }}>
                                Cancel Request
                </Button>
                You will charged 10LE if you cancel

                </div>
            );
            if (this.state.ride.rideStatus === 'S')
            return (
                <div>
                    <h2>In ride</h2>

                    You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString} 

                </div>
            );
            if (this.state.ride.rideStatus === 'D')
            return (
                <div>
                    <h2>Your driver cancelled</h2>

                    You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString} 

                </div>
            );
            if (this.state.ride.rideStatus === 'C')
            return (
                <div>
                    <h2>You cancelled your trip</h2>

                    You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString} 

                </div>
            );
            if (this.state.ride.rideStatus === 'E')
            return (
                <div>

                    <h2>Welcome to {this.state.toAreaString}</h2>
                    <h3> Your fare will be available shortly </h3>
                    You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString} 

                </div>
            );
            
        } else {
            return (<div>Please wait.. you should be served soon</div>);
        }
        return(<div>If you see this, tell Fady he's in trouble</div>);
    }
}
