import React , { Component } from 'react';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import "react-table/react-table.css"
import { makeStyles } from '@material-ui/core/styles';



export  class acceptRides extends Component {
     
  
 
    constructor(props)
    {
super(props);
this.state={

    posts:[]
}

}
componentDidMount(){


    const url ="https://5f4159ce-95df-4aeb-af90-6039ef45d46a.mock.pstmn.io/demo";
    fetch(url,{
        method: "GET"
    }).then(response=>response.json()).then(posts=>{
        this.setState({posts:posts})
    })
 
}


    

    render() {
const columns= [
    {
        Header:"Ride No",
        accessor:"rideNo",
        
    },
    {
        Header:"Rider",
        accessor:"rider"
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
    },
    {
        Header:"Actions",
        Cell: props=> {
            return (    <button style={{backgroundColor:"black",color:"#fefefe"}}
            onClick={()=>console.log("test",props)}>Accept </button>)
        }
    }


]
       return(<Container component="main" maxWidth="xl">
           <ReactTable
            columns={columns}
        data={this.state.posts}
        
           ></ReactTable>
<Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                
                onClick={(e) => { 
                    e.preventDefault();
                    
                }
            }>
                Accept
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
               
                onClick={(e) => { 
                    e.preventDefault();
                    
                }
            }>
                Cancel
            </Button>
</Container>
       );
}

}
