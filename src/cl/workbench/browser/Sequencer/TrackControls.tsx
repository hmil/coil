import { Button } from 'cl/base/browser/ui/Button';
import * as React from 'react';

import { IAudioTrackState } from 'cl/platform/audio/AudioTrack';
import { TrackControlsStyle } from './TrackControls.less';

interface ITrackControlsProps {
    track: IAudioTrackState;
    onPlay: () => void;
    onStop: () => void;
}

export class TrackControls extends React.Component<ITrackControlsProps, {}> {
    render() {
        return <div className={TrackControlsStyle}>
            <Button onClick={this.handlePlayClick}>{
                (this.props.track.isPlaying) ? 'Stop' : 'Play'
            }</Button>
        </div>;
    }

    private handlePlayClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        if (this.props.track.isPlaying) {
            this.props.onStop();
        } else {
            this.props.onPlay();
        }
    }
}