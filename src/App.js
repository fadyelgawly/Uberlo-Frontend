import React /*, {Component } */from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from './Home';
import { acceptRides } from './pages/driver/acceptRides';
import { changePassword } from './pages/userauth/changePassword';
import { endRide } from './endRide';
import { inRide } from './inRide';
import { RequestRide } from './RequestRide';
import { forgotPassword } from './pages/userauth/forgotPassword';
import { inDrive} from './inDrive';
import { acceptWait } from './acceptWait';
import { driverWait } from './driverWait';
import { accountInfo } from './pages/rider/accountInfo';
import { Login } from './pages/userauth/Login';
import { NoMatch } from './NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import { Signup } from './pages/userauth/Signup';
import { adminDashboard } from './pages/admin/adminDashboard';
import { requestDrive } from './pages/driver/requestDrive';
import RidesHist from './pages/rider/RidesHist';
import DrivesHist from './pages/driver/DrivesHist';


function App() {


  return (
    <React.Fragment>
      <NavigationBar/>
      <Jumbotron/>
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/inDrive" component={ inDrive } />
            <Route exact path="/acceptRides" component={ acceptRides } />
            <Route exact path="/rider/history" component={ RidesHist } />
            <Route exact path="/inRide" component={ inRide } />
            <Route exact path="/wait" component={ acceptWait } />
            <Route exact path="/rider/request" component={ RequestRide} />
            <Route exact path="/driver/history" component={ DrivesHist } />
            <Route exact path="/forgot" component={ forgotPassword } />
            <Route exact path="/changePassword" component={ changePassword } />
            <Route exact path="/rider/dashboard" component={ accountInfo } />
            <Route exact path="/end" component={ endRide } />
            <Route exact path="/driverWait" component={ driverWait } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/signup" component={ Signup } />
            <Route exact path="/rider/dashboard" component={ accountInfo } />
            <Route exact path="/driver/dashboard" component={ requestDrive } />
            <Route exact path="/admin/dashboard" component={ adminDashboard } />
            <Route exact  component = { NoMatch } />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
