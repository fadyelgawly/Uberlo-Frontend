import React  from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { UsersList } from './UsersList';
import { RidesList } from './RidesList';

export class ControlledTabs extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'profile',
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
          <React.Fragment>
            <UsersList />
          </React.Fragment>

        </Tab>
        <Tab eventKey="profile" title="Rides">
        <React.Fragment>
            <RidesList />
          </React.Fragment>
          </Tab>
      </Tabs>
    );
  }
}

