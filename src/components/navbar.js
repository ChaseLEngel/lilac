import React, { Component } from 'react';

import NavItem from './navitem';

class Navbar extends Component {

  render() {
    var groupList = this.props.groups.map((group) => 
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
