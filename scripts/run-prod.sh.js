const { exec, env, set } = require('shelljs');

// Abort script on error
set('-e');

env['NODE_ENV'] = 'production';

exec('npm run build');
exec('electron .');
