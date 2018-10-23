import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './setup/routes';
import Layout from "./components/layout";

const routeComponents = routes.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />);

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <Router >
                <Layout>
                    <Switch>
                        {routeComponents}
                    </Switch>
                </Layout>
            </Router>
        )
    }
}
// const App = () => (


// )


// export default App;

