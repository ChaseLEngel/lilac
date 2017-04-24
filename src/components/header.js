import React, { Component } from 'react';

import { Button } from 'reactstrap';

class Header extends Component {
  render() {
    return (
      <div style={headerStyle}>
        <h1 style={h1Style}>Lilac</h1>
      </div>
    );
  }
}

const h1Style = {
  marginBottom: 0
}

const headerStyle = {
  display: 'flex',
  flex: 1,
  background: '#587291',
}

export default Header;
