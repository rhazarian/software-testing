import React from 'react';
import AuthProvider from "./components/AuthProvider";
import AppView from "./components/AppView";
import {BrowserRouter} from "react-router-dom";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppView/>
            </BrowserRouter>
        </AuthProvider>
    );
}
