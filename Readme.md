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
