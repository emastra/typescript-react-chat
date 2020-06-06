import * as React from "react";

// import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Chat from './pages/ChatPage';
import Settings from './pages/SettingsPage';

import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';

// import { Container } from 'reactstrap';

class App extends React.Component {
    render() {
        return (
            <>
                <Navigation />
                <Switch>
                    <Route path="/" exact component={Chat} />
                    <Route path="/settings" component={Settings} />
                    {/* <Route component={Default} /> */}
                </Switch>
            </>
            
        );
    }
}

export default App;
