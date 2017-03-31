import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import Group from './pages/group';
import Machines from './pages/machines';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/groups/:group_id" component={Group} />
      <Route path="/machines" component={Machines} />
    </Route>
  </Router>,
  document.getElementById('root')
);
