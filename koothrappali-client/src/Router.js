import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as routes from './constants/routes.js';
import Dashboard from './components/Dashboard';

// Top level application router.
const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path={routes.DASHBOARD} component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default Router;
