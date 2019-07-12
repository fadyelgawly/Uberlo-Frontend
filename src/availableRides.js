import React , { Component } from 'react';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import "react-table/react-table.css"
import { Alert } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import StarRatingComponent from 'react-star-rating-component';
import ReactDOM from 'react-dom'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';

export class availableRides extends Component {

   state= 
   { request: {
    fromArea: null
   
}}



//componentDidMount(){
onSelect = () =>  {


    const token = JSON.parse(localStorage.getItem("jwt"));
    console.log(this.state.rides)
    console.log(this.state.request)
   console.log( this.state.request.fromArea)
    //onSelect () =>{
    axios.get('http://uberlo.herokuapp.com/getavailablerides', {
       

        headers: {
            Authorization: 'JWT ' + token
          }
    },  this.state.request.fromArea)
  //  console.log(this.state.request)
    .then((response) => {
        console.log(response.data);
        let rides = response.data.rides;
        this.setState({
            rides:response.data.rides
        });
        console.log(this.state);

        
    })
    .catch(function (error) {
        console.log(error);
    })
        
}


    render() {
const columns= [
    {
        Header:"Ride No",
        accessor:"rideNo"
    },
    {
        Header:"Ride Status",
        accessor:"rideStatus"
    },
    {
        Header:"Fare",
        accessor:"originalFare"
    },
    {
        Header:"From",
        accessor:"fromArea"
    },
    {
        Header:"To",
        accessor:"toArea"
    },
    {
        Header:"Driver",
        accessor:"driver"
    },
    {
        Header:"Request Time",
        accessor:"requestTime"
    },
    {
        Header:"Pick-up Time",
        accessor:"pickupTime"
    },
    {
        Header:"Dropoff Time",
        accessor:"dropiffTime"
    }
]
       return(
           <Container>
               <h2> hi {this.state.request.fromArea} </h2>
           <Dropdown onSelect ={(e) => {
                this.setState({
                    request: {
                        
                        fromArea:e                 
                    },
                    
                });
              
                this.onSelect();
                               
                                
                            }}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                From
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey = '0'>Masr El Gedida</Dropdown.Item>
                                <Dropdown.Item eventKey = '1'>Tagamoa</Dropdown.Item>
                                <Dropdown.Item eventKey = '2'>Zamalek</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>&nbsp;
                      
           <ReactTable
           
          minRows={1}
            columns={columns}
            
        data={this.state.rides}
        
           ></ReactTable>
           <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.onSubmit();
                            }}>
                            Search
                </Button> &nbsp;
           </Container>
       );
}
}