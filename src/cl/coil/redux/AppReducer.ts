import { makeReducer, PartialReducer } from 'cl/base/common/redux/Reducer';
import { audioEngineReducer } from 'cl/platform/audio/AudioEngineReducer';
import { workbenchRootReducer } from 'cl/workbench/common/WorkbenchRootReducer';

import { AppState } from './AppState';

/*
 * This module is hot-reloadable. It may be executed multiple times
 * during the lifetime of the app in development and therefore it should
 * either be stateless or provide an easy way to migrate its state in between
 * hot reloads.
 */

export const appReducer = makeReducer<AppState>([
    new PartialReducer(
        (sb) => sb.workbench,
        (sb, sr) => sb.withWorkbench(sr),
        workbenchRootReducer),
    new PartialReducer(
        (sb) => sb.audio,
        (sb, sr) => sb.withAudio(sr),
        audioEngineReducer)
]);
