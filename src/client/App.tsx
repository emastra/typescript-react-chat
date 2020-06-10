import * as React from "react";

import './App.scss';

import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';

import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Container from './components/Container';

// import './socket/Socket';

class App extends React.Component {
    render() {
        return (
            <Container>
                <Navigation />
                <Switch>
                    <Route exact path="/" component={ChatPage} />
                    <Route 
                        path="/settings" 
                        component={SettingsPage}
                    />
                </Switch>
            </Container>
        );
    }
}

export default App;
