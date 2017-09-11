
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const REPO_ROOT = path.join(__dirname, '..');

const isDev = process.env.NODE_ENV === 'development';

const DEV_PLUGINS = [
    new webpack.HotModuleReplacementPlugin({
        // Compute HMR chunks first
        multiStep: true
    }),
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    })
];

const PROD_PLUGINS = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
];

const SHARED_PLUGINS = [ ];

module.exports = {

    context: path.join(REPO_ROOT, 'src'),

    entry: {
        'browser-main': [
            './cl/coil/electron-browser/main.ts'
        ]
    },

    output: {
        filename: '[name].js',
        path: path.resolve(REPO_ROOT, 'dist'),
        publicPath: '/src'
    },

    devServer: {
        compress: true,
        port: 9000,
        hot: true,
        allowedHosts: ['localhost']
    },

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.less'],
        modules: ['node_modules', 'src']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    // Add the loader for .ts files.
    module: {
        rules: [{
            include: path.join(REPO_ROOT, '.'),
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    },
                },
            ]
        }, {
            test: /\.(less)$/,
            use: [ 
                'style-loader',
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        less: true
                    }
                },
                {
                    loader: 'less-loader', 
                    options: {
                        paths: [
                            path.resolve(REPO_ROOT, 'node_modules'),
                            path.resolve(REPO_ROOT, 'src'),
                        ]
                    }
                }
            ]
        }]
    },

    plugins: SHARED_PLUGINS.concat(isDev ? DEV_PLUGINS : PROD_PLUGINS),
};
