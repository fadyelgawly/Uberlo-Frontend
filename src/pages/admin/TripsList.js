import React, { Component } from 'react';
import axios from 'axios';
import '../../global';
import { Table } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";
import TripItem from './TripItem';


// Rider, Driver, pikcup location, dropoff loc, actions, can drive, admin

export class TripsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trips: []
        }
    }

    componentDidMount() {

        const token = JSON.parse(localStorage.getItem("jwt"));

        axios.get(global.baseURL + '/admin/rides', {
        headers: {
            Authorization: 'JWT ' + token
        }
        })
        .then((response) => {
            console.log(response.data.trips);
            let trips = response.data.trips;
            this.setState({
                trips
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <React.Fragment>
                <Table>
                    <thead>
                        <tr>
                            <th>Ride No</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                            <th>Fare</th>
                            <th>Promo</th>
                            <th>Request Time</th>
                            <th>Pickup Time</th>
                            <th>Dropoff Time</th>
                            <th>Rider</th>
                            <th>Rider Rating</th>
                            <th>Driver</th>
                            <th>Driver Rating</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.trips.map((trip) => (
                            <TripItem 
                                key = {trip.rideNo}
                                trip = {trip}
                            />
                        ))
                    }</tbody>
                </Table>
            </React.Fragment>
        )
    }
}

export default TripsList