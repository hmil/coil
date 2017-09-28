
/**
 * Simple wrapper around AudioBufferSourceNode to make it easier to work with.
 *
 * Its state is defined by the status (playing / stopped) and seekTime.
 * The state **CANNOT CHANGE** unless a user action happens or the onEnded event fires.
 * Any change of the state not fullfilling those conditions is a bug.
 */
export class AudioSample {

    private node: AudioBufferSourceNode | null = null;

    private seekTime: number = 0;

    private playing: boolean = false;

    private startTime: number = 0;

    public onEnded: ((sample: AudioSample) => void) | undefined;

    constructor(
            private context: AudioContext,
            private destination: AudioNode,
            private buffer: AudioBuffer) {}

    public seek(time: number): void {
        this.seekTime = time;
        if (this.node && this.playing) {
            this.resume();
        }
    }

    public start(): void {
        this.seekTime = 0;
        this.resume();
        this.startTime = this.context.currentTime;
    }

    public stop(): void {
        if (this.node && this.playing) {
            this.node.stop();
            this.node = null;
            this.playing = false;
            this.seekTime = 0;
            if (this.onEnded) {
                this.onEnded(this);
            }
        }
    }

    public pause(): void {
        this.stop();
        this.seekTime = this.context.currentTime - this.startTime;
    }

    public resume(): void {
        this.node = this.context.createBufferSource();
        this.node.buffer = this.buffer;
        this.node.onended = () => this.stop();
        this.node.connect(this.destination);
        this.node.start(0, this.seekTime);
        this.playing = true;
    }

    public get isPlaying(): boolean {
        return this.playing;
    }
}
