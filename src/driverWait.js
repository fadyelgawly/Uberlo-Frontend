import React , { Component } from 'react';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import "react-table/react-table.css"
import { Alert } from 'reactstrap';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { makeStyles } from '@material-ui/core/styles';

export class driverWait extends Component {

    constructor(props)
    {
super(props);
this.state={

    posts:[]
}

}
componentDidMount(){


    const url ="https://d6bbf1bc-5485-436d-a106-f4e56cdeeb61.mock.pstmn.io/requestWait";
    fetch(url,{
        method: "GET"
    }).then(response=>response.json()).then(posts=>{
        this.setState({posts:posts})
    })
 
}


    

    render() {
const columns= [
    {
        Header:"Current Longitude",
        accessor:"fromLongitude"
    },
    {
        Header:"Current Latitude",
        accessor:"fromLatitude"
    },
    {
        Header:"Destination Longitude",
        accessor:"toLongitude"
   

    },
    {
        Header:"Destination Latitude",
        accessor:"toLatitude"
   

    },
    {
        Header:"Estimated Fare",
        accessor:"Fare"
   

    }
    
]
       return(<Container component="main" maxWidth="xl">
           <ReactTable
          minRows={1}
            columns={columns}
            
        data={this.state.posts}
        showPagination={false}
        
           ></ReactTable> &nbsp;
           <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                
                onClick={(e) => { 
                    e.preventDefault();
                    
                }
            }>
                Contact Driver
            </Button>&nbsp;
           <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                
                onClick={(e) => { 
                    e.preventDefault();
                    
                }
            }>
                Cancel For Fee
            </Button> &nbsp;
            <Alert color="dark">
        Driver found and is on his way, view  <a href="/info" className="alert-link">Driver Info</a>. 
      </Alert>
      <Alert color="success">
        Driver has arrived! view  <a href="/info" className="alert-link">Driver Info</a>. 
      </Alert>
            </Container>
       );
}
}
