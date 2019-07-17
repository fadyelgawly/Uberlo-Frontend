import React, { Component } from 'react';

export class RideItem extends Component {
	state={}

	componentWillMount() {
		this.setState({
			ride: this.props.ride
		})
	}

	render() {
		return (
			<React.Fragment>
				<tr>
					<td>{this.state.ride.rideNo}</td>
					<td>{this.state.ride.fromArea}</td>
					<td>{this.state.ride.toArea}</td>
					<td>{this.state.ride.rideStatus}</td>
					<td>{this.state.ride.fare}</td>
					<td>{this.state.ride.promo}</td>
					<td>{this.state.ride.drivername}</td>
					<td>{this.state.ride.driverRate}</td>
				</tr>
			</React.Fragment>
		)
	}
}

export default RideItem
