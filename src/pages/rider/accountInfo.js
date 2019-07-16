import React, { Component } from 'react';
import { Redirect } from 'react-router';
import '../../global';
import { Button, ListGroup, Form, Row, Col } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";
import axios from 'axios';


export class accountInfo extends Component {

    state = {
        user: null,
        token: null,
        edit: false,
        firstname: null,
        lastname: null,
        phone:null
    };
    componentWillMount() {

        const token = JSON.parse(localStorage.getItem("jwt"));
        const user = JSON.parse(localStorage.getItem("user"));
        

        this.setState({
            token: token,
            user: user
        });

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    editClick () {
        this.setState(state => ({
            edit: true
        }));
    }

    changePassClick () {
      return( <Redirect to="/changePassword"/>);
  }

      

    submitClick () {
        var m_user = this.state.user;
        if(this.state.firstname) m_user.firstname = this.state.firstname;
        if(this.state.lastname) m_user.lastname = this.state.lastname;
        if(this.state.phone) m_user.phone = this.state.phone;
        axios.patch(global.baseURL + '/user', m_user,{
            headers: {
                Authorization: `JWT ${this.state.token}`
            }
        }).then((res) => {
            //localStorage.setItem('user', JSON.stringify(res.data.user));
        });
        return (<Redirect to="/rider/dashboard" />);
    }

    render() {
        if (!(this.state.token))
            return (
                <Redirect to="/login" />
            );

        else if (this.state.user.id){
            if (!this.state.edit){
                return (
                    <React.Fragment>
                        <Button href="/rider/request">Request a Ride</Button>
                        <ListGroup>
                            <ListGroup.Item><Row>
                                <Form.Label column sm="4">First Name</Form.Label>
                                <Col><Form.Control plaintext readOnly defaultValue={this.state.user.firstname} /></Col>
                            </Row></ListGroup.Item>
                            <ListGroup.Item><Row>
                                <Form.Label column sm="4">Last Name</Form.Label>
                                <Col><Form.Control plaintext readOnly defaultValue={this.state.user.lastname} /></Col>
                            </Row></ListGroup.Item>
                            <ListGroup.Item><Row>
                                <Form.Label column sm="4">Phone</Form.Label>
                                <Col><Form.Control plaintext readOnly defaultValue={this.state.user.phone} /></Col>
                            </Row></ListGroup.Item>
                            <ListGroup.Item><Row>
                                <Col><Button onClick={()=>{this.editClick()}}>Edit</Button></Col>
                                <Col><Button href="/changePassword" >Change Password</Button></Col> 
                            </Row></ListGroup.Item>
                        </ListGroup>
                    </React.Fragment>
                );
            }
            else {
                return (
                    <React.Fragment>
                        <ListGroup>
                            <ListGroup.Item><Row>
                                <Form.Label column sm="4">First Name</Form.Label>
                                <Col><Form.Control name="firstname" defaultValue={this.state.user.firstname} onChange={e => {this.handleChange(e)}}/></Col>
                            </Row></ListGroup.Item>
                            <ListGroup.Item><Row>
                                <Form.Label column sm="4">Last Name</Form.Label>
                                <Col><Form.Control name="lastname" defaultValue={this.state.user.lastname} onChange={e => {this.handleChange(e)}}/></Col>
                            </Row></ListGroup.Item>
                            <ListGroup.Item><Row>
                                <Form.Label column sm="4">Phone</Form.Label>
                                <Col><Form.Control name="phone" defaultValue={this.state.user.phone} onChange={e => {this.handleChange(e)}}/></Col>
                            </Row></ListGroup.Item>
                            <ListGroup.Item><Row>
                                <Col><Button href="/rider/dashboard">Cancel</Button></Col>
                                <Col><Button onClick={()=>{this.submitClick()}}>Submit</Button></Col> 
                            </Row></ListGroup.Item>
                        </ListGroup>
                        
                    </React.Fragment>
                );
            }
        }
        else
            return (<div>Retrieving user details.. Please wait</div>);

            //localStorage.clear();
       // return(<div>If you see this, clear your cookies, go incognito or tell Fady he's in trouble.<br/> Actually logout and then login </div>);

    }
}