const { rm, set } = require('shelljs');
const { DIST_DIR, SRC_DIR } = require('./constants');

// Abort script on error
set('-e');

rm('-rf', DIST_DIR);
rm('-rf', `${SRC_DIR}/**/*.less.d.ts`);
