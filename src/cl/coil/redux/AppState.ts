import { AudioEngineState } from 'cl/platform/audio/AudioEngineState';
import { WorkbenchState } from 'cl/workbench/common/IWorkbenchState';

// TODO: move to platform
export class AppState {
    constructor(
            public readonly workbench: WorkbenchState = new WorkbenchState(),
            public readonly audio: AudioEngineState = new AudioEngineState()) {}

    public withWorkbench(workbench: WorkbenchState): AppState {
        return new AppState(workbench, this.audio);
    }

    public withAudio(audio: AudioEngineState): AppState {
        return new AppState(this.workbench, audio);
    }
}