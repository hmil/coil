import { TrackStore } from './TrackStore';

/**
 * TODO: Transform this class into a module frontend.
 *
 * Force all API consumers to use this front-end for any state-related matter.
 * This module should implement HMR with state preservation.
 * This module should instanciate all singletons
 */
export class AudioEngine {
    public readonly context = new AudioContext();
    public readonly trackStore = new TrackStore(this.context);
}

export const audioEngine = new AudioEngine();

// TODO: HMR
// if (module.hot) {
//     module.hot.accept('./TrackStore', () => {
//           // tslint:disable-next-line:no-require-imports
//           workbenchStore.replaceReducer(require('./WorkbenchRootReducer').workbenchRootReducer);
//     });
// }
