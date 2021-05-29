import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { isLoggedIn } from '../utils';

export default function PrivateRoute({Component, name, path}) {
    const { loggedIn } = React.useContext(AuthContext);
    return(
        <Route name={name} path={path}>
            {
                /**
                 * check both loggedIn and isLoggedIn, since
                 * loggedIn --> changes on explicit login/logout 
                 * isLoggedIn --> ensures that the auth cookie didn't expire or get deleted while using the app 
                 */
                loggedIn ? <Component /> : <Redirect to='/login' />
            }
        </Route>
    );
}
