import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import Group from './pages/group';
import Machines from './pages/machines';
import RequestMachines from './pages/requestmachines';
import Settings from './pages/settings';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/groups/:group_id" component={Group} />
      <Route path="/groups/:group_id/settings" component={Settings} />
      <Route path="/requests/:request_id/machines" component={RequestMachines} />
      <Route path="/machines" component={Machines} />
    </Route>
  </Router>,
  document.getElementById('root')
);
