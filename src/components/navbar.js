import React, { Component } from 'react';

import GroupStore from '../store/groupStore';
import * as GroupActions from '../actions/GroupActions';
import NavItem from './navitem';

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
    var groupList = this.state.groups.map((group) => 
      <NavItem key={group.group_id} id={group.group_id} name={group.name} />
    )
    return (
      <ul className="nav nav-pills nav-stacked">
        <span>Groups</span>
        {groupList} 
      </ul>
    );
  }
}

export default Navbar;
