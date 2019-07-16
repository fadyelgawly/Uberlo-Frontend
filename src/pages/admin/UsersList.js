import React from 'react';
import axios from 'axios';
import '../../global';
import { Table } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";
import UserItem from './UserItem';


export class UsersList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { 
      users: [],
      editSubmited: false
    };
  }


  componentDidMount() {

    const token = JSON.parse(localStorage.getItem("jwt"));

    axios.get(global.baseURL + '/admin/users', {
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

  // componentDidUpdate() {
  //   if(this.state.editSubmited === true){
  //     const token = JSON.parse(localStorage.getItem("jwt"));

  //     axios.get(global.baseURL + '/admin/users', {
  //       headers: {
  //         Authorization: 'JWT ' + token
  //       }
  //     })
  //       .then((response) => {
  //         console.log(response.data.users);
  //         let users = response.data.users;
  //         this.setState({
  //           users
  //         });
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
      
  //     this.setState({
  //       editSubmited: false
  //     });
  //   }
  // }

  submitUpdate = () => {
    // this.forceUpdate();
    // this.setState({
    //   editSubmited: true
    // });
    // console.log(this.state.editSubmited);
  }

  render() {
    return(
      <React.Fragment>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Driver</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{
            this.state.users.map((user) => (
              <UserItem 
                key = {user.id}
                user = {user}
                submitUpdate = {this.submitUpdate}
              />
            ))
          }</tbody>
        </Table>
      </React.Fragment>
    );
  }

}
