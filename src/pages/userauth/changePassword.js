import React , { Component } from 'react';
import { Redirect } from 'react-router';
import PasswordForm from '../../components/PasswordForm';
import axios from "axios";

import '../../global';

export class changePassword extends Component{

    state = { 
        
        oldPassword: null,
        newPassword:null
    };

    handleInputChange = (event) => {
        console.log(event)
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    onSubmit = () => {

        let self = this
        console.log(this.state.oldPassword)
        console.log(this.state.newPassword)
        console.log('Submitting Changes');
        const token = JSON.parse(localStorage.getItem("jwt"));
        axios.post(global.baseURL + '/user/changepassword', {
            oldPassword:this.state.oldPassword,
            newPassword:this.state.newPassword
        },
        {
            headers: {
            Authorization: "JWT " + token
          }
        })
        .then(function (response) {
            console.log(response);
            
            localStorage.clear();
            localStorage.setItem('jwt', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify(response.data.user));

            self.setState({ 
                loggedin : true 
           });
            
        })
        .catch(function (error) {
            console.log(error);
        })



    };


    /*onSubmit = () => {
        console.log('Submitting');
        const self = this;
        fetch(global.baseURL + '/user/changepassword', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: `JWT ${this.state.token}`
            },
            body: JSON.stringify( this.state )
            }).then(function(data){ 
                if(data.status === 200){
                    self.setState({ 
                        passChanged : true 
                    });
                }
            });
    };*/
  
    render(){
    
        if (this.state.passChanged){
            return(
                <Redirect to = "/rider/dashboard"/>
            );
        }
        return(
            <div>
                <PasswordForm 
                handleInputChange={this.handleInputChange}
                onSubmit = { this.onSubmit}
                 />
                <p>
                {JSON.stringify(this.state.fields, null, 2)}
                </p>
                
            </div>
        )
    
}
}
