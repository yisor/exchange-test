import React from 'react';
import { Router } from 'dva/router';
import routes from './routes';

const RouterConfig = ({ history, app }) => {
  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
