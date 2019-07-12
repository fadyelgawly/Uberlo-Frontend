import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const classes = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
var i = 0;
export class test2 extends Component {


    state = {
        request: {
            currentArea: null,
            isAvailable: null,
            rideNo: null,
            requests: 0,
            toArea: null,
            test: null


        },
        statusSet: false





    };

    onSelectAvailable = (e) => {


        const token = JSON.parse(localStorage.getItem("jwt"));




        axios.patch('http://uberlo.herokuapp.com/driver/changestatus', {
                isAvailable: e
            }, {

                headers: {
                    Authorization: 'JWT ' + token
                }
            })
            .then((response) => {
                console.log(response.data);
                let users = response.data.users;
                this.setState({
                    users: users
                });
                console.log(this.state.users);


            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onSelectArea = (e) => {


        const token = JSON.parse(localStorage.getItem("jwt"));

        console.log(this.state.request.currentArea)

        axios.patch('http://uberlo.herokuapp.com/driver/changelocation',

                {
                    currentArea: e
                }, {

                    headers: {
                        Authorization: 'JWT ' + token
                    }
                }
            )
            .then((response) => {
                console.log(response.data);
                let rides = response.data.rides;
                this.setState({
                    rides: response.data.rides
                });
                console.log(this.state);


            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onSubmit = () => {
        const token = JSON.parse(localStorage.getItem("jwt"));

        axios.get(global.baseURL + '/getavailablerides', {
                headers: {
                    Authorization: 'JWT ' + token
                }
            })
            .then((response) => {
                console.log(response);
                console.log(response.data.rides.length);
                let toArea = response.data.rides[i].toArea;
                let rideNo = response.data.rides[i].rideNo;
                if (toArea == "0") {
                    this.setState({

                        request: {
                            toArea: "Masr El Gedida",
                            rideNo:rideNo
                        }
                    });
                } else if (toArea == "1") {
                    this.setState({

                        request: {
                            toArea: "Tagamoa",
                            rideNo:rideNo
                        }
                    });
                } else if (toArea == "2") {
                    this.setState({

                        request: {
                            toArea: "Zamalek",
                            rideNo:rideNo
                        }
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(this.state.request.toArea);


    }


    onSubmitAccept= (e) => {


        const token = JSON.parse(localStorage.getItem("jwt"));

        console.log(this.state.request.rideNo)

        axios.patch('http://uberlo.herokuapp.com/driver/acceptRide',

                {
                    rideNo: this.state.request.rideNo
                }, {

                    headers: {
                        Authorization: 'JWT ' + token
                    }
                }
            )
            .then((response) => {
                console.log(response.data);
               let rideNo = response.data.rides[i].rideNo;
              
               // console.log(this.state.request.rideNo);


            })
            .catch(function (error) {
                console.log(error);
            })

    }

render() {
        return (

                < Container >
                <h2> Hello ya Swa2 {this.state.request.isAvailable} </h2> &nbsp;
         
               
                 
               < Dropdown onSelect = {
                    (e) => {
                        this.onSelectAvailable(e);
                        
                             
                         }}>


                         <Dropdown.Toggle variant="success" id="dropdown-basic" >
                             Status:
                         </Dropdown.Toggle>
                         <Dropdown.Menu>
                             <Dropdown.Item eventKey = '0'>Not Available</Dropdown.Item>
                             <Dropdown.Item eventKey = '1'>Available</Dropdown.Item>
                         </Dropdown.Menu>
                     </Dropdown>&nbsp;

<Dropdown onSelect = {
    (e) => {
       
        this.onSelectArea(e);
            
             
         }}>
         <Dropdown.Toggle variant="success" id="dropdown-basic" >
             Current Area:
         </Dropdown.Toggle>
         <Dropdown.Menu>
             <Dropdown.Item eventKey = '0'>Masr El Gedida</Dropdown.Item>
             <Dropdown.Item eventKey = '1'>Tagamoa</Dropdown.Item>
             <Dropdown.Item eventKey = '2'>Zamalek</Dropdown.Item>
         </Dropdown.Menu>
     </Dropdown>&nbsp;
     <Button 
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    this.onSubmit();
                                    
                                    
                                 
                                   //for (; i < len; i++) {
                                    // print(this.response.data.rides[i].toArea)}
                                    
                                    

                                }}>
                                Submit
                                
                </Button> &nbsp;
                <Grid container spacing={3}>
  <Grid item xs={1}>
          <Paper className={classes.paper}>To</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>{this.state.request.toArea}</Paper>
        </Grid>
        <Button 
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                   this.onSubmitAccept();
                                }}>
                                Accept
                                
                </Button> &nbsp;
                <Button 
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    i++
                                    

                                }}>
                                Reject
                                
                </Button>
             </Grid>
   
        </Container>   );
    
}
}