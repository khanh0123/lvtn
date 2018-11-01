import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import routes from './setup/routes';
import Layout from "./components/layout";
// import Lazy from "./components/lazy/lazy";
// import Async from "./components/lazy/async";
import Loading from "./components/others/Loading";
import NotFound from './components/notfound/notfound';
// const routeComponents = routes.map(({ path, component }, key) =>
//     <Route exact={true} path={path} component={component} key={key} />);

const Home = lazy(() => import('./components/home'));
const Detail = lazy(() => import('./components/details/detail'));
const Info = lazy(() => import('./components/details/info'));

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
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/phim/:slug-:id" component={Info} />
                            <Route exact path="/phim/:slug-:id/xem-phim" component={Detail} />
                            <Route path="**" component={NotFound} />
                        </Switch>
                    </Suspense>
                </Layout>
            </Router>
        )
    }
}