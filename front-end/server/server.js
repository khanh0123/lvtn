import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
// import StyleContext from 'isomorphic-style-loader/StyleContext'
import Layout from "../src/components/Layout";
import NotFound from "../src/components/notfound/Notfound";
import { routes } from "../src/setup/routes";
// import createStore, { initializeSession } from "../src/store/reducers";
import { initializeSession, customStore } from "../src/reducers";
import {renderHTML} from "./modules";
// import htmlTemplate from "./template";
import {LoadingAction} from "../src/actions/index"

const minify = require('html-minifier').minify;
const DEFAULT_PORT = parseInt(process.env.PORT, 5000) || 5000;
const app = express();
const version = require("../package.json").version;

// app.use(express.static(path.resolve(__dirname, "../src/assets")));
app.use(express.static(path.resolve(__dirname, "../dist")));
app.get("*", async (req, res) => {
    // const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))

    if (req.url.indexOf('js') === -1 && req.url.indexOf('css') === -1) {
        const context = {};
        const store = customStore;

        store.dispatch(initializeSession());
        let matchRoute = [];

        routes
            .filter(route => matchPath(req.url, route)) // filter matching paths
            .map(route => {
                let match = matchPath(req.url, route)
                match['fullUrl'] = req.protocol + '://' + req.get('host') + req.originalUrl
                match['fullPath'] = req.originalUrl
                matchRoute.push(match);
            })

        const dataRequirements =
            routes
                .filter(route => matchPath(req.url, route)) // filter matching paths
                .map(route => route.component) // map to components
                .filter(comp => comp.serverFetch) // check if components have data requirement
                .map(comp => comp.serverFetch({ store: store, 'request': matchRoute[0] }))



        Promise.all(dataRequirements).then(() => {

            store.dispatch(LoadingAction.set_loading(true));

            const jsx = (
                <ReduxProvider store={store}>
                    <StaticRouter context={context} location={req.url}>
                        <Layout>
                                <Switch>
                                    {routes.map(route => <Route key={route.path} {...route} />)}
                                </Switch>
                        </Layout>
                    </StaticRouter>
                </ReduxProvider>
            );

            const reactDom = renderToString(jsx);
            const reduxState = store.getState();
            const helmetData = Helmet.renderStatic();

            let data = {reactDom, reduxState, helmetData, version};

            res.writeHead(200, { "Content-Type": "text/html" });
            // res.end(htmlTemplate({reactDom, reduxState, helmetData, version}));
            
            
            renderHTML(data, (callbackdata) => {
                let html =  minify(callbackdata, {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true,
                    conservativeCollapse: true,
                    removeTagWhitespace: true,
                    removeComments:true,
                });
                return res.end(html);
            })


        }).catch(function (err) {
            const jsx = (
                <NotFound />
            );
            const reactDom = renderToString(jsx);
            const reduxState = store.getState();
            const helmetData = Helmet.renderStatic();

            reduxState.isError = true;
            data = {reactDom, reduxState, helmetData, version};

            res.writeHead(500, { "Content-Type": "text/html" });
            let html = minify(renderHTML(data), {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                conservativeCollapse: true,
                removeTagWhitespace: true,
                removeComments:true,
            });
            res.end(html);
        });

    } else {
        console.log("request file" + req.url);
    }

});

app.listen(DEFAULT_PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`App is running at Port ${DEFAULT_PORT}`);

});
