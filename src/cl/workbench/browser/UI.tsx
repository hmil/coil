import { Workbench } from 'cl/workbench/browser/Workbench';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Redux from 'redux';

export class UI {

    private rootEl: HTMLElement;

    constructor() {
        const rootEl = document.getElementById('app');
        if (!rootEl) {
            throw new Error('Cannot get root element');
        }
        this.rootEl = rootEl;
    }

    public mount<T>(store: Redux.Store<T>): void {
        /**
         * If the UI is already mounted, react will be smart about it
         * and will only replace the DOM that has changed.
         */
        ReactDOM.render(
            <Provider store={store}>
                <Workbench></Workbench>
            </Provider>
            , this.rootEl
        );
    }

    public unmount(): void {
        ReactDOM.unmountComponentAtNode(this.rootEl);
    }
}

export const ui = new UI();

/*
 * This module is hot-reloadable. It may be executed multiple times
 * during the lifetime of the app in development and therefore it should
 * either be stateless or provide an easy way to migrate its state in between
 * hot reloads.
 */
if (module.hot) {
    module.hot.dispose(() => {
        ui.unmount();
    });
}
