import React, { Component } from 'react';
import axios from 'axios';
import '../../global';
import { Table } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";
import RideItem from './RideItem';

export class RidesHist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rides: []
		};
	}

	componentDidMount() {

		const token = JSON.parse(localStorage.getItem("jwt"));
		axios.get(global.baseURL + '/rider/rides', {
			headers: {
				Authorization: 'JWT ' + token
			}
			})
			.then((response) => {
				console.log(response.data.rides);
				let rides = response.data.rides;
				this.setState({
					rides
				});
			})
			.catch(function (error) {
				console.log(error);
			});
    }

	render() {
		return (
			<React.Fragment>
				<h3>Rides History</h3>
				<Table>
                    <thead>
                        <tr>
                            <th>Ride No</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                            <th>Fare</th>
                            <th>Promo</th>
                            <th>Driver Name</th>
                            <th>Driver Rating</th>
                        </tr>
                    </thead>
					<tbody>{
                        this.state.rides.map((ride) => (
                            <RideItem 
                                key = {ride.rideNo}
                                ride = {ride}
                            />
                        ))
                    }</tbody>
				</Table>
			</React.Fragment>
		)
	}
}

export default RidesHist
