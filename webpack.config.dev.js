var path = require('path');
var webpack = require('webpack');
var ROOT_DIR = __dirname;

module.exports = {
    context: ROOT_DIR,

    entry: [
        'webpack-hot-middleware/client',
        path.resolve(ROOT_DIR, 'client', 'js', 'index.js')
    ],

    // devtool: 'source-map',

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            components: path.join(ROOT_DIR, 'client', 'js', 'components'),
            containers: path.join(ROOT_DIR, 'client', 'js', 'containers'),
            routes: path.join(ROOT_DIR, 'client', 'js', 'containers', 'routes'),
            reusable: path.join(ROOT_DIR, 'client', 'js', 'components', 'Reusable'),
            modules: path.join(ROOT_DIR, 'client', 'js', 'modules'),
            utils: path.join(ROOT_DIR, 'client', 'js', 'utils'),
            flow: path.join(ROOT_DIR, 'flow'),
            images: path.join(ROOT_DIR, 'client', 'images'),
            stylesheets: path.join(ROOT_DIR, 'client', 'stylesheets'),
        }
    },

    output: {
        publicPath: '/',
        path: path.join(ROOT_DIR, 'build'),
        filename: 'bundle.js'
    },

    plugins: [
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
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: ['transform-decorators-legacy'],
                    env: {
                        development: {
                            presets: ['react-hmre']
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
                loader: 'style-loader!css-loader'
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
