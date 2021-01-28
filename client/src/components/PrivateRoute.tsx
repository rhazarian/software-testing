import React, {useContext} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import AuthContext from "../helpers/auth-context";

export const PrivateRoute: React.FC<RouteProps> = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);

    return (
        <Route {...rest} render={props => (
            authContext.user !== null
                ? Component ? <Component {...props} /> : <></>
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    );
}

export default PrivateRoute;
