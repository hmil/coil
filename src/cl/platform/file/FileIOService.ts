import { audioEngine } from 'cl/platform/audio/AudioEngine';

export class FileIOService {

    public static async importAudioFileToTrack(file: File): Promise<string> {
        // TODO: might need to wrap filereader API in service to make it TS-and-Promise friendly.
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        const buff = await new Promise<ArrayBuffer>(resolve => {
            reader.onload = () => {
                resolve(reader.result as ArrayBuffer);
            };
        });
        return await audioEngine.trackStore.createAudioTrack(buff);
    }
}
