import * as React from 'react';
import { SideBarStyle } from './SideBar.less';

export class SideBar extends React.Component<{}, {}> {
    public render() {
        return <div className={SideBarStyle}>
            { this.props.children }
        </div>;
    }
}
