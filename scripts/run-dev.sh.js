const { exec, env, set } = require('shelljs');
const { SCRIPTS_DIR } = require('./constants');

// Abort script on error
set('-e');

env['NODE_ENV'] = 'development';

// Start the dev server in background
exec('webpack-dev-server --config scripts/webpack-browser.config.js', { async: true });

// The electron-main part is compiled on disk
exec(`node_modules/.bin/webpack --config "${SCRIPTS_DIR}/webpack-electron.config.js"`);
// Hopefully by the time the electron scripts compiled, the dev server is up and running
// and so we won't have to refresh the page in electron.
exec('node_modules/.bin/electron .', { async: true });
