import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router';
import Paper from "@material-ui/core/Paper";
import ReactTable from "react-table";
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import {  ListGroup, Form, Row, Col } from 'react-bootstrap';
import "react-bootstrap/dist/react-bootstrap.min.js";

const classes = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
var isAvailable1;
var currentArea1;
var i = 0;
var noOfRides = 0;
var currentArea2;

export class requestDrive extends Component {
  state = {
    request: {
      currentArea: null,
      isAvailable: null,
      rideNo: null,
      requests: 0,
      toArea: null,
      test: null,
      rating: 1
    },
    statusSet: false,
    Accepted: false,
    tripStarted: false,
    isCanceled: false,
    rideEnded: false,
    Arrived: false,
    users: {}
  };
  componentDidMount() {
    this._isMounted = true;
  }

  toggle = () => {
    const { show } = this.state;
    this.setState({
      show: !show
    });
  };
  onSelectAvailable = e => {
    const token = JSON.parse(localStorage.getItem("jwt"));

    axios
      .patch(
        "http://uberlo.herokuapp.com/driver/changestatus",
        {
          isAvailable: e
        },
        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          request: {
            isAvailable: e,
            currentArea: currentArea1
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onSelectArea = b => {
    const token = JSON.parse(localStorage.getItem("jwt"));
    let currentArea1 = b;
    console.log(this.state.request.currentArea);

    axios
      .patch(
        "http://uberlo.herokuapp.com/driver/changelocation",

        {
          currentArea: b
        },
        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data);

        if (currentArea1 == "0") currentArea2 = "Masr El-Gedida";
        this.setState({
          rides: response.data.rides,
          request: {
            isAvailable: isAvailable1
          }
        });

        if (currentArea1 == "1") currentArea2 = "Tagamoa";
        this.setState({
          rides: response.data.rides,
          request: {
            isAvailable: isAvailable1
          }
        });
        if (currentArea1 == "2") currentArea2 = "Zamalek";
        this.setState({
          rides: response.data.rides,
          request: {
            isAvailable: isAvailable1,
            currentArea: "Zamalek"
          }
        });
        console.log(this.state);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onSubmit = () => {
    console.log(this.state.request.currentArea);
    console.log(this.state.request.isAvailable);

    if (
      this.state.request.currentArea != null &&
      this.state.request.isAvailable == "1"
    ) {
      const token = JSON.parse(localStorage.getItem("jwt"));

      axios
        .get(global.baseURL + "/getavailablerides", {
          headers: {
            Authorization: "JWT " + token
          }
        })
        .then(response => {
          console.log(response);
          console.log(response.data.rides.length);
          noOfRides = response.data.rides.length;
          let toArea = response.data.rides[i].toArea;
          let rideNo = response.data.rides[i].rideNo;
          if (toArea == "0") {
            this.setState({
              request: {
                toArea: "Masr El Gedida",
                rideNo: rideNo,
                isAvailable: isAvailable1,
                currentArea: currentArea1
              }
            });
          } else if (toArea == "1") {
            this.setState({
              request: {
                toArea: "Tagamoa",
                rideNo: rideNo,
                isAvailable: isAvailable1,
                currentArea: currentArea1
              }
            });
          } else if (toArea == "2") {
            this.setState({
              request: {
                toArea: "Zamalek",
                rideNo: rideNo,
                isAvailable: isAvailable1,
                currentArea: currentArea1
              }
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      console.log(this.state.request.toArea);
    } else {
    }
  };

  onSubmitAccept = e => {
    const token = JSON.parse(localStorage.getItem("jwt"));

    console.log(this.state.request.rideNo);
    console.log(this.state.Accepted);
    console.log(this.state.tripStarted);

    axios
      .patch(
        "https://uberlo.herokuapp.com/driver/acceptride",

        {
          rideNo: this.state.request.rideNo
        },
        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onStartRide = b => {
    console.log(this.state.tripStarted);
    const token = JSON.parse(localStorage.getItem("jwt"));

    console.log(this.state.request.rideNo);

    axios
      .patch(
        "http://uberlo.herokuapp.com/driver/startTrip",

        {
          rideNo: this.state.request.rideNo
        },
        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onEndRide = () => {
    const token = JSON.parse(localStorage.getItem("jwt"));

    console.log(this.state.request.rideNo);
    console.log(this.state.Accepted);
    axios
      .patch(
        "http://uberlo.herokuapp.com/driver/endTrip",

        {
          rideNo: this.state.request.rideNo
        },
        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .post(
        "http://uberlo.herokuapp.com/ridesummary",

        {
          rideNo: this.state.request.rideNo
        },
        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data);
        let test1 = response.data;
        console.log(test1);
        if (this._isMounted) {
          this.setState({
            users: response.data.ride
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onCancelRide = b => {
    console.log(this.state.tripStarted);
    const token = JSON.parse(localStorage.getItem("jwt"));

    console.log(this.state.request.rideNo);

    axios
      .patch(
        "http://uberlo.herokuapp.com/driver/cancel",

        {
          rideNo: this.state.request.rideNo
        },
        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onArrived = b => {
    console.log(this.state.tripStarted);
    const token = JSON.parse(localStorage.getItem("jwt"));

    console.log(this.state.request.rideNo);

    axios
      .patch(
        "http://uberlo.herokuapp.com/driver/arrive",

        {
          rideNo: this.state.request.rideNo
        },
        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data.users);
        let users = response.data.users;
        this.setState({});
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }
  onSubmitRating() {
    
    console.log(this.state.rating);
    console.log(this.state.tripStarted);
    const token = JSON.parse(localStorage.getItem("jwt"));

    console.log(this.state.request.rideNo);

    axios
      .patch(
        "http://uberlo.herokuapp.com/driver/rate",

        {
          rideNo: this.state.request.rideNo,
          rate: this.state.rating
        },

        {
          headers: {
            Authorization: "JWT " + token
          }
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

    ///driver/rate
  }

  render() {
    const test = [
      {
        Header: "Fare",
        accessor: "fare",
        sortable: true
      },
      {
        Header: "from Area",
        accessor: "fromArea",
        sortable: true
      },
      {
        Header: "To Area",
        accessor: "toArea"
      }
    ];

    const { rating } = this.state;
    if (this.state.isCanceled) {
      return <Redirect to="/" />;
    }

    if (this.state.rideEnded) {
      return (
        <React-Fragment>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Form.Label column sm="4">
                  Pick-up Location
                </Form.Label>
                <Col>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={currentArea2}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Form.Label column sm="4">
                  Drop-off Location
                </Form.Label>
                <Col>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.request.toArea}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Form.Label column sm="4">
                  Fare
                </Form.Label>
                <Col>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={this.state.users.Fare}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <h2>Please rate your Rider: {rating}</h2>
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
                />
                <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({
                  Accepted: true
                });
                this.onSubmitRating();
              }}
            >
             Submit Rating
            </Button>&nbsp;
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </React-Fragment>
      );
    }

    if (!this.state.Accepted || this.state.rideEnded) {
      return (
        <Container>
          <h2> Hello ya Swa2 </h2> &nbsp;
          <Dropdown
            onSelect={e => {
              isAvailable1 = e;
              this.onSelectAvailable(e);
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Status:
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="0">Not Available</Dropdown.Item>
              <Dropdown.Item eventKey="1">Available</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>&nbsp;
          <Dropdown
            onSelect={b => {
              currentArea1 = b;
              this.onSelectArea(b);
            }}
          >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Current Area:
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="0">Masr El Gedida</Dropdown.Item>
              <Dropdown.Item eventKey="1">Tagamoa</Dropdown.Item>
              <Dropdown.Item eventKey="2">Zamalek</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>&nbsp;
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            onClick={() => {
              this.onSubmit();
            }}
          >
            Submit
          </Button>{" "}
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <Paper className={classes.paper}>To</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                {this.state.request.toArea}
              </Paper>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                this.setState({
                  Accepted: true
                });
                this.onSubmitAccept();
              }}
            >
              Accept 
            </Button>&nbsp;
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => {
                this.onSubmit();
                if (i < noOfRides - 1) i++;
                else i = 0;
              }}
            >
              Reject
            </Button>
          </Grid>
        </Container>
      );
    } else if (!this.state.tripStarted && !this.state.Arrived) {
      return (
        <React-Fragment>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({
                Accepted: true,

                Arrived: true
              });
              this.onArrived();
            }}
          >
            Arrived
          </Button>{" "}&nbsp;
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({
                Accepted: true,

                isCanceled: true
              });
              this.onCancelRide();
            }}
          >
            Cancel
          </Button>
        </React-Fragment>
      );
    } else if (
      this.state.Accepted &&
      this.state.Arrived &&
      !this.state.tripStarted
    ) {
      return (
        <React-Fragment>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({
                Accepted: true,
                tripStarted: true
              });
              this.onStartRide();
            }}
          >
            Start Trip
          </Button>&nbsp;
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({
                Accepted: true,

                isCanceled: true
              });
              this.onCancelRide();
            }}
          >
            Cancel
          </Button>
        </React-Fragment>
      );
    } else if (this.state.tripStarted && !this.state.isCanceled) {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => {
            this.setState({
              Accepted: true,
              tripStarted: true,
              rideEnded: true
            });
            this.onEndRide();
          }}
        >
          End Trip
        </Button>
      );
    }
  }
}
