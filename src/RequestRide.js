import React , { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

export class RequestRide extends Component {


    render(){

      //  const userJSON =  localStorage.getItem('userdata');
        

      //  const user = JSON.parse(userJSON).userdata;
       
        

        //  console.log(user);

        return(
    <div>
        <Container>
            
            <h2>
                Hello Ismail Sharkawy
            </h2>
            <Grid>   
            <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        From
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Masr El Gedida</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Tagamoa</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Zamalek</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>&nbsp;
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        To
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Masr El Gedida</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Tagamoa</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Zamalek</Dropdown.Item>
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
                color="primary">
                Request Ride
                </Button>
            </Grid> 
        </Container>
    </div>
        )
    }
}
