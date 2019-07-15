import React , { Component } from 'react';
import { Redirect } from 'react-router';
import ForgotForm from '../../components/ForgotForm';
import MessageForm from '../../components/MessageForm';
import axios from "axios";

import '../../global';

export class forgotPassword extends Component{

    state = { 
        
        username: null,
        submitted:false,
        code:9999,
        password:null,
        changesuccess:false,
       
        
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
        console.log(this.state.username)
        console.log('Submitting Changes');
        const token = JSON.parse(localStorage.getItem("jwt"));
        axios.post(global.baseURL + '/user/forgot/code', {
            username:this.state.username
            
        })
        .then(function (response) {
            console.log(response.data.token);
            
            localStorage.clear();
            localStorage.setItem('jwt', JSON.stringify(response.data.token));
            

            self.setState({ 
                submitted : true ,
                token1:JSON.stringify(response.data.token)
           });
            
        })
        .catch(function (error) {
            console.log(error);
            
        })



    };
    onSubmit2 = () => {
        localStorage.clear();
        let self = this
        console.log(this.state.username)
        console.log('Submitting Changes');
        const token = JSON.parse(localStorage.getItem("jwt"));
        axios.post(global.baseURL + '/user/forgot/reset', {
            username:this.state.username,
            code: Number(this.state.code),
            password:this.state.password
            
        })
        .then(function (response) {
            console.log(response);
            
           

            self.setState({ 
                changesuccess : true ,
                token:response.data.token
           });
            
        })
        .catch(function (error) {
            console.log(error);
        })



 };



      render(){
        if (this.state.changesuccess){


            return(

                <h2>Password reset successful!</h2>

           )
        }
       if (this.state.submitted){
            return(
                <div>
                <MessageForm 
                handleInputChange={this.handleInputChange}
                onSubmit= { this.onSubmit2}
                 />
                <p>
                {JSON.stringify(this.state.fields, null, 2)}
                </p>
                
            </div>
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
