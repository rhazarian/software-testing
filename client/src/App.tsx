import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import Post from './components/Post';
import './App.css';
import Navigation from "./components/Navigation";

function App() {
    return (
        <BrowserRouter>
            <Navigation/>
            <Switch>
                <Route path="/post" id="post" component={Post}/>
                <Route path="/" id="home" component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
