import React, { Component } from 'react';

import { Link } from 'react-router';

import { Button, Nav, NavItem, NavLink } from 'reactstrap';

import GroupStore from '../../store/groupStore';
import * as GroupActions from '../../actions/groupactions';

import GroupItem from './navitem';

class Navbar extends Component {

  constructor() {
    super()

    this.getGroups = this.getGroups.bind(this)

    this.state = {
      groups: []
    };
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

  componentDidMount() {
    GroupActions.getGroups();
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
          <hr />
          <NavItem>
            <NavLink activeClassName="active" tag={Link} to={"/machines"}>Machines</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Navbar;
