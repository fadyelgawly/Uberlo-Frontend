import React, { Component } from 'react';

export class DriveItem extends Component {
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
					<td>{this.state.ride.ridername}</td>
					<td>{this.state.ride.riderRate}</td>
				</tr>
			</React.Fragment>
		)
	}
}

export default DriveItem
