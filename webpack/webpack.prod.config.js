const common = require("./webpack.common.config");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(common, {
  output: {
    filename: "[name].[contenthash:12].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/, // matches this file ext
        use: [MiniCssExtractPlugin.loader, "css-loader"], // runs these loaders for these file extension
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:12].css",
    }),
  ],
});
