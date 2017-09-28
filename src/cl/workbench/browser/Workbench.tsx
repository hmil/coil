import * as React from 'react';

import { FlexItem, FlexLayout } from 'cl/base/browser/ui/FlexLayout';
import { Sequencer } from './Sequencer/Sequencer';
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
                <FlexLayout style={{height: '100%'}}>
                    <SideBar>
                        <ToDoActivity />
                    </SideBar>
                    <FlexItem>
                        <Sequencer />
                    </FlexItem>
                </FlexLayout>
            </div>
        );
    }
}
