import * as uuid from 'uuid/v1';
import { AddTrackAction } from './AudioEngineActions';

import { appStore } from 'cl/coil/redux/AppStore';
import { AudioTrack } from './AudioTrack';

export class TrackStore {

    constructor(
            private context: AudioContext,
            private tracks: { [key: string]: AudioTrack | undefined } = {}) {}

    public async createAudioTrack(data: ArrayBuffer): Promise<string> {
        const buffer = await this.context.decodeAudioData(data);
        const id = uuid();
        const track = this.tracks[id] = new AudioTrack(id, buffer, this.context);
        appStore.dispatch(AddTrackAction.create(track));
        return id;
    }

    public getAudioTrack(id: string): AudioTrack {
        const track = this.tracks[id];
        if (track === undefined) {
            throw new Error(`Track not found: ${id}`);
        }
        return track;
    }
}
