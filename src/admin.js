import React , { Component } from 'react';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import "react-table/react-table.css"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



export  class admin extends Component {
     
  
    state={
    
    };


    componentDidMount(){

        //const url ="http://uberlo.herokuapp.com/user";
        const token = JSON.parse(localStorage.getItem("jwt"));

        axios.get('http://uberlo.herokuapp.com/admin/users', {
            headers: {
                Authorization: 'JWT ' + token
              }
        })
        .then((response) => {
            console.log(response.data.users);
            let users = response.data.users;
            this.setState({
                users
            });
            console.log(this.state);

           // console.log("users: "  + this.state.users[0]);
        })
        .catch(function (error) {
            console.log(error);
        });   
    }
    
//     componentDidMount(){

//         const url ="https://d6bbf1bc-5485-436d-a106-f4e56cdeeb61.mock.pstmn.io/test";
//         fetch(url,{
//             method: "GET"
//         }).then(response=>response.json()).then(posts=>{
//             this.setState({posts:posts})
//         })
//         const url2 ="https://d6bbf1bc-5485-436d-a106-f4e56cdeeb61.mock.pstmn.io/test2";
//         fetch(url2,{
//             method: "GET"
//         }).then(response=>response.json()).then(tests=>{
//             this.setState({tests:tests})
//         })
// }


    

    render() {
    const test= [{
    Header:"First Name",
        accessor:"firstname",
        sortable:true
    },
    {
        Header:"Last Name",
        accessor:"lastname",
        sortable:true
    },
    {
        Header:"Phone",
        accessor:"phone"
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
            accessor: "isDriver",
            Cell: ({ original }) => {
                return (
                    <input
                        type="checkbox"
                        className="checkbox"
                        
                    />
                );
            }
            
        },
        {   
            Header: "Admin",
            filterable:false,
            sortable:false,
            id: "checkbox",
            accessor: "isAdmin",
            Cell: ({ original }) => {
                return (
                    <input
                        type="checkbox"
                        className="checkbox"
                        
                    />
                );
            }
            
        }]
               
  

        return(
        <Container component="main" maxWidth="xl">
            <ReactTable
                minRow={1}
                filterable
                sortable
                columns={test}
                data={this.state.users}>
            </ReactTable>
        </Container> );
    }   

}
