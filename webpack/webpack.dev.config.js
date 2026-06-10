const common = require("./webpack.common.config");
const { merge } = require("webpack-merge");
const path = require("path");
module.exports = merge(common, {
  mode: "development",
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, ".."),
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
});
