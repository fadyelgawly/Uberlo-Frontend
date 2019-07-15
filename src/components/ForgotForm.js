import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export default function ForgotForm(props) {

  

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
              onChange={props.handleInputChange}
              
              
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
              props.onSubmit(); 

              
          }
      }>
          Submit Changes
      </Button>
</Container>
    );
}