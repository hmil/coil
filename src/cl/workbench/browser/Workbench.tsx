import * as React from 'react';

import { SideBar } from './SideBar';
import { ToDoActivity } from './ToDoActivity/ToDoActivity';
import { WorkbenchStyle } from './Workbench.less';

/**
 * Root of the workbench UI
 */
export class Workbench extends React.Component<{}, {}> {
    public render() {
        return (
            <div className={WorkbenchStyle}>
                <SideBar>
                    <ToDoActivity />
                </SideBar>
            </div>
        );
    }
}
