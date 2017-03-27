const path = require("path");
const fs = require("fs");

const { AureliaPlugin, ModuleDependenciesPlugin } = require("aurelia-webpack-plugin");

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');


const baseUrl = '/';
const rootDir = __dirname;
const appDir = path.resolve(__dirname, 'src');
const outDir = path.resolve(__dirname, 'dist');
const nodeModules = path.resolve(__dirname, 'node_modules');
const webpackPort = parseInt(process.env.WEBPACK_PORT) || 9000;
const webpackHost = process.env.WEBPACK_HOST || 'localhost';


module.exports = {
  entry: "aurelia-bootstrapper",

  output: {
    path: outDir,
		publicPath: "/dist/",
		filename: "bundle.js",
  },

  resolve: {
    extensions: [".js"],
    modules: [appDir, nodeModules].map(x => path.resolve(x)),
  },

  module: {
    rules: [
      { test: /\.js/i, use: "babel-loader" },
      { test: /\.html$/i, use: "html-loader"},
      { test: /\.(ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader'},
      { test: /\.(png|gif|jpg|cur)$/, loader: 'url-loader', query: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' },
			{ test: /\.json$/, use: "json-loader" }
    ]
  },

  // devServer: {
  //   historyApiFallback: true,
  //   port: webpackPort,
  //   host: webpackHost,
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   }
  // },

  plugins:[
      new AureliaPlugin(),
      new ModuleDependenciesPlugin({
        "aurelia-i18n": [ "./t", "./nf", "./df", "./rt" ],
      })
		]
};
