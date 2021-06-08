const path = require("path"),
  config = {
    mode: "development",
    devtool: "eval-source-map",
    entry: {
      magicph: path.join(__dirname, "./src/magicph.js"),
      magicinject: path.join(__dirname, "./src/magicinject.js"),
      sync: path.join(__dirname, "./src/sync.js"),
    },
    resolve: {
      extensions: [".js"],
    },
    output: {
      path: path.resolve(__dirname, "./dist/js"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    watch: true,
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/,
    }
  };

module.exports = config;
