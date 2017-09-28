import { Map } from 'immutable';

import { IAudioTrackState } from './AudioTrack';

export class AudioEngineState {
    constructor(
            public readonly tracks: Map<string, IAudioTrackState> = Map()) {
    }

    public withTracks(tracks: Map<string, IAudioTrackState>): AudioEngineState {
        return new AudioEngineState(tracks);
    }
}