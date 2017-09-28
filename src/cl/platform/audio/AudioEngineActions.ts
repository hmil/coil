import { ActionFactory } from 'cl/base/common/redux/Action';

import { AudioTrack, IAudioTrackState } from './AudioTrack';

export class AudioTrackStateUpdate extends ActionFactory<IAudioTrackState> {
    static create(t: AudioTrack): AudioTrackStateUpdate {
        return this._create({
            payload: t.getState()
        });
    }
}

export class DeleteTrackAction extends ActionFactory<{id: string}> {
    static create(id: string): DeleteTrackAction {
        return this._create({
            payload: { id }
        });
    }
}

export class AddTrackAction extends ActionFactory<IAudioTrackState> {
    static create(track: AudioTrack): AddTrackAction {
        return this._create({
            payload: track.getState()
        });
    }
}