import React, { Component } from 'react'

export class TripItem extends Component {
	state = {};

	componentWillMount() {
		this.setState({
			trip: this.props.trip
		})
	}

	render() {
		return (
			<React.Fragment>
				<tr>
					<td>{this.state.trip.rideNo}</td>
					<td>{this.state.trip.fromArea}</td>
					<td>{this.state.trip.toArea}</td>
					<td>{this.state.trip.rideStatus}</td>
					<td>{this.state.trip.fare}</td>
					<td>{this.state.trip.promo}</td>
					<td>{this.state.trip.requestTime}</td>
					<td>{this.state.trip.pickupTime}</td>
					<td>{this.state.trip.dropoffTime}</td>
					<td>{this.state.trip.rider}</td>
					<td>{this.state.trip.ridername}</td>
					<td>{this.state.trip.riderRate}</td>
					<td>{this.state.trip.driver}</td>
					<td>{this.state.trip.drivername}</td>
					<td>{this.state.trip.driverRate}</td>
				</tr>
			</React.Fragment>
		)
	}
}

export default TripItem
