var path = require('path');
var webpack = require('webpack');
var ROOT_DIR = __dirname;

module.exports = {
    context: ROOT_DIR,

    entry: [
        path.resolve(ROOT_DIR, 'client', 'js', 'index.js')
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.es6.js'],
        alias : {
            react: path.join(__dirname, 'node_modules', 'react'),
            classes: path.join(ROOT_DIR, 'client', 'js', 'classes'),
            components: path.join(ROOT_DIR, 'universal', 'components'),
            containers: path.join(ROOT_DIR, 'universal', 'containers'),
            flux: path.join(ROOT_DIR, 'universal', 'redux'),
            js: path.join(ROOT_DIR, 'client', 'js'),
            universal: path.join(ROOT_DIR, 'universal')
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
                    "presets": ["es2015", "react", "stage-0"],
                }
            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
        ]
    }
};
