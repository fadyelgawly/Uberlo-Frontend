import React from 'react';
import ReactTable from "react-table";
import Container from '@material-ui/core/Container';
import "react-table/react-table.css"
import axios from 'axios';
import '../../global'




export class RidesList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }


  componentDidMount() {

    const token = JSON.parse(localStorage.getItem("jwt"));

    axios.get(global.baseURL + '/admin/rides', {
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
      })
      .catch(function (error) {
        console.log(error);
      });
  }

 
  render() {
    const test = [{
        Header: "Rider",
        accessor: "rider",
        sortable: true
    },
    {
        Header: "Driver",
        accessor: "driver",
        sortable: true
    },
    {
        Header: "Pickup location",
        accessor: "fromArea"
    },
    {
        Header: "Dropoff location",
        accessor: "toArea"
    },
    {
        Header: "Actions",
        filterable: false,
        sortable: false,
        Cell: props => {
            return (<button style={{ backgroundColor: "black", color: "#fefefe" }}
                onClick={() => console.log("test", props)}>Edit </button>)
        }
    },
    {
        Header: "Can drive",
        filterable: false,
        sortable: false,
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
        filterable: false,
        sortable: false,
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



    return (
        <Container component="main" maxWidth="xl">
            <ReactTable
                minRow={1}
                filterable
                sortable
                columns={test}
                data={this.state.users}>
            </ReactTable>
        </Container>);
}
}

