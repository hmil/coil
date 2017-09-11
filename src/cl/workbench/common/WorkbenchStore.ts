import { createStore } from 'redux';

import { IWorkbenchState } from './IWorkbenchState';
import { workbenchRootReducer } from './WorkbenchRootReducer';

export const workbenchStore = createStore<IWorkbenchState>(workbenchRootReducer, new IWorkbenchState());

/*
 * This module is hot-reloadable. It may be executed multiple times
 * during the lifetime of the app in development and therefore it should
 * either be stateless or provide an easy way to migrate its state in between
 * hot reloads.
 */
if (module.hot) {
    module.hot.accept('./WorkbenchRootReducer', () => {
          // tslint:disable-next-line:no-require-imports
          workbenchStore.replaceReducer(require('./WorkbenchRootReducer').workbenchRootReducer);
    });
}