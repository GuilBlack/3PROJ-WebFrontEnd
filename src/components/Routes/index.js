import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import components
import PrivateRoute from './PrivateRoute';
import Home from '../Home';
import Login from '../Login';
import RegisterStaff from '../Staff/RegisterStaff';
import Staff from '../Staff';
import Menu from '../Menu';
import Ingredients from '../Ingredients';

// ROUTES
export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route name="login" path="/login">
                    <Login />
                </Route>
                <PrivateRoute Component={Staff} name="staff" path="/staff" />
                <PrivateRoute Component={RegisterStaff} name="register" path="/register-staff" />
                <PrivateRoute Component={Ingredients} name="ingredients" path="/ingredients" />
                <PrivateRoute Component={Menu} name="menu" path="/menu" />
                <PrivateRoute Component={Home} name="home" path="/" />
            </Switch>
        </Router> 
    );
}
