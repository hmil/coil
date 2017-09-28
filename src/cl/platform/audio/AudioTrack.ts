import { appStore } from 'cl/coil/redux/AppStore';
import { AudioTrackStateUpdate } from './AudioEngineActions';
import { AudioSample } from './AudioSample';

export interface IAudioTrackState {
    readonly id: string;
    readonly isPlaying: boolean;
}

/**
 * Design considerations:
 *
 * - Must not expose the native AudioNode
 * - Must be playable, pausable, stoppable and resumable
 * - Must dispatch actions to the store every time something happens such that the state in the
 *   store reflects the current track status (playing, stopped, paused, seek_position)
 * - The seek position is only to be updated when an event occurs (playing, stopping, ...)
 * - The store used for dispatching actions must be a fresh copy obtained from an external provider.
 * - The Action definitions must be located near this file on the filesystem.
 * - The Reducers for these actions must be located near this file on the filesystem.
 * - A subset of the state definition must be defined near the Actions and Reducers
 */
export class AudioTrack {

    private sample: AudioSample;

    constructor(
            public readonly id: string,
            buffer: AudioBuffer,
            context: AudioContext) {
        this.sample = new AudioSample(context, context.destination, buffer);
        this.sample.onEnded = () => {
            appStore.dispatch(AudioTrackStateUpdate.create(this));
        };
    }

    public getState(): IAudioTrackState {
        return {
            id: this.id,
            isPlaying: this.sample.isPlaying
        };
    }

    public play(): void {
        this.sample.resume();
        appStore.dispatch(AudioTrackStateUpdate.create(this));
    }

    public pause(): void {
        this.sample.pause();
        appStore.dispatch(AudioTrackStateUpdate.create(this));
    }

    public stop(): void {
        this.sample.stop();
        appStore.dispatch(AudioTrackStateUpdate.create(this));
    }
}
