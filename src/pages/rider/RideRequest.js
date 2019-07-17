import React, { Component } from 'react';
import axios from 'axios';
import '../../global';
import { Dropdown, Button, Row, Col, FormControl, Alert, Spinner, Jumbotron } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";

export class RideRequest extends Component {

    state = {
        request: {
            fromArea: null,
            toArea: null,
            promo: null
        },

        promo: null,

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
        ended: false,

        fare: null,
        receipt: false
    };

    componentWillMount() {

        this.updateRideState();
        const user = JSON.parse(localStorage.getItem("user"));
        this.setState({
            user: user
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateRideState(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

                    if (response.data.ride.rideStatus === 'S') {
                        this.setState({
                            inride: true
                        });
                    }

                } else {
                    //Inform request failure
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        
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

    onSubmit = () => {

        if (this.state.request.fromArea && this.state.request.toArea) {

            const token = JSON.parse(localStorage.getItem("jwt"));

            var req = this.state.request;
            if (this.state.promo) req.promo = this.state.promo;

            axios.post(global.baseURL + '/requestride', req, {
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

    };


    cancelRequest = () => {
        const token = JSON.parse(localStorage.getItem("jwt"));

        var req = this.state.request;
        if (this.state.promo) req.promo = this.state.promo;

        axios.patch(global.baseURL + '/rider/cancel', req, {
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

    handlePromo = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleReceipt() {
        this.setState({
            receipt: !this.state.receipt
        });
    }

    render() {
        if (!this.state.requested) {
            return (
                <React.Fragment>
                    <h2>Enter request details</h2>
                    <div>
                        <Row>
                            <Col>
                                <Dropdown onSelect={(e) => {
                                    this.setState({
                                        request: {
                                            toArea: this.state.request.toArea,
                                            fromArea: e
                                        }
                                    });
                                }}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" >From</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey='0'>Masr El Gedida  </Dropdown.Item>
                                        <Dropdown.Item eventKey='1'>Tagamoa         </Dropdown.Item>
                                        <Dropdown.Item eventKey='2'>Zamalek         </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>{this.decodeLocation(this.state.request.fromArea)}</Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
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
                                </Dropdown>
                            </Col>
                            <Col>{this.decodeLocation(this.state.request.toArea)}</Col>
                        </Row>
                        <br />
                        <Row>
                            <FormControl name="promo" placeholder="Use Promo" onChange={(e) => this.handlePromo(e)} />
                        </Row>
                        <br />
                        <Row>
                            <Button type="submit"
                                block
                                variant="primary"
                                onClick={() => { this.onSubmit(); }}
                            >Request Ride</Button>
                        </Row>
                    </div>
                </React.Fragment>
            )
        }
        else if (this.state.ride) {
            switch (this.state.ride.rideStatus) {
                case 'R':
                    //Requested
                    return (
                        <div>
                            <Col sz="sm"></Col><Col>
                                <Spinner animation="grow" size="xl" />
                            </Col><Col sz="sm"></Col>




                            <h2>Waiting for a driver to accept your trip</h2>

                            You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString}

                            <Button
                                type="submit"
                                block
                                variant="primary"
                                onClick={() => { this.cancelRequest(); }}
                            >Cancel Request</Button>
                        </div>
                    );
                    break;
                case 'A':
                    //Accepted
                    return (
                        <div>
                            <h2>A driver accepted the ride, wait for him to arrive</h2>

                            You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString}

                            <Button
                                type="submit"
                                block
                                variant="primary"
                                onClick={() => { this.cancelRequest(); }}
                            >Cancel Request</Button>
                            You will charged 10LE if you cancel
                        </div>
                    );
                    break;
                case 'V':
                    //arriVed
                    return (
                        <div>
                            <h2>Your driver is here</h2>

                            You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString}

                            <Button
                                type="submit"
                                block
                                variant="primary"
                                onClick={() => { this.cancelRequest(); }}
                            >Cancel Request</Button>
                            You will charged 10LE if you cancel
                        </div>
                    );
                    break;
                case 'S':
                    //Started
                    return (
                        <div>
                            <h2>In ride</h2>
                            You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString}
                        </div>
                    );
                    break;
                case 'E':
                    //Ended
                    if (this.state.receipt) {
                        return (
                            <div>
                                <h2>You arrived to your destination{this.state.toAreaString}</h2>
                                <Alert variant="success">
                                    <Alert.Heading>Your Fare is:</Alert.Heading>
                                    <h1>50 LE</h1>
                                </Alert>
                                <Button block variant="secondary" onClick={() => this.handleReceipt()}>View Receipt</Button>
                            </div>
                        );
                    }
                    else {
                        var req = {};
                        if (this.state.promo) req.promo = this.state.promo;
                        else req.promo = 'None';
                        req.fare = '50 LE';
                        return (
                            <div>
                                <React.Component>
                                    <Alert variant="secondary">
                                        <Alert.Heading>Receipt</Alert.Heading>
                                        <p>From: 	{this.decodeLocation(this.state.request.fromArea)}</p>
                                        <p>To:  	{this.decodeLocation(this.state.request.toArea)}</p>
                                        <p>Promo: 	{req.promo}</p>
                                        <p>Fare:  	{req.fare}</p>
                                    </Alert>
                                </React.Component>
                                <Button block variant="secondary" onClick={() => this.handleReceipt()}>Close Receipt</Button>
                            </div>
                        );
                    }

                    break;
                case 'D':
                    //Driver cancelled
                    return (
                        <div>
                            <h2>Your driver cancelled</h2>

                            You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString}

                        </div>
                    );
                    break;
                case 'C':
                    //rider Cancelled
                    return (
                        <div>
                            <h2>You cancelled your trip</h2>

                            You requested a trip from {this.state.fromAreaString} to {this.state.toAreaString}
                        </div>
                    );
                    break;
                default:
            }

        }
        else {
            return (<div>Please wait.. you should be served soon</div>);
        }
        return (<div>If you see this, tell Fady he's in trouble</div>);
    }
}

export default RideRequest
