import { IAudioTrackState } from 'cl/platform/audio/AudioTrack';
import * as React from 'react';

import { TrackStyle } from './Track.less';

interface ITrackProps {
    track: IAudioTrackState;
    onDelete: () => void;
}

export class Track extends React.Component<ITrackProps, {}> {
    render() {
        return <div
                className={TrackStyle}
                onKeyPress={this.keyPressHandler}
                tabIndex={0}>
            Track
        </div>;
    }

    private keyPressHandler = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        switch (evt.key) {
            case 'Backspace':
            case 'Delete':
                return this.props.onDelete();
        }
    }
}