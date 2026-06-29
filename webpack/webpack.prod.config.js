const common = require("./webpack.common.config");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const glob = require("glob");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
module.exports = merge(common, {
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  mode: "production",
  // special optimization for CSS
  // this uses CSSNano tool under the hood to optimize css for prod
  optimization: {
    minimize: true,
    minimizer: [
      "...",
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/, // matches this file ext
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // runs these loaders for these file extension
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64]",
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
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
      {
        test: /\.(png|jpg|svg)$/, // rule for images
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // inline the file if size is 10kB. if more than 10 then copy the file in output directlry
          },
        },
        generator: {
          filename: "./images/[name].[contenthash:12][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                quality: 40, // compression quality 0 is worse quality 100 is best quality
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css",
    }),
    // this plugin will basically scan the css files and remove unnecessary css that's written
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, {
        nodir: true,
      }),
    }),
  ],
});
