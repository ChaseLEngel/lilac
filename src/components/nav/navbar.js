import React, { Component } from 'react';

import { Link } from 'react-router';

import { Button, Nav, NavItem, NavLink} from 'reactstrap';

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
      return (
        <NavItem key={group.group_id} style={navbarItemStyle}>
          <NavLink style={navBarTextStyle} tag={Link} to={"/groups/"+group.group_id}>{group.name}</NavLink>
        </NavItem>
      )})
  }

  render() {
    return (
      <Nav style={navbarStyle}>
        {this.listGroups()}
        <hr />
        <NavItem style={navbarItemStyle}>
          <NavLink style={navBarTextStyle} tag={Link} to={"/machines"}>Machines</NavLink>
        </NavItem>
        <NavItem style={navbarItemStyle}>
          <NavLink style={navBarTextStyle} tag={Link} to={"/login"}>Log out</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

const navbarItemStyle = {
  padding: "10px",
}

const navBarTextStyle = {
  color: "#8DA7BE"
}

const navbarStyle = {
  flexDirection: 'column',
  background: "#587291",
  height: '100%',
  minHeight: '100%'
};

export default Navbar;
