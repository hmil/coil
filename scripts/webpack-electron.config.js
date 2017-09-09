const path = require('path');
const nodeExternals = require('webpack-node-externals');

const REPO_ROOT = path.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';

const DEV_PLUGINS = [ ];
const PROD_PLUGINS = [ ];
const SHARED_PLUGINS = [ ];

module.exports = {

    context: path.join(REPO_ROOT, 'src'),

    entry: {
        'electron-main': [
            './cl/coil/electron-main/main.ts'
        ]
    },

    output: {
        filename: '[name].js',
        path: path.resolve(REPO_ROOT, 'dist'),
    },

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [ 'node_modules', 'src' ]
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        rules: [{
            include: path.join(REPO_ROOT, '.'),
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader'
                },
            ]
        }]
    },

    node: {
        __dirname: false // Use __dirname from node API at runtime
    },

    target: 'node',
    externals: [nodeExternals()],

    plugins: SHARED_PLUGINS.concat(isDev ? DEV_PLUGINS : PROD_PLUGINS),
};
