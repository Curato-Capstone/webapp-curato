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
            containers: path.join(ROOT_DIR, 'client', 'js', 'containers')

        }
    },

    output: {
        publicPath: "/",
        path: path.join(ROOT_DIR, 'build'),
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: path.join(ROOT_DIR, 'node_modules'),
                query: {
                    presets: ["es2015", "react", "stage-0"],
                    plugins: ["transform-decorators-legacy"],
                    "env": {
                        "development": {
                            "presets": ["react-hmre"]
                        }
                    }
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
}

