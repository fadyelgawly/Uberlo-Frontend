import React /*, {Component } */from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { acceptRides } from './acceptRides';
import { endRide } from './endRide';
import { Admin } from './admin';
import { inRide } from './inRide';
import { RequestRide } from './RequestRide';
import { forgotPassword } from './forgotPassword';
import { Drive } from './Drive';
import { inDrive} from './inDrive';
import { ridesHistoryDriver } from './ridesHistoryDriver';
import { acceptWait } from './acceptWait';
import { driverWait } from './driverWait';
import { ridesHistory } from './ridesHistory';
import { accountInfo } from './accountInfo';
import { Login } from './Login';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import { Ride } from './Ride';
import { adminDashboard } from './pages/admin/adminDashboard';


function App() {


  return (
    <React.Fragment>
      <NavigationBar/>
      <Jumbotron/>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/admin" component={ Admin } />
            <Route exact path="/inDrive" component={ inDrive } />
            <Route exact path="/acceptRides" component={ acceptRides } />
            <Route exact path="/rider/history" component={ ridesHistory } />
            <Route exact path="/inRide" component={ inRide } />
            <Route exact path="/wait" component={ acceptWait } />
            <Route exact path="/request" component={ RequestRide} />
            <Route exact path="/driver/history" component={ ridesHistoryDriver } />
            <Route exact path="/forgot" component={ forgotPassword } />
            <Route exact path="/info" component={ accountInfo } />
            <Route exact path="/end" component={ endRide } />
            <Route exact path="/driverWait" component={ driverWait } />
            <Route exact path="/drive" component={ Drive } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/signup" component={ Ride } />
            <Route exact path="/admin/dashboard" component={ adminDashboard } />
            <Route exact  component = { NoMatch } />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
