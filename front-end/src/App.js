import React, { lazy, Suspense } from 'react';
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import routes from './setup/routes';
import Layout from "./components/layout";
import Loading from "./components/others/Loading";
import NotFound from './components/notfound/notfound';
// import './config/custom_request';
// const routeComponents = routes.map(({ path, component }, key) =>
//     <Route exact={true} path={path} component={component} key={key} />);

// const Home = lazy(() => import('./components/home'));
// const Detail = lazy(() => import('./components/details/detail'));
// const Info = lazy(() => import('./components/details/info'));
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router >
            <Layout>
                <Suspense fallback={<div/>}>
                    <Switch>
                        {routes.map((route,i) => {
                            return <Route key={i} exact path={route.path} component={route.component} />
                        })

                        }
                        {/* <Route exact path="/" component={Home} />
                        <Route exact path="/phim/:slug/:id" component={Info} />
                        <Route exact path="/phim/:slug/:id/xem-phim" component={Detail} />
                        <Route path="**" component={NotFound} /> */}
                    </Switch>
                </Suspense>
            </Layout>
        </Router>
    </Provider>
    , document.getElementById('root')
);


// export default function App(){
//     return (
//         <Router >
//             <Layout>
//                 <Suspense fallback={<Loading />}>
//                     <Switch>
//                         <Route exact path="/" component={Home} />
//                         <Route exact path="/phim/:slug-:id" component={Info} />
//                         <Route exact path="/phim/:slug-:id/xem-phim" component={Detail} />
//                         <Route path="**" component={NotFound} />
//                     </Switch>
//                 </Suspense>
//             </Layout>
//         </Router>
//     )
// }
// export default class App extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {

//         return (
//             <Router >
//                 <Layout>
//                     <Suspense fallback={<Loading />}>
//                         <Switch>
//                             <Route exact path="/" component={Home} />
//                             <Route exact path="/phim/:slug-:id" component={Info} />
//                             <Route exact path="/phim/:slug-:id/xem-phim" component={Detail} />
//                             <Route path="**" component={NotFound} />
//                         </Switch>
//                     </Suspense>
//                 </Layout>
//             </Router>
//         )
//     }
// }