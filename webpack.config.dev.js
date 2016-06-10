const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CachePlugin = require("webpack/lib/CachePlugin");


const commonSettings = require("./webpack.config.common.js");

commonSettings.cache = true;
commonSettings.debug = true;
commonSettings.devtool = "sourcemap";
commonSettings.entry = {
    app: [commonSettings.paths.app]
};

commonSettings.devServer = {
    historyApiFallback: true,
    hot: true,
    progress: true,
    inline: true,

    // display only errors to reduce the amount of output
    //stats: "errors-only",

    // parse host and port from env so this is easy
    // to customize
    // host: process.env.HOST,
    host: "0.0.0.0",
    port: 8080
};

commonSettings.plugins.push(new webpack.HotModuleReplacementPlugin());
commonSettings.plugins.push(new CopyWebpackPlugin([{ from: "showcase" }]));

commonSettings.plugins.push(new CachePlugin({}));


module.exports = commonSettings;