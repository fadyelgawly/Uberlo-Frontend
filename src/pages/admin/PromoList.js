import React from 'react';
import axios from 'axios';
import '../../global';
import { Table } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";
import PromoItem from './PromoItem';


export class PromoList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { 
      promos: [],
      editSubmited: false
    };
  }


  componentDidMount() {

    const token = JSON.parse(localStorage.getItem("jwt"));

    axios.get(global.baseURL + '/admin/promo', {
      headers: {
        Authorization: 'JWT ' + token
      }
    })
      .then((response) => {
          
        let promos = response.data.promos;
        console.log(promos);
        this.setState({
          promos
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

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
              <th>Promo code</th>
              <th>Discount vaule</th>
              <th>Creator ID</th>
              <th>Creator username</th>
          
            </tr>
          </thead>
          <tbody>{
            this.state.promos.map((promos) => (
              <PromoItem 
                key = {promos.code}
                promo = {promos}
                submitUpdate = {this.submitUpdate}
              />
            ))
          }</tbody>
        </Table>
      </React.Fragment>
    );
  }

}
