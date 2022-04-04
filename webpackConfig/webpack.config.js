/* eslint-env node */
const {merge} = require('webpack-merge'),
BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
CopyPlugin = require('copy-webpack-plugin'),
Dotenv = require('dotenv-webpack'),
path = require("path"),
TerserPlugin = require("terser-webpack-plugin"),
webpack = require("webpack"),
root = path.resolve(__dirname, ".."),
plugins = [
  new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(root, "src/manifest/firefox.json"),
        to: path.resolve(root, "dist/manifest.json"),
        transform(content) {
          const { version, description, author, homepage: homepage_url } = require('../package.json')
          const manifest = JSON.parse(content)
          return JSON.stringify(
            Object.assign(manifest, { version, description, author, homepage_url }),
          )
        },
      },
      {
        from: path.resolve(root, "src/js/options.js"),
        to: path.resolve(root, "dist/js/options.js"),
        info: { minimized: true },
      },
      // {
      //   from: path.resolve(root, "src/js/injector.js"),
      //   to: path.resolve(root, "dist/js/injector.js"),
      //   info: { minimized: true },
      // },
      {
        from: path.resolve(root, "src/img"),
        to: path.resolve(root, "dist/img"),
      },
      {
        from: path.resolve(root, "src/web_accessible_resources"),
        to: path.resolve(root, "dist/web_accessible_resources"),
      },
    ],
  }),
  new Dotenv(),
],
commonConfig = {
  context: path.resolve(root, "src"),
  entry: {
    start: "./js/start.js",
    background: "./js/background.js",
    favorites: "./js/favorites.js",
    injector: "./js/injector.js",
    magicph: "./js/magicph.js",
    player: "./js/player.js",
  },
  output: {
    path: path.resolve(root, "dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  resolve: { extensions: [".js"] },
  optimization: {
    minimize: true,
    minimizer: [
    new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
      parallel: true,
    })],
  },
  plugins,
  experiments: {topLevelAwait: true,},
},
productionConfig = {
  mode: "production",
  devtool: "inline-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(root, "src/html/background.html"),
          to: path.resolve(root, "dist"),
        },
        {
          from: path.resolve(root, "src/html/options.html"),
          to: path.resolve(root, "dist"),
        },
        {
          from: path.resolve(root, "src/html/favorites.html"),
          to: path.resolve(root, "dist"),
        },
        {
          from: path.resolve(root, "src/html/popup.html"),
          to: path.resolve(root, "dist"),
        },
      ],
    }),
  ],
},
developmentConfig = {
  mode: "development",
  devtool: "source-map",
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(root, "src/html"),
          to: path.resolve(root, "dist"),
        },
      ],
    }),
  ],
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/,
  },
},
analyse = process.env.ANALYSE !== undefined;

if (analyse) {
  plugins.push(new BundleAnalyzerPlugin())
  console.log(`BundleAnalyzerPlugin added`)
}

module.exports = (env, args) => {
  switch(args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};