import React, { Component } from 'react';

import { Button, Nav, NavLink } from 'reactstrap';

import GroupStore from '../store/groupStore';
import * as GroupActions from '../actions/groupactions';

import GroupItem from './navitem';

class Navbar extends Component {

  constructor() {
    super()
    this.state = {
      groups: this.getGroups(),
    };
  }

  getGroups() {
    GroupActions.getGroups();
  }

  componentWillMount() {
    GroupStore.on("change", () => {
      this.setState({
        groups: GroupStore.getGroups(),
      })
    })
  }

  render() {
    if(this.state.groups === undefined) {
      return null
    }
    var groups = this.state.groups.map((group) => {
      return <GroupItem key={group.group_id} id={group.group_id} name={group.name} />

    })

    return (
      <div>
        <Nav className="flex-column">
          {groups}
        </Nav>
      </div>
    );
  }
}

export default Navbar;
