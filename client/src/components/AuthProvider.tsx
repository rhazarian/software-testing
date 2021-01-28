import React, {useState} from "react";

import AuthContext from "../helpers/auth-context";

export default function AuthProvider({children}: { children?: React.ReactNode }) {
    const [user, setUser] = useState<null | {
        authdata: string,
        id: number
    }>(JSON.parse(localStorage.getItem('REACT_USER') ?? 'null'));

    const login = (username: string, password: string) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        };

        return fetch(`http://89.179.122.237:8000/auth`, requestOptions)
            .then(res => res.json().then(
                data => res.ok ? data : Promise.reject(data.message ?? res.statusText),
                () => Promise.reject(res.statusText)
            ))
            .then(user => {
                if (user) {
                    user.authdata = window.btoa(username + ':' + password);
                    setUser(user);
                    localStorage.setItem('REACT_USER', JSON.stringify(user));
                }

                return user;
            });
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem('REACT_USER');
    }

    function authHeader(): Record<string, string> {
        if (user) {
            return {'Authorization': 'Basic ' + user.authdata};
        } else {
            return {};
        }
    }

    return (
        <AuthContext.Provider value={{user: user, login: login, logout: logout, authHeader: authHeader}}>
            {children}
        </AuthContext.Provider>
    );
}
