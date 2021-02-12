import React from 'react'; 
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { ContributorList, ContributorDetails } from '../views/Contributors';
import { RepositoryDetails } from '../views/Repositories';

function AppRouter(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    <ContributorList />
                </Route>
                <Route path="/contributor/:name">
                    <ContributorDetails />
                </Route>
                <Route path="/repository/:group/:name">
                    <RepositoryDetails />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;