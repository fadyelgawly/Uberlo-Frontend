import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { admin } from '../admin';

export class ControlledTabs extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        key: 'home',
      };
    }
  
    render() {
      return (
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="home" title="Users">
            <admin/>
          </Tab>
          <Tab eventKey="profile" title="Rides">
            Rides
          </Tab>
        </Tabs>
      );
    }
  }
  
