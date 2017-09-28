import { FlexItem } from 'cl/base/browser/ui/FlexLayout';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ContainerStyle, SideBarStyle, SplitterStyle } from './SideBar.less';

interface ISideBarState {
    width: number;
    startDragWidth: number;
    startDragX: number;
    isDragging: boolean;
}

export class SideBar extends React.Component<{}, ISideBarState> {

    state = {
        width: 300,
        startDragWidth: 0,
        startDragX: 0,
        isDragging: false,
    };

    public render() {
        return (
            <FlexItem className={ContainerStyle} style={{maxWidth: this.state.width + 'px'}}>
                <div style={{width: this.state.width + 'px'}} className={SideBarStyle}>
                    { this.props.children }
                </div>
                <div className={SplitterStyle} onMouseDown={this.handleSplitterMouseDown}/>
            </FlexItem>
        );
    }

    private handleSplitterMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.setState({
            startDragX: evt.clientX,
            startDragWidth: this.state.width,
            isDragging: true
        });

        const thisNode = ReactDOM.findDOMNode(this);

        thisNode.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
        thisNode.ownerDocument.addEventListener('mouseup', this.handleMouseUp);

    }

    private changeWidth(width: number) {
        width = Math.min(500, Math.max(100, width));
        this.setState({
            width
        });
    }

    private handleMouseMove = (evt: MouseEvent) => {
        if (this.state.isDragging) {
            this.changeWidth(this.state.startDragWidth + evt.clientX - this.state.startDragX);
        }
    }

    private handleMouseUp = (evt: MouseEvent) => {
        const thisNode = ReactDOM.findDOMNode(this);
        thisNode.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
        thisNode.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);

        if (this.state.isDragging) {
            this.changeWidth(this.state.startDragWidth + evt.clientX - this.state.startDragX);
            this.setState({
                isDragging: false
            });
        }
    }
}
