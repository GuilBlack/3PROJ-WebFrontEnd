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
import AddMenuItem from '../Menu/AddMenuItem';
import Ingredients from '../Ingredients';
import Map from '../Map';

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
                <PrivateRoute Component={Ingredients} name="stock" path="/stock" />
                <PrivateRoute Component={AddMenuItem} name="add-menu-item" path="/:categoryType/:categoryName/:categoryId/new" />
                <PrivateRoute Component={Menu} name="menu" path="/menu" />
                <PrivateRoute Component={Map} name="map" path="/map" />
                <PrivateRoute Component={Home} name="home" path="/" />
            </Switch>
        </Router> 
    );
}
