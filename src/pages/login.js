import React, { Component } from 'react';

import { browserHistory } from 'react-router';

import { Card, CardHeader, CardBlock, Row, Col, Input, Label, Button } from 'reactstrap'

class Login extends Component {
  login = () => {
    browserHistory.push('/')
  }
  render() {
    return (
      <div style={LoginStyle}>
        <Row>
          <Col>
            <h1 style={h1Style}>Lilac</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
            <Input placeholder='User' type='text'/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input placeholder='Password' type='password'/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button color='secondary' onClick={this.login}>Login</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const h1Style = {
  marginBottom: '-15px',
}

const LoginStyle = {
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  height: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}

export default Login;
