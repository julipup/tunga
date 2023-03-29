import type { Configuration } from 'webpack';
import path from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [
    "style-loader",
    "css-loader",
    "postcss-loader"
  ],
});

rules.push(      {
  test: /\.(svelte)$/,
  use: 'svelte-loader'
});

rules.push({
  // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
  test: /node_modules\/svelte\/.*\.mjs$/,
  resolve: {
    fullySpecified: false
  }
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.mjs', '.svelte', '.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte']
  },
};
