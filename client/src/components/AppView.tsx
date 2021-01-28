import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./Home";
import Post from './Post';
import Navigation from "./Navigation";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login"
import AuthContext from "../helpers/auth-context";

export default function AppView() {
    return (
        <div>
            <AuthContext.Consumer>
                {context => context.user && <Navigation/>}
            </AuthContext.Consumer>
            <Switch>
                <PrivateRoute exact path="/post" component={Post}/>
                <PrivateRoute exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </div>
    );
}
