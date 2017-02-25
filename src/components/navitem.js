import React, { Component } from 'react';

import {Link} from 'react-router'

class NavItem extends Component {

  render() {
    return (
      <li role="presentation">
        <Link to={"/groups/"+this.props.id}>{this.props.name}</Link>
      </li>
    );
  }
}

export default NavItem;
