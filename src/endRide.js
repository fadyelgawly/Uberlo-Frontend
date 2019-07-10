import React , { Component } from 'react';
import ReactTable from "react-table";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import "react-table/react-table.css"
import StarRatingComponent from 'react-star-rating-component';

export class endRide extends Component {

    constructor(props)
    {
super(props);
this.state={
rating:0,
    posts:[]
   

}}
onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
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
        const { rating } = this.state;
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
        Header:"Actual Fare",
        accessor:"Fare"
   

    }
    
]
       return(<Container component="main" maxWidth="xl">
           <ReactTable
          minRows={1}
            columns={columns}
            showPagination={false}
            
        data={this.state.posts}
        
           ></ReactTable>
         
      <div>
            <h2>Please rate your Driver: {rating}</h2>
            <StarRatingComponent 
              name="rate1" 
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick.bind(this)}
            />
          </div>
          <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                
                onClick={(e) => { 
                    e.preventDefault();
                    
                }
            }>
                Finish
            </Button>
            </Container>
       );
}
}

