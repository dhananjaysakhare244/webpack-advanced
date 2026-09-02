const production = require("./webpack.prod.config");
const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(production, {
  optimization: {
    concatenateModules: false,
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      openAnalyzer: true,
    }),
  ],
});
