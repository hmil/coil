import { FlexItem } from 'cl/base/browser/ui/FlexLayout';
import { FlexLayout } from 'cl/base/browser/ui/FlexLayout';
import { foreach } from 'cl/base/browser/utils/jsx-helpers';
import { AppState } from 'cl/coil/redux/AppState';
import { audioEngine } from 'cl/platform/audio/AudioEngine';
import { DeleteTrackAction } from 'cl/platform/audio/AudioEngineActions';
import { IAudioTrackState } from 'cl/platform/audio/AudioTrack';
import { FileIOService } from 'cl/platform/file/FileIOService';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';

import { ControlsStyle, FullHeight, SequencerStyle, TracksStyle } from './Sequencer.less';
import { Track } from './Track';
import { TrackControls } from './TrackControls';

interface ISequencerStateProps {
    tracks: IAudioTrackState[];
}

interface ISequencerDispatchProps {
    importFile(file: File): Promise<void>;
    deleteTrack(trackId: string): void;
    playTrack(trackId: string): void;
    stopTrack(trackId: string): void;
}

export const Sequencer = connect(
    (state: AppState): ISequencerStateProps => ({
        tracks: state.audio.tracks.toArray()
    }),
    (dispatch: Redux.Dispatch<AppState>): ISequencerDispatchProps => ({
        async importFile(file: File) {
            FileIOService.importAudioFileToTrack(file);
        },
        deleteTrack(trackId: string) {
            dispatch(DeleteTrackAction.create(trackId));
        },
        playTrack(trackId: string) {
            audioEngine.trackStore.getAudioTrack(trackId).play();
        },
        stopTrack(trackId: string) {
            audioEngine.trackStore.getAudioTrack(trackId).pause();
        }
    }))(
    class extends React.Component<ISequencerStateProps & ISequencerDispatchProps, {}> {

        public render() {
            return (
                <div className={SequencerStyle} onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
                    <FlexLayout direction='row' className={FullHeight}>
                        <FlexItem flexGrow={1} className={FullHeight}>
                            <FlexLayout direction='column' className={TracksStyle}>
                                { foreach(this.props.tracks, track => (
                                    <Track
                                            track={track}
                                            key={track.id}
                                            onDelete={() => this.props.deleteTrack(track.id)}
                                    />
                                ))}
                            </FlexLayout>
                        </FlexItem>
                        <FlexItem flexGrow={0} className={ControlsStyle}>
                        { foreach(this.props.tracks, track => (
                            <TrackControls
                                    track={track}
                                    key={track.id}
                                    onPlay={() => this.props.playTrack(track.id)}
                                    onStop={() => this.props.stopTrack(track.id)} />
                        ))}
                        </FlexItem>
                    </FlexLayout>
                </div>
            );
        }

        private handleDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
            if (evt.dataTransfer.types.indexOf('Files') !== -1) {
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy';
            }
        }

        private handleDrop = (evt: React.DragEvent<HTMLDivElement>) => {
            console.log(evt.dataTransfer.files);
            evt.preventDefault();
            // If dropped items aren't files, reject them
            const dt = evt.dataTransfer;
            if (dt.items) {
                console.log('Using DataTransferItemList interface');
                // Use DataTransferItemList interface to access the file(s)
                for (let i = 0; i < dt.items.length; i++) {
                    if (dt.items[i].kind == 'file') {
                        const f = dt.items[i].getAsFile();
                        if (f != null) {
                            this.props.importFile(f);
                        }
                    }
                }
            } else {
                console.log('Using DataTransfer interface');
                // Use DataTransfer interface to access the file(s)
                for (let i = 0; i < dt.files.length; i++) {
                    console.log(`... file[${i}].name = ${dt.files[i].name}`);
                }
            }
        }
    }
);