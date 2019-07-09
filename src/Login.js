import React , { Component } from 'react';
import { Redirect } from 'react-router'
import LoginForm from './components/LoginForm';
import axios from 'axios';



export class Login extends Component{

    state = { 
        loggedin: false
    };
    
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    onSubmit = () => {

        let self = this

        //axios.get('https://uberlo.herokuapp.com/', {
        axios.post('http://localhost:4000/login', {
            ...this.state
        })
        .then(function (response) {
            console.log(response);
            
            localStorage.clear();
            localStorage.setItem('jwt', JSON.stringify(response.data.token));

            self.setState({ 
                loggedin : true 
           });
            
        })
        .catch(function (error) {
            console.log(error);
        })



    };


    render(){
        if (this.state.loggedin){
            return(
                <Redirect to = "/info"/>
            );
        }
        return(
            <div>
                <LoginForm 
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
