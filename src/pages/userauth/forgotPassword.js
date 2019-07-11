import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import React , { Component } from 'react';

export class forgotPassword extends Component{

  
  
    render(){
    return(
        <Container component="main" maxWidth="xs">
         
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    
                    autoComplete="username"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="phone"
                    label="Phone Number"
                   
                   
                    autoComplete="current-phoneNo"
                />
                </Grid>
           
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                />
                </Grid> 
                </Grid>&nbsp;
           
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
               
                onClick={(e) => { 
                    e.preventDefault();
                    
                }
            }>
                Submit
            </Button>
            
            
            
        
    </Container>
    )
}
}
