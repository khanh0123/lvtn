import React, { Suspense } from 'react';
import ReactDOM from "react-dom";
// import promise from 'redux-promise';
// import reducers from './reducers';
import { customStore , createCustomStore} from './reducers';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
// import { applyMiddleware, createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { routeslazy } from './setup/routesLazy';
import Layout from "./components/layout";
import Loading from "./components/others/Loading";
// import StyleContext from 'isomorphic-style-loader/StyleContext'

// const insertCss = (...styles) => {
//     const removeCss = styles.map(style => style._insertCss())
//     return () => removeCss.forEach(dispose => dispose())
// }
const store = window.__REDUX_DATA__ ? createCustomStore(window.__REDUX_DATA__ || "") : customStore;

ReactDOM.hydrate(
    <ReduxProvider store={store}>
        <Suspense fallback={<Loading />}>
            <Router>
                    <Layout/>
                        
            </Router>
        </Suspense>
    </ReduxProvider>
    , document.getElementById('root')
);