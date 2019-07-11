const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');



// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Public_url = "/";
const PORT = 3000;
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  entry: "./src/App.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.[hash:8].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: Public_url
  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: true,
    }),
    new HTMLInlineCSSWebpackPlugin({
      // replace: {
      //   removeTarget: false,
      //   target: '<!-- inline_css_plugin -->',
      // },
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: ''
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/', to: '' }
    ]),
    new CompressionPlugin(),
    
    
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.(png|jpeg|jpg|woff|woff2|eot|ttf|svg)$/,
        use: { loader: 'url-loader?limit=100000', }
      },
      // {
      //   test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      //   loader: 'file-loader',
      // },
      { 
        test: /\.(css|scss)$/, 
        // fallback: 'url-loader',
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              minimize: true
            },
          },
          'css-loader',
        ],
      },
      
      
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: false }
          }
        ]
      }

    ]
  },
  devServer: {
    port: PORT,
    historyApiFallback: {
      disableDotRule: true
    },
    contentBase: path.join(__dirname, '/build'),
    compress: true,
    clientLogLevel: 'info',
  },
  

};
