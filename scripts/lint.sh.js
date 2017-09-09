const { exec, cd, set } = require('shelljs');
const { REPO_ROOT, SCRIPTS_DIR } = require('./constants');

// Abort script on error
set('-e');

cd(REPO_ROOT);
exec('tslint --project src/tsconfig.json --type-check --force');
exec(`eslint ${SCRIPTS_DIR}`);
