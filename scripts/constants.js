const path = require('path');

const constants = module.exports = { };

/**
 * Directory containing the build tools.
 */
constants.SCRIPTS_DIR = __dirname;

/**
 * Root of the project
 */
constants.REPO_ROOT = path.join(__dirname, '..');

/**
 * Directory containing the built files.
 */
constants.DIST_DIR = path.join(constants.REPO_ROOT, 'dist');

/**
 * Directory containing the built files.
 */
constants.SRC_DIR = path.join(constants.REPO_ROOT, 'src');
