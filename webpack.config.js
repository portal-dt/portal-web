const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : ['babel-polyfill',  './src/index.js'],
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
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
                test : /\.css$/, use:['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
            }
        ]
    },
    mode:'development',
    devtool: 'eval-source-map',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'src/index.html'
        })
    ]
};
