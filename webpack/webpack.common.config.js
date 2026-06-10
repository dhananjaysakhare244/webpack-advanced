const path = require("path");

const config = {
  // serves as entry point to the application. If we do not provide
  // exact file name webpack will assume the file is index.js e.g './src' will be treated as './src/index.js'
  entry: "./src/js/index.js",
  // the config for output
  output: {
    path: path.resolve(__dirname, "../dist"), // dist folder is default if not specified
    filename: "main.js", // main.js is default if not provided
  },
};

module.exports = config;
