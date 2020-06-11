// @ts-nocheck

import * as React from "react";

import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';

import { Route, Switch } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import StyleWrapper from './components/StyleWrapper/StyleWrapper';

import { CtxConsumer } from './context/context';

class App extends React.Component {
    render() {
        return (
            <CtxConsumer>
                {(ctx) => {
                    const { messages } = ctx;

                    return (
                        <StyleWrapper>
                            <Navigation totalMessages={messages.length} />
                            <Switch>
                                <Route exact path="/" component={ChatPage} />
                                <Route 
                                    path="/settings" 
                                    component={SettingsPage}
                                />
                            </Switch>
                        </StyleWrapper>
                    );
                }}
            </CtxConsumer>
        );
    }
}

export default App;
