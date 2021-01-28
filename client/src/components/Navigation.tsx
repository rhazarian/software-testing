import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import AuthContext from "../helpers/auth-context";

export default function Navigation() {
    const authContext = useContext(AuthContext);

    return (
        <div className="topnav">
            <NavLink className="navlink" to="/">Home</NavLink>
            <NavLink className="navlink" to="/post">Post</NavLink>
            <button onClick={authContext.logout}>Logout</button>
        </div>
    );
}
