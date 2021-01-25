import React from 'react';

import {NavLink} from 'react-router-dom';

export default function Navigation() {
    return (
        <div className="topnav">
            <NavLink className="navlink" to="/">Home</NavLink>
            <NavLink className="navlink" to="/post">Post</NavLink>
        </div>
    );
}
