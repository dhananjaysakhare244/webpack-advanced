6. Default webpack configuration
   entry
   serves as entry point to the application. If we do not provide
   exact file name webpack will assume the file is index.js e.g './src' will be treated as './src/index.js'
   // the config for output
   output: {
   path: path.resolve(\_\_dirname, "dist"), // dist folder is default if not specified
   filename: "main.js", // main.js is default if not provided
   },
   mode: "production", // production is default if not provided

7. Just moved code around no info
8. different config for prod and dev builds
   we should have 2 different configuration for dev and prod env.
   Prod should be more optimized and minified.
   Dev should be more fast and easy to debug
   We can create 2 copies of our config file called webpack.prod.config.js and webpack.dev.config.js

   For now we have duplicate configuration for both our dev and prod config
   To avoid duplication we can create a common config file
   And we can import common config file in dev and prod
   `const common = require("./webpack.common.config");`

   then we need to merge the config and provide different configuration for dev and prod
   `const { merge } = require("webpack-merge");`

   module.exports = merge(common, {
   mode: "development",
   });

   Now after we rename our webpack files differently webpack.prod.config.js and we moved location of files the normal `npx webpack` command will not work
   we need to provide full path `npx webpack --config webpack/webpack.dev.config.js`
   Once you run dev and prod webpack then you will notice the build time is slow for prod and prod build is smaller and minified
   Dev builds are faster and has larger file size

9. Setting up Dev server
   Webpack dev server allows you to create hot module reload and we want to see changes directly in browser
   install webpack-dev-server package
   To run a dev server provide devServer option in webpack dev config
   `devServer:{
   port:9000,
   static:{
   directory:path.resolve(\_\_dirname,'..')
   }
   }

You need to tunr of liveReload to enable hot module replacement
live reload reloads the whole application and all the modules.
hot module replacement maintains the state of application and only replaces the files modules that are changed
You need to serve the app using webpack serve and add --hot key while running the npm command
