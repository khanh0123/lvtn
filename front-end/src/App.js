import React, { Suspense } from 'react';
import {hydrate} from "react-dom";
import { customStore, createCustomStore } from './reducers';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { routeslazy } from './setup/routesLazy';
import Layout from "./components/Layout";
import Loading from "./components/others/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/style.css';
import './assets/css/loginsignup.css';
import config from "./config";
import * as serviceWorker from './registerServiceWorker';
// import cookie from "react-cookies";

const store = window.__REDUX_DATA__ != "" ? createCustomStore(window.__REDUX_DATA__) : customStore;
// delete window.__REDUX_DATA__;
hydrate(
    <ReduxProvider store={store}>
        <Suspense fallback={<Loading />}>
            <Router>
                <Layout clearCache={clearCacheServiceWorker}>
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
serviceWorker.register();
async function clearCacheServiceWorker (callback) {
    
    await serviceWorker.unregisterAndClearCaches();
    if(typeof callback == "function"){        
        callback();
    }
}