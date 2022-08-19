import {  useRoutes } from 'react-router-dom';
import React from 'react';

import App from './App';
import SearchResults from './Pages/SearchResults';
import Dashboard from './Pages/Dashboard';

export default function Router(){
    return useRoutes([
        {
            path: '/',
            element: <App />,
            children: [
                {path: '', element: <Dashboard/>},
                {path: 'search/:query', element: <SearchResults/>}
            ]
        }
    ])
}