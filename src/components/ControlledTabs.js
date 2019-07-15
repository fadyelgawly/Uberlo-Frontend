import React  from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { UsersList } from '../pages/admin/UsersList';
import { RidesList } from '../pages/admin/RidesList';

export class ControlledTabs extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'userslist',
    };
  }

  render() {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.setState({ key })}
      >
        <Tab eventKey="userslist" title="Users">
          <React.Fragment>
            <UsersList />
          </React.Fragment>

        </Tab>
        <Tab eventKey="rideslist" title="Rides">
        <React.Fragment>
            <RidesList />
          </React.Fragment>
          </Tab>
      </Tabs>
    );
  }
}

