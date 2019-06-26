const dev = process.env.NODE_ENV !== "production";
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const uglifyJsContents = require('uglify-js');
const uglifyCssContents = require('uglifycss');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const plugins = [
    // new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(['dist'], {
        root: process.cwd(),
        verbose: true,
        dry: false
    }),
    new CopyWebpackPlugin([{
        from: '../src/assets/',
        to: '../dist/',
        transform: function (fileContent, path) {
            if (!is_minimize) {
                console.log(`Running copy assets folders with minimize ...`);
                is_minimize = true;
            }
            let regJS = /\.js$/gi;
            let regCSS = /\.css$/gi;
            if (regJS.test(path)) {
                try {
                    return path.indexOf(".min.js") == -1 ? uglifyJsContents.minify(fileContent.toString()).code.toString() : fileContent;
                } catch (error) {
                    return fileContent;
                }

            }

            if (regCSS.test(path)) {
                return uglifyCssContents.processFiles(
                    [path],
                    { maxLineLen: 500, expandVars: true }
                );
            }

            return fileContent;

        }
    }]),
    // new CopyWebpackPlugin([
    //     { from: 'src/assets/sw.js', to: '../dist/sw.js' }
    // ]),
    // new CopyWebpackPlugin([
    //     { from: 'src/assets/manifest.json', to: '../dist/manifest.json' }
    // ]),
    new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, '../public/index.html'),
        filename: 'template.html',

      }),
];

// if (!dev) {
//     plugins.push(new BundleAnalyzerPlugin({
//         analyzerMode: "static",
//         reportFilename: "webpack-report.html",
//         openAnalyzer: false,
//     }));
// }

let is_minimize = false;
let version = require("../package.json").version;
module.exports = {
    mode: dev ? "development" : "production",
    context: path.join(__dirname, "../src"),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: "./App"
    },
    output: {
        path: path.resolve(__dirname, "..", "dist"),
        filename: `app.js?v=${version}`,
        publicPath: '/',
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
                use: ['style-loader', 'css-loader']
            },
        ],

    },

    plugins: plugins
};
