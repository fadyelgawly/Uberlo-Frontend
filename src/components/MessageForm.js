import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

export default function MessageForm(props1) {

  

    return(
      <Container component="main" maxWidth="xs">
         
      <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
              variant="outlined"
              required
              fullWidth
              id="code"
              label="Code"
              name="code"
              onChange={props1.handleInputChange}
              
              
          />
          </Grid>
          <Grid item xs={12}>
          <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="New Password"
              name="password"
              onChange={props1.handleInputChange}
              
              
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
              props1.onSubmit(); 

              
          }
      }>
          Submit Changes
      </Button>
</Container>
    );
}