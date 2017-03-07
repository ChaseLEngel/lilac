import React, { Component } from 'react';

import { Link } from 'react-router';

import { NavItem, NavLink } from 'reactstrap';

class GroupItem extends Component {

  render() {
    return (
      <NavItem>
        <NavLink tag={Link} to={"/groups/"+this.props.id}>{this.props.name}</NavLink>
      </NavItem>
    );
  }
}

export default GroupItem;
