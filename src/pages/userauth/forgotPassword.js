import React , { Component } from 'react';
import { Redirect } from 'react-router';
import ForgotForm from '../../components/ForgotForm';
import axios from "axios";

import '../../global';

export class forgotPassword extends Component{

    state = { 
        
        username: null,
        submitted:false
        
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

        let self = this;
        axios.post(global.baseURL + '/user/forgot/code', {
            username:this.state.username
            
        })
        .then(function (response) {
            
            self.setState({ 
                loggedin : true 
           });
            
        })
        .catch(function (error) {
            console.log(error);
        })



    };


      render(){
    
        if (this.state.submitted){
            return(
                <Redirect to = "/forgot/code"/>
            );
        }
        return(
            <div>
                <ForgotForm 
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
