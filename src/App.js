import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';
class App extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <HashRouter>
                <Route
                    render={() => {
                        return (
                            <Switch>
                                {routes.map((route) => (
                                    <Route
                                        component={route.component}
                                        exact
                                        key={route.path}
                                        path={route.path}
                                    />
                                ))}
                            </Switch>
                        );
                    }}
                />
            </HashRouter>
        );
    }
}
export default App;
