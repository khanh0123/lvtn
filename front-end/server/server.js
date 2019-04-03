import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
// import StyleContext from 'isomorphic-style-loader/StyleContext'
import Layout from "../src/components/Layout";
import NotFound from "../src/components/notfound/Notfound";
import { routes } from "../src/setup/routes";
// import createStore, { initializeSession } from "../src/store/reducers";
import { initializeSession, customStore } from "../src/reducers";
import htmlTemplate from "./template";

const minify = require('html-minifier').minify;
const DEFAULT_PORT = parseInt(process.env.PORT, 3000) || 3000;
const app = express();
const version = require("../package.json").version;

// app.use(express.static(path.resolve(__dirname, "../src/assets")));
app.use(express.static(path.resolve(__dirname, "../dist")));
app.get("*", (req, res) => {
    // const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))

    if (req.url.indexOf('js') === -1 && req.url.indexOf('css') === -1) {
        const context = {};
        const store = customStore;

        store.dispatch(initializeSession());
        let match_path = [];
        routes
            .filter(route => matchPath(req.url, route)) // filter matching paths
            .map(route => {
                let i = matchPath.length;
                let match = matchPath(req.url, route)                
                match['fullUrl'] = req.protocol + '://' + req.get('host') + req.originalUrl
                match['fullPath'] = req.originalUrl
                match_path.push(match);                                
                
            }) // get params from route 
        
        const dataRequirements =
            routes
                .filter(route => matchPath(req.url, route)) // filter matching paths
                .map(route => route.component) // map to components
                .filter(comp => comp.serverFetch) // check if components have data requirement
                .map(comp => comp.serverFetch({ store: store, 'request': match_path[0] }))



        Promise.all(dataRequirements).then(() => {         


            const jsx = (
                <ReduxProvider store={store}>
                
                    <StaticRouter context={context} location={req.url}>
                        {/* <Router> */}
                        <Layout/>
                        {/* </Router> */}
                            

                    </StaticRouter>

                    
                </ReduxProvider>
            );

            const reactDom = renderToString(jsx);
            const reduxState = store.getState();
            const helmetData = Helmet.renderStatic();



            res.writeHead(200, { "Content-Type": "text/html" });
            let data = {
                reactDom: reactDom,
                reduxState: reduxState,
                helmetData: helmetData,
                version: version,
            }
            let html = minify(htmlTemplate(data), {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                conservativeCollapse: true,
                removeTagWhitespace: true
            });
            res.end(html);

        }).catch(function (err) {
            // console.log(err.message); // some coding error in handling happened
            const jsx = (
                <NotFound />
            );
            const reactDom = renderToString(jsx);
            const reduxState = store.getState();
            const helmetData = Helmet.renderStatic();

            reduxState.isError = true;
            data = {
                reactDom: reactDom,
                reduxState: reduxState,
                helmetData: helmetData,
                version: version,
            }

            res.writeHead(500, { "Content-Type": "text/html" });
            let html = minify(htmlTemplate(data), {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
                conservativeCollapse: true,
                removeTagWhitespace: true
            });
            res.end(html);
        });

    } else {
        console.log("request file"+req.url);
    }

});

app.listen(DEFAULT_PORT);
console.log(`App is listening at Port ${DEFAULT_PORT}`);