const path = require( 'path' );
const webpack = require( 'webpack' );
// const lodash = require( 'lodash' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new ExtractTextPlugin( {
  filename: '../style.css',
} );
const editBlocksCSSPlugin = new ExtractTextPlugin( {
  filename: '../blocks.editor.css',
} );

const editBlocksPostsCSSPlugin = new ExtractTextPlugin( {
  filename: '../blocks-posts.editor.css',
} );

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [ require( 'autoprefixer' ) ],
      },
    },
    {
      loader: 'sass-loader',
      query: {
        outputStyle:
          'production' === process.env.NODE_ENV ? 'expanded' : 'nested',
      },
    }
  ],
};


module.exports = {
  entry: {
    './assets/js/editor.blocks' : './blocks/index.js',
    './assets/js/post-editor.blocks' : './blocks/index-post.js',
    './assets/js/main' : './front-end.js'
  },
  output: {
    path: path.resolve( __dirname ),
    filename: '[name].js',
  },
  watch: 'production' !== process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  externals: {
    lodash: {
      commonjs: 'lodash',
      amd: 'lodash',
      root: 'lodash', // indicates global variable
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /style\.s?css$/,
        use: blocksCSSPlugin.extract( extractConfig ),
      },
      {
        test: /editor\.s?css$/,
        use: editBlocksCSSPlugin.extract( extractConfig ),
      },
      {
        test: /editor-posts\.s?css$/,
        use: editBlocksPostsCSSPlugin.extract( extractConfig ),
      },
    ],
  },
  plugins: [
    blocksCSSPlugin,
    editBlocksCSSPlugin,
    editBlocksPostsCSSPlugin
  ],
};