/* eslint-env node */
const {merge} = require('webpack-merge'),
CopyPlugin = require('copy-webpack-plugin'),
// BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
// webpackEnv = require('dotenv-webpack'),
path = require("path"),
TerserPlugin = require("terser-webpack-plugin"),
webpack = require("webpack"),
root = path.resolve(__dirname, ".."),
brws = process.env.NODE_ENV,
plugins = [
  new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(root,`src/manifest/${brws}.json`),
        to: path.resolve(root,`tests/${brws}/manifest.json`),
        transform(content) {
          const { version, description, author, homepage: homepage_url } = require('../package.json')
          const manifest = JSON.parse(content)
          return JSON.stringify(
            Object.assign(manifest, { version, description, author, homepage_url }),
          )
        },
      },
      {
        from: path.resolve(root, "src/html"),
        to: path.resolve(root,`tests/${brws}`),
      },
      {
        from: path.resolve(root, "tests/compiled"),
        to: path.resolve(root,`tests/${brws}/css`),
      },
      {
        from: path.resolve(root, "src/img"),
        to: path.resolve(root, `tests/${brws}/img`),
      },
      {
        from: path.resolve(root, "src/web_accessible_resources"),
        to: path.resolve(root, `tests/${brws}/web_accessible_resources`),
      },
      {
        from: path.resolve(root, "src/js/options.js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
      {
        from: path.resolve(root, "src/js/webext.js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
      {
        from: path.resolve(root, "src/js/magicph.js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
      {
        from: path.resolve(root, "src/js/querySelector.js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
      {
        from: path.resolve(root, "src/js/block-traffic.js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
      {
        from: path.resolve(root, "src/js/networkPlayer.js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
      {
        from: path.resolve(root, "src/js/api.js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
      {
        from: path.resolve(root, "src/js/injector.js"),
        to: path.resolve(root,`tests/${brws}/js`),
      },
    ],
  }),
  // new webpackEnv(),
],
commonConfig = {
  context: path.resolve(root, "src"),
  entry: {
    start: "./js/start.js",
    header: "./js/header.js",
    favorites: "./js/favorites.js",
  },
  output: {
    path: path.resolve(root,`tests/${brws}/js`),
    filename: "[name].js",
  },
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
          options: {
            // This makes swc-loader invoke swc synchronously.
            sync: true,
            jsc: {
              parser: {
                syntax: "ecmascript"
              },
              target: "es2020",
            },
            module: {
              type: "es6",
            },
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    fallback: { "path": require.resolve("path-browserify") }
  },
  plugins,
  experiments: {topLevelAwait: true,},
},
productionConfig = {
  mode: "production",
  devtool: "inline-source-map",
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
},
developmentConfig = {
  mode: "development",
  devtool: "source-map",
  optimization: {
    minimize: false,
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
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/,
  },
};

// function log(...message) {
//   console.log('[Webpack] ', ...message);
// };

// let analyzer = process.env.ANALYSE !== undefined;

// if(analyzer) {
//   plugins.push(new BundleAnalyzerPlugin())
//   console.log(`BundleAnalyzerPlugin added`)
// }

module.exports = (env,args) => {
  // log(env)
  // log("Mode: " + args.mode);
  switch(args.mode) {
    case 'development':
      return merge(commonConfig, developmentConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};