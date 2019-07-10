import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export class RequestRide extends Component {


    state = {
        request: {}

    };

    onSubmit = () => {

        const token = JSON.parse(localStorage.getItem("jwt"));
        console.log(token);
        console.log(this.state);
        axios.post('http://uberlo.herokuapp.com/requestride', {
            headers: {
                Authorization: 'JWT ' + token
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    user: response.data.user
                });
            })
            .catch(function (error) {
                console.log(error);
            });


    };

    handleSelect = (e) => {
        console.log("Event: " + e);
    };

    render() {
        return (
            <div>
                <Container>

                    <h2>
                        Hello Ismail Sharkawy
            </h2>
                    <Grid>
                        <Dropdown onSelect={(e) => {
                                this.handleSelect(e);
                            }}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                From
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey = 'from 0'>Masr El Gedida</Dropdown.Item>
                                <Dropdown.Item eventKey = 'from 1'>Tagamoa</Dropdown.Item>
                                <Dropdown.Item eventKey = 'from 2'>Zamalek</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>&nbsp;
                        <Dropdown onSelect={(e) => {
                                this.handleSelect(e);
                            }}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                To
                    </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey = 'to 0'>Masr El Gedida</Dropdown.Item>
                                <Dropdown.Item eventKey = 'to 1'>Tagamoa</Dropdown.Item>
                                <Dropdown.Item eventKey = 'to 2'>Zamalek</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> &nbsp;
                <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="code"
                            label="Use Promo"



                        />&nbsp;
                <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            View Fare
                </Button> &nbsp;
                <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                this.onSubmit();
                            }}>
                            Request Ride
                </Button>
                    </Grid>
                </Container>
            </div>
        )
    }
}
