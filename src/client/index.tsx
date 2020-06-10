import * as React from "react";
import * as ReactDOM from "react-dom";

import './custom.scss';

import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { CtxProvider } from './context/context';

ReactDOM.render(
    <CtxProvider>
        <Router>
            <App />
        </Router>
    </CtxProvider>,

    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}