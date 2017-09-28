import { createStore } from 'redux';

import { appReducer } from './AppReducer';
import { AppState } from './AppState';

declare namespace window {
    const __REDUX_DEVTOOLS_EXTENSION__: any;
}

export const appStore = createStore<AppState>(
    appReducer,
    new AppState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

if (module.hot) {
    module.hot.accept('./AppReducer', () => {
          // tslint:disable-next-line:no-require-imports
          appStore.replaceReducer(require('./AppReducer').appReducer);
    });
}
