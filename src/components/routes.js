import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import components
import PrivateRoute from './privateRoute';
import Home from './home';
import Login from './login';
import RegisterStaff from './registerStaff';
import Menu from './menu';

// ROUTES
export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route name="login" path="/login">
                    <Login />
                </Route>
                <PrivateRoute Component={RegisterStaff} name="register" path="/register-staff" />
                <PrivateRoute Component={Menu} name="menu" path="/menu" />
                <PrivateRoute Component={Home} name="home" path="/" />
            </Switch>
        </Router> 
    )
}