import { fileURLToPath, URL } from 'url';

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  context: fileURLToPath(new URL('.', import.meta.url)),
  entry: './src/main.ts',
  output: {
    path: fileURLToPath(new URL('./dist', import.meta.url)),
    filename: 'main.cjs'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'config', to: 'config' }]
    })
  ],
  externals: [nodeExternals()],
  mode: 'production'
};
