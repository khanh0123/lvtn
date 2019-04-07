import React, { Suspense } from 'react';
import {hydrate} from "react-dom";
// import promise from 'redux-promise';
// import reducers from './reducers';
import { customStore, createCustomStore } from './reducers';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
// import { applyMiddleware, createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { routeslazy } from './setup/routesLazy';
import Layout from "./components/layout";
import Loading from "./components/others/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "./config";
// import StyleContext from 'isomorphic-style-loader/StyleContext'

// const insertCss = (...styles) => {
//     const removeCss = styles.map(style => style._insertCss())
//     return () => removeCss.forEach(dispose => dispose())
// }
const store = window.__REDUX_DATA__ != "" ? createCustomStore(window.__REDUX_DATA__) : customStore;
// delete window.__REDUX_DATA__;
hydrate(
    <ReduxProvider store={store}>
        <Suspense fallback={<Loading />}>
            <Router>

                <Layout>
                    <Switch>
                        {routeslazy.map(route => <Route key={route.path} {...route} />)}
                    </Switch>
                    <ToastContainer autoClose={config.time.default_toast} position={toast.POSITION.TOP_RIGHT} />
                </Layout>
                

            </Router>
        </Suspense>
    </ReduxProvider>
    , document.getElementById('root')
);