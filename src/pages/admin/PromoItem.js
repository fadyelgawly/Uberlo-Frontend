import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormCheck, ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
//import "react-bootstrap/dist/react-boot";

export class PromoItem extends Component {

	state = {
		edit: false,
		code: null,
		value: null,
        createdBy: null,
		username: null,
	}

	componentWillMount() {
		this.setState({ promo: this.props.promo });
		console.log(this.props.promo);
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	
	handleCheck = (e) => {
		this.setState({
			[e.target.name]: e.target.isChecked == true
		});
	}

	resetEdit() {
		this.setState({
			edit: false,
            code: null,
            value: null,
            createdBy: null,
            username: null
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
		var m_promo = this.state.promo;
		if(this.state.code) m_promo.code = this.state.code;
        if(this.state.value) m_promo.value = this.state.value;
		if(this.state.createdBy) m_promo.createdBy = this.state.createdBy;
		if(this.state.username) m_promo.username = this.state.username;
		console.log(m_promo);
		const token = JSON.parse(localStorage.getItem("jwt"));
		console.log(token);
        axios.patch(global.baseURL + '/admin/promo', m_promo,{
            headers: {
                Authorization: `JWT ${token}`
            }
		});
		
		//TODO
		this.resetEdit();
		this.props.submitUpdate.bind(this);
    }



    /* 
    	code: null,
		value: null,
		createdBy: null
    
    */
	render() {
		if (!this.state.edit) {
			return (
				<React.Fragment>
					<tr>
						<td><FormControl plaintext readOnly defaultValue={this.state.promo.code} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.promo.value} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.promo.createdBy} /></td>
                        <td><FormControl plaintext readOnly defaultValue={this.state.promo.username} /></td>
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
						<td><FormControl plaintext readOnly defaultValue={this.state.promo.code} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.promo.value} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.promo.createdBy} /></td>
						<td><FormControl plaintext readOnly defaultValue={this.state.promo.username} /></td>
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
						<td><FormControl name="code" onChange={(e) => this.handleChange(e)} /></td>
						<td><FormControl name="value" onChange={(e) => this.handleChange(e)} /></td>
						<td><FormControl name="createdBy" onChange={(e) => this.handleChange(e)} /></td>
						<td><FormControl name="username" onChange={(e) => this.handleChange(e)} /></td>
						<td>
							<Button>Change</Button>
						</td>
					</tr>
				</React.Fragment>
			);
		}

	}
}

export default PromoItem

//PropTypes
PromoItem.propTypes = {
	promo: PropTypes.object.isRequired,
	updateSubmit: PropTypes.func.isRequired
}