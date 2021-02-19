import React from 'react'; 
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { ContributorDetails } from '@views/Contributors';
import { OrganizationInfo } from '@views/Organization';
import { RepositoryDetails } from '@views/Repositories';

function AppRouter(props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    <OrganizationInfo />
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