const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const plugins = [
    // new FriendlyErrorsWebpackPlugin(),
];

// if (!dev) {
//     plugins.push(new BundleAnalyzerPlugin({
//         analyzerMode: "static",
//         reportFilename: "webpack-report.html",
//         openAnalyzer: false,
//     }));
// }
module.exports = {
    mode: dev ? "development" : "production",
    context: path.join(__dirname, "../src"),
    devtool: dev ? "none" : "source-map",
    entry:{
        app: "./App"
    },
    output: {
        path: path.resolve(__dirname, "..","dist"),
        filename: "[name].bundle.js",
    },
    resolve: {
        modules: [
            path.resolve("../src"),
            "../node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }, 
            { 
                test: /\.(css|scss)$/, 
                use: [ 'style-loader', 'css-loader' ]
            },
        ],

    },

    // plugins: [
    //     new CopyWebpackPlugin([
    //       { from: '../src/assets/', to: '../dist/assets/' }
    //     ])
    //   ]
};
