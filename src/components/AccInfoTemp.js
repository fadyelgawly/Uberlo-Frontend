import React, { Component } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";

export class AccInfoTemp extends Component {
	state = {
		user:	{
			username: "amakhlouf",
			first: "Ahmed",
			last: "Makhlouf"
		}
	}

	render() {
		return (
			<div>
				<h2>Account Info</h2>
				<ListGroup>
					<ListGroup.Item>username   : {this.state.user.username}</ListGroup.Item>
					<ListGroup.Item>First Name : {this.state.user.first}</ListGroup.Item>
					<ListGroup.Item>Last Name  : {this.state.user.last}</ListGroup.Item>
				</ListGroup>
			</div>
		)
	}
}

export default RiderInfo
