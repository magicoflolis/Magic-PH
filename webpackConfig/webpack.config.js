const webpack = require("webpack"),
  CopyPlugin = require('copy-webpack-plugin'),
  path = require("path"),
  root = path.resolve(__dirname, ".."),
  config = {
    mode: "development",
    devtool: "source-map",
    context: path.resolve(root, "src"),
    entry: {
      magicinject: "./js/magicinject.js",
      magicph: "./js/magicph.js",
      options: "./js/options.js",
      player: "./js/player.js",
      // cors: "./js/cors-server.js",
    },
    output: {
      path: path.resolve(root, "dist/js"),
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js"],
    },
    module: {
      rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env",
                  {
                    modules: false,
                    targets: {
                      esmodules: true,
                    },
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
      ],
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(root, "src/firefox_manifest.json"),
            to: path.resolve(root, "dist/manifest.json"),
          },
          {
            from: path.resolve(root, "src/background.html"),
            to: path.resolve(root, "dist/background.html"),
          },
          {
            from: path.resolve(root, "src/options.html"),
            to: path.resolve(root, "dist/options.html"),
          },
        ],
      }),
    ],
    experiments: {
      topLevelAwait: true,
    },
    // optimization: {
    //   removeAvailableModules: false,
    //   removeEmptyChunks: true,
    //   mergeDuplicateChunks: true,
    //   splitChunks: false,
    // },
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/,
    },
  };
module.exports = (env, argv) => {
  //(argv.mode === "development") ? ((config.mode = "development")) : false;
  (argv.mode === "production") ? (config.mode = "production", config.devtool = "source-map") : false;
  console.log(config.mode);
  return config;
};