import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormCheck, ButtonGroup, Button } from 'react-bootstrap';
//import "react-bootstrap/dist/react-boot";

export class UserItem extends Component {

	state = {
		edit: false,
		passwordChange: false,
		username: null,
		firstname: null,
		lastname: null,
		phone: null,
		isDriver: null,
		isAdmin: null,
		password: null
	}

	componentWillMount() {
		this.setState({ user: this.props.user });
		console.log(this.props.user);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	handleCheck = (e) => {
		this.setState({
			[e.target.name]: e.target.checked
		});
	}

	resetEdit() {
		this.setState({
			edit: false,
			passwordChange: false,
			username: null,
			firstname: null,
			lastname: null,
			phone: null,
			isDriver: null,
			isAdmin: null,
			password: null
		});
	}

	editClick() {
		this.setState({
			edit: true
		})
	}

	cancelClick() {
		this.resetEdit();
	}

	// updateSubmit = () => {
	// 	this.props.editSubmitted();
	// }

	submitClick () {
		var m_user = this.state.user;
		if(this.state.username) m_user.username = this.state.username;
        if(this.state.firstname) m_user.firstname = this.state.firstname;
        if(this.state.lastname) m_user.lastname = this.state.lastname;
		if(this.state.phone) m_user.phone = this.state.phone;
		if(this.state.isDriver) m_user.isDriver = this.state.isDriver;
		if(this.state.isAdmin) m_user.isAdmin = this.state.isAdmin;

		const token = JSON.parse(localStorage.getItem("jwt"));
		console.log(token);
        axios.patch(global.baseURL + '/admin/user', m_user,{
            headers: {
                Authorization: `JWT ${token}`
            }
		});
		
		//TODO
		//this.resetEdit();
		//updateSubmit;
    }

	render() {
		if (!this.state.edit) {
			return (
				<React.Fragment>
					<tr>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.id} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.username} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.firstname} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.lastname} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.phone} /></td>
						<td><FormCheck disabled defaultChecked={this.state.user.isDriver == true} /></td>
						<td><FormCheck disabled defaultChecked={this.state.user.isAdmin == true} /></td>
						<td>
							<ButtonGroup>
								<Button disabled >Cancel</Button>
								<Button onClick={() => { this.editClick() }}>Edit</Button>
								<Button disabled >Submit</Button>
							</ButtonGroup>
						</td>
					</tr>
				</React.Fragment>
			);
		}
		else {
			return (
				<React.Fragment>
					<tr>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.id} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.username} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.firstname} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.lastname} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.user.phone} /></td>
						<td><FormCheck disabled defaultChecked={this.state.user.isDriver == true} /></td>
						<td><FormCheck disabled defaultChecked={this.state.user.isAdmin == true} /></td>
						<td>
							<ButtonGroup>
								<Button onClick={() => { this.cancelClick() }} >Cancel</Button>
								<Button disabled>Edit</Button>
								<Button onClick={() => { this.submitClick() }} >Submit</Button>
							</ButtonGroup>
						</td>
					</tr>
					<tr>
						<td>Edit to</td>
						<td><FormControl name="username" onChange={(e) => this.handleChange(e)} /></td>
						<td><FormControl name="firstname" onChange={(e) => this.handleChange(e)} /></td>
						<td><FormControl name="lastname" onChange={(e) => this.handleChange(e)} /></td>
						<td><FormControl name="phone" onChange={(e) => this.handleChange(e)} /></td>
						<td><FormCheck name="isDriver" defaultChecked={this.state.user.isDriver == true} onChange={(e) => this.handleCheck(e)} /></td>
						<td><FormCheck name="isAdmin" defaultChecked={this.state.user.isAdmin == true} onChange={(e) => this.handleCheck(e)} /></td>
						<td>
							<Button>Change Password</Button>
						</td>
					</tr>
				</React.Fragment>
			);
		}

	}
}

export default UserItem
