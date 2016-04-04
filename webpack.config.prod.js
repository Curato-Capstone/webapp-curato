var path = require('path');
var webpack = require('webpack');
var ROOT_DIR = __dirname;

module.exports = {
    context: ROOT_DIR,

    entry: [
        'webpack-hot-middleware/client',
        path.resolve(ROOT_DIR, 'client', 'js', 'index.js')
    ],

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            react: path.join(ROOT_DIR, 'node_modules', 'react'),
            components: path.join(ROOT_DIR, 'client', 'js', 'components'),
            containers: path.join(ROOT_DIR, 'client', 'js', 'containers'),
            flux: path.join(ROOT_DIR, 'client', 'js', 'redux'),
            js: path.join(ROOT_DIR, 'client', 'js')
        }
    },

    output: {
        path: path.join(ROOT_DIR,'build'),
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: path.join(ROOT_DIR, 'node_modules'),
                query: {
                    "presets": ["es2015", "react", "stage-1"],
                }
            },

            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|otf|pdf)$/,
                loader: 'url-loader?limit=10000'
            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
