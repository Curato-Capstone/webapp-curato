var path = require('path');
var webpack = require('webpack');
var ROOT_DIR = __dirname;

module.exports = {
    context: ROOT_DIR,

    // devtool: 'source-map',

    entry: path.resolve(ROOT_DIR, 'client', 'js', 'index.js'),

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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false,
            sourceMap: false
        })
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
