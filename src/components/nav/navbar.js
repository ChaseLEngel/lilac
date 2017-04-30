import React, { Component, button } from 'react';

import { Link } from 'react-router';

import { Button, Nav, NavItem, NavLink} from 'reactstrap';

import GroupStore from '../../store/groupStore';
import * as GroupActions from '../../actions/groupactions';

import CreateGroup from '../group/create'

class Navbar extends Component {

  constructor() {
    super()

    this.getGroups = this.getGroups.bind(this)

    this.state = {
      groups: [],
      showCreateGroup: false
    };
  }

  getGroups() {
    this.setState({
      groups: GroupStore.getGroups(),
    })
  }

  toggleCreateGroup = () => {
    this.setState({
      showCreateGroup: !this.state.showCreateGroup
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
        <NavItem style={navbarHeaderStyle}>
          Groups
          <button style={addGroupStyle} onClick={this.toggleCreateGroup} >+</button>
          <CreateGroup toggler={this.toggleCreateGroup} show={this.state.showCreateGroup}/>
        </NavItem>
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

const navbarHeaderStyle = {
  paddingBottom: '0px',
  padding: "10px",
  fontSize: '120%',
  color: '#97AFC3',
  textDecorationLine: 'none !important'
}

const addGroupStyle = {
  paddingLeft: '10px',
  fontSize: '120%',
  color: '#97AFC3',
  background: 'none',
  border: 'none',
  fontWeight: 'bold',
  cursor: 'pointer',
}

const navbarItemStyle = {
  padding: "10px",
  paddingTop: '0px'
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
