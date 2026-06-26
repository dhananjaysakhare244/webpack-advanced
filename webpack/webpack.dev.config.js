const common = require("./webpack.common.config");
const { merge } = require("webpack-merge");
const path = require("path");
module.exports = merge(common, {
  output: {
    filename: "bundle.js", // main.js is default if not provided
  },
  mode: "development",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "../dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true, // when we run in dev mode dist folder is empty as it doesn't write to disk. To avoid this confusion we can set it to true so webpack will write to dist folder.
    },
    client: {
      overlay: true,
    },
    liveReload: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // matches this file ext
        // exclude css modules
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"], // runs these loaders for these file extension
      },
      // write new rules to handle how modules should be build
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[md4:hash:7]", // use custom ident for css so we don't have collisions
              },
            },
          },
        ],
      },
      ,
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
                silenceDeprecations: ["import"],
              },
            },
          },
        ],
      },
    ],
  },
});
