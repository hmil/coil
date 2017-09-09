const { cd, cp, exec, mkdir, echo, set } = require('shelljs');
const path = require('path');
const { REPO_ROOT, DIST_DIR, SCRIPTS_DIR } = require('./constants');

// Abort script on error
set('-e');


cd(path.join(REPO_ROOT));

echo('Cleaning dist folder');
exec('npm run clean');
mkdir(DIST_DIR);

echo('Copying static assets');
cp('src/index.html', `${DIST_DIR}/`);

echo('Building typescript bundles');
exec(`node_modules/.bin/webpack --config "${SCRIPTS_DIR}/webpack-browser.config.js"`);
exec(`node_modules/.bin/webpack --config "${SCRIPTS_DIR}/webpack-electron.config.js"`);
