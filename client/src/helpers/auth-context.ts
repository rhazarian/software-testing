import React from 'react';

type AuthContextType = {
    user: null | {
        authdata: string,
        id: number
    },
    login: (username: string, password: string) => Promise<Response>,
    logout: () => void,
    authHeader: () => Record<string, string>
};

const defaultValue: AuthContextType = {
    user: null,
    login: () => Promise.reject(),
    logout: () => {},
    authHeader: () => {
        return {};
    }
};

const AuthContext: React.Context<AuthContextType> = React.createContext(defaultValue);

export default AuthContext;
