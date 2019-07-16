import React  from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { UsersList } from './UsersList';
import { TripsList } from './TripsList';

export class AdminTabs extends React.Component {

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
        <Tab eventKey="tripslist" title="Trips">
        <React.Fragment>
            <TripsList />
          </React.Fragment>
          </Tab>
      </Tabs>
    );
  }
}

