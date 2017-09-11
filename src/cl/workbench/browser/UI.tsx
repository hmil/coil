import { Workbench } from 'cl/workbench/browser/Workbench';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { workbenchStore } from '../common/WorkbenchStore';

const rootEl = document.getElementById('app');
if (!rootEl) {
    throw new Error('Cannot get root element');
}

/**
 * If the UI is already mounted, react will be smart about it
 * and will only replace the DOM that has changed.
 */
ReactDOM.render(
    <Provider store={workbenchStore}>
        <Workbench></Workbench>
    </Provider>
    , rootEl
);

/*
 * This module is hot-reloadable. It may be executed multiple times
 * during the lifetime of the app in development and therefore it should
 * either be stateless or provide an easy way to migrate its state in between
 * hot reloads.
 */
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        ReactDOM.unmountComponentAtNode(rootEl);
    });
}
