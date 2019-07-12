import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

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

export class test2 extends Component {
  state = {
    request: {
      currentArea: null,
      isAvailable: null,
      rideNo: null,
      requests: 0,
      toArea: null,
      test: null
    },
    statusSet: false,
    Accepted: false,
    tripStarted: false
  };
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
        let users = response.data.users;
        let isAvailable = response.data.users;
        this.setState({
          users: users,
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
        let rides = response.data.rides;

        this.setState({
          rides: response.data.rides,

          request: {
            isAvailable: isAvailable1,
            currentArea: b
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
        "http://uberlo.herokuapp.com/driver/acceptRide",

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

  onEndRide = b => {
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
  };

  render() {
    if (!this.state.Accepted) {
      return (
        <Container>
          <h2> Hello ya Swa2 {this.state.request.isAvailable} </h2> &nbsp;
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
          </Dropdown>{" "}
          &nbsp;
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
          </Dropdown>{" "}
          &nbsp;
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
              Accept &nbsp;
            </Button>{" "}
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
    } else if (!this.state.tripStarted) {
      return (
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
        </Button>
      );
    } else if (this.state.tripStarted) {
      return (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => {
            this.setState({
              Accepted: true,
              tripStarted: true
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
