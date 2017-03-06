import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import Group from './pages/group';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/groups/:group_id" component={Group} />
    </Route>
  </Router>,
  document.getElementById('root')
);
