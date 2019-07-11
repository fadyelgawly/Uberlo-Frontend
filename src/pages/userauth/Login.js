import React , { Component } from 'react';
import { Redirect } from 'react-router';
import LoginForm from '../../components/LoginForm';
import axios from 'axios';
import '../../global';



export class Login extends Component{

    state = { 
        loggedin: null
    };

    componentWillMount = () => {
        const token = JSON.parse(localStorage.getItem("jwt"));

        if(token) {
            this.setState({
                loggedin: true
            });
        } else {
            this.setState({
                loggedin: false
            });
        }
    }

    
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

        console.log('Submitting');

        axios.post(global.baseURL + '/login', {
            ...this.state
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


    render(){
        if (this.state.loggedin){
            return(
                <Redirect to = "/rider/dashboard"/>
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
