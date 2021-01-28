/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import AppView from './AppView';
import AuthContext from "../helpers/auth-context";

describe('Auth tests', () => {
    it('shows only login page if the user is not logged in', () => {
        const history = createMemoryHistory();

        render(
            <AuthContext.Provider value={{user: null, login: () => Promise.reject(), logout: () => {}, authHeader: () => {return {};}}}>
                <Router history={history}>
                    <AppView/>
                </Router>
            </AuthContext.Provider>
        );

        expect(screen.getByText(/login/i)).toBeInTheDocument();

        history.push('/post');

        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('shows pages if the user is logged in', () => {
        const history = createMemoryHistory();

        render(
            <AuthContext.Provider value={{user: {authdata: "system:admin", id: 0}, login: () => Promise.reject(), logout: () => {}, authHeader: () => {return {};}}}>
                <Router history={history}>
                    <AppView/>
                </Router>
            </AuthContext.Provider>
        );

        expect(screen.getByText(/only important/i)).toBeInTheDocument();

        history.push('/post');

        expect(screen.getByText(/title/i)).toBeInTheDocument();
    });
});
