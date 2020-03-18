// Core
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

// Instruments
import { store } from './init/store';
import { history } from './init/middleware';

// Routes
import { Routes } from './routes';

export const App = () => (
    <Provider store = { store }>
        <Router history = { history }>
            <Routes />
        </Router>
    </Provider>
);
