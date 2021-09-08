const webpack = require("webpack"),
  path = require("path"),
  root = path.resolve(__dirname, ".."),
  config = {
    mode: "development",
    devtool: "source-map",
    context: path.resolve(root, "src"),
    entry: {
      magicinject: "./magicinject.js",
      magicph: "./magicph.js",
      options: "./options.js",
    },
    output: {
      path: path.resolve(root, "dist/js"),
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js"],
    },
    // optimization: {
    //   removeAvailableModules: false,
    //   removeEmptyChunks: true,
    //   mergeDuplicateChunks: true,
    //   splitChunks: false,
    // },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
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
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader", // translates CSS into CommonJS
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
                sourceMap: true,
              },
            },
          ],
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
    ],
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/,
    },
  };

module.exports = (env, argv) => {
  //(argv.mode === "development") ? ((config.mode = "development")) : false;
  (argv.mode === "production") ? ((config.mode = "production")) : false;
  console.log(config.mode);
  return config;
};
