const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = (env) => ({
  entry : ['babel-polyfill',  './src/index.js'],
  output : {
    path : path.resolve(__dirname , 'dist'),
    filename: 'index_bundle.js',
    publicPath: './'
  },
  module : {
    rules : [
      {
        test : /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test : /\.css$/, use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      },
      {
        test: /\.svg/,
        loader: 'svg-url-loader'
      }
    ]
  },
  mode: env.NODE_ENV,
  devtool: 'eval-source-map',
  plugins : [
    new HtmlWebpackPlugin ({
      template : 'src/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
    host: 'brev.kraftbank.no'
  }
});
