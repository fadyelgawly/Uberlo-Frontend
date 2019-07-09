import React , { Component } from 'react';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import "react-table/react-table.css"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



export  class admin extends Component {
     
  
    state={
        user: {}
    };
    
    componentDidMount(){

        const url ="https://d6bbf1bc-5485-436d-a106-f4e56cdeeb61.mock.pstmn.io/test";
        fetch(url,{
            method: "GET"
        }).then(response=>response.json()).then(posts=>{
            this.setState({posts:posts})
        })
        const url2 ="https://d6bbf1bc-5485-436d-a106-f4e56cdeeb61.mock.pstmn.io/test2";
        fetch(url2,{
            method: "GET"
        }).then(response=>response.json()).then(tests=>{
            this.setState({tests:tests})
        })
}


    

    render() {
    const test= [{
    Header:"First Name",
        accessor:"Fname",
        sortable:true
    },
    {
        Header:"Last Name",
        accessor:"Lname",
        sortable:true
    },
    {
        Header:"Phone",
        accessor:"Phone"
    },
    {
        Header:"Actions",
        filterable:false,
        sortable:false,
        Cell: props=> {
            return (    <button style={{backgroundColor:"black",color:"#fefefe"}}
            onClick={()=>console.log("test",props)}>Edit </button>)
        }
    },
        {   Header: "Can drive",
            filterable:false,
            sortable:false,
            id: "checkbox",
            accessor: "",
            Cell: ({ original }) => {
                return (
                    <input
                        type="checkbox"
                        className="checkbox"
                        
                    />
                );
            }
            
        },
        {   Header: "Admin",
            filterable:false,
            sortable:false,
            id: "checkbox",
            accessor: "",
            Cell: ({ original }) => {
                return (
                    <input
                        type="checkbox"
                        className="checkbox"
                        
                    />
                );
            }
            
        }]
               
    const columns= [{
    Header:"Code",
        accessor:"code",
        sortable:true
    },
    {
        Header:"Value",
        accessor:"value",
        sortable:true
    },
    {
        Header:"Expiration Date",
        accessor:"expireDate"
    
        }
    

    ]

       return(<Container component="main" maxWidth="xl">
           <ReactTable
           minRow={1}
           filterable
           sortable
            columns={test}
        data={this.state.posts}
        
           ></ReactTable>
           <ReactTable
           minRow={1}
           filterable
            columns={columns}
        data={this.state.tests}
        
           ></ReactTable>

</Container>
       );
}

}
