const { ROOT, path } = require('./webpack.constant');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { version } = require(path.join(ROOT, '/package.json'));

module.exports = {
  entry: path.join(ROOT, 'src/index.tsx'),
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsConfigPathsPlugin({ configFile: path.join(ROOT, 'tsconfig.json') })]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.svg/,
        type: 'asset/inline'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BRAND_APP_NAME': JSON.stringify(process.env.BRAND_APP_NAME),
      'process.env.BRAND_APP_LOGO': JSON.stringify(process.env.BRAND_APP_LOGO || ''),
      'process.env.APP_VERSION': JSON.stringify(process.env.APP_VERSION) || version,
      'process.env.COLLECTOR_URL': JSON.stringify(process.env.COLLECTOR_URL || '')
    }),
    new HtmlWebpackPlugin({
      template: path.join(ROOT, '/public/index.html')
    })
  ]
};
