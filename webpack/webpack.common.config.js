const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const config = {
  // serves as entry point to the application. If we do not provide
  // exact file name webpack will assume the file is index.js e.g './src' will be treated as './src/index.js'
  entry: "./src/js/index.js",
  // the config for output
  output: {
    path: path.resolve(__dirname, "../dist"), // dist folder is default if not specified
    //clean property cleans the dist folder and deletes old bundle files.
    // it accepts 2 values 1 is boolean or an object with different props dry and keep. dry will notify us instead of deleting it will list
    // keep will not delete the files specified.
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/template.html",
    }),
    // commented it out because clean true is enough. But for bigger app this should be configured as clean true has some bugs
    // new CleanWebpackPlugin({
    //   cleanOnceBeforeBuildPatterns: [
    //     "**/*", // this is the default config that will delete current dist folder
    //     path.join(process.cwd(), "build/**/*"), // if you want to delete some more folders outside of webpack you can configure it here
    //   ],
    // }),
  ],
};

module.exports = config;
