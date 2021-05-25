import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils';


export default function PrivateRoute({Component, name, path}) {
    return(
        <Route name={name} path={path}>
            {
                isLoggedIn() ?
                <Component />
                :
                <Redirect to='/login' />
            }
        </Route>
    )
}