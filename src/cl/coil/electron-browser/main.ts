import { UI, ui } from 'cl/workbench/browser/UI';

import { appStore } from 'cl/coil/redux/AppStore';

/* Browser entry point */

function start(ui: UI) {
    ui.mount(appStore);
}

start(ui);

if (module.hot) {
    module.hot.accept('cl/workbench/browser/UI', () => {
          // tslint:disable-next-line:no-require-imports
          start(require('cl/workbench/browser/UI').ui);
    });
}
