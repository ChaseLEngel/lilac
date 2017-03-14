import React, { Component } from 'react';

import { Button, Nav, NavLink } from 'reactstrap';

import GroupStore from '../store/groupStore';
import * as GroupActions from '../actions/groupactions';

import GroupItem from './navitem';

class Navbar extends Component {

  constructor() {
    super()

    this.getGroups = this.getGroups.bind(this)

    this.state = {
      groups: []
    };
    GroupActions.getGroups();
  }

  getGroups() {
      this.setState({
        groups: GroupStore.getGroups(),
      })
  }

  componentWillMount() {
    GroupStore.on("change", this.getGroups)
  }

  componentWillUnmount() {
    GroupStore.removeListener("change", this.getGroups)
  }

  listGroups() {
    return this.state.groups.map((group) => {
      return <GroupItem key={group.group_id} id={group.group_id} name={group.name} />
    })
  }

  render() {
    return (
      <div>
        <Nav className="flex-column">
          {this.listGroups()}
        </Nav>
      </div>
    );
  }
}

export default Navbar;
