import { ActionHandler, makeReducer } from 'cl/base/common/redux/Reducer';
import { AddTrackAction, AudioTrackStateUpdate, DeleteTrackAction } from './AudioEngineActions';
import { AudioEngineState } from './AudioEngineState';

export const audioEngineReducer = makeReducer<AudioEngineState>([

    new ActionHandler(DeleteTrackAction, (s, action) => (
        s.withTracks(s.tracks.remove(action.payload.id))
    )),

    new ActionHandler(AddTrackAction, (s, action) => (
        s.withTracks(s.tracks.set(
            action.payload.id,
            action.payload))
    )),

    new ActionHandler(AudioTrackStateUpdate, (s, action) => (
        s.withTracks(s.tracks.set(
            action.payload.id,
            s.tracks.get(action.payload.id)))
    )),

    new ActionHandler(AudioTrackStateUpdate, (s, action) => (
        s.withTracks(s.tracks.set(
            action.payload.id,
            action.payload
        ))
    ))
]);
