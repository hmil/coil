import { Button } from 'cl/base/browser/ui/Button';
import { FlexItem, FlexLayout } from 'cl/base/browser/ui/FlexLayout';
import { TextArea } from 'cl/base/browser/ui/TextArea';
import { foreach } from 'cl/base/browser/utils/jsx-helpers';
import { AppState } from 'cl/coil/redux/AppState';
import { TodoItem } from 'cl/workbench/common/IWorkbenchState';
import {
    CheckToDoAction,
    CreateToDoAction,
    RemoveAllCheckedToDosAction,
    RemoveToDoAction,
    UpdatePendingToDoTextAction,
} from 'cl/workbench/common/WorkbenchActions';
import * as React from 'react';
import { connect } from 'react-redux';
import * as Redux from 'redux';

import { SideBarActivityStyle } from '../SideBar.less';
import { ToDoItem } from './ToDoItem';

export interface IToDoActivityDispatchProps {
    requestAddItem: () => void;
    onTextChange: (text: string) => void;
    requestItemCheck: (id: string) => void;
    requestItemRemove: (id: string) => void;
    requestRemoveAllChecked: () => void;
}

export interface IToDoActivityStateProps {
    items: TodoItem[];
    pendingTodo: string;
}

export const ToDoActivity = connect(
    (state: AppState): IToDoActivityStateProps => ({
        items: state.workbench.todoItems.valueSeq().toArray(),
        pendingTodo: state.workbench.pendingTodo.text
    }),
    (dispatch: Redux.Dispatch<AppState>): IToDoActivityDispatchProps => ({
        requestAddItem: () => dispatch(CreateToDoAction.create()),
        onTextChange: (text: string) => dispatch(UpdatePendingToDoTextAction.create(text)),
        requestItemCheck: (id: string) => dispatch(CheckToDoAction.create(id)),
        requestItemRemove: (id: string) => dispatch(RemoveToDoAction.create(id)),
        requestRemoveAllChecked: () => dispatch(RemoveAllCheckedToDosAction.create())
    }))(
    class extends React.Component<IToDoActivityDispatchProps & IToDoActivityStateProps, {}> {
        public render() {
            return <div className={SideBarActivityStyle}>
                <FlexLayout direction='column'>
                    <FlexItem>{ foreach(this.props.items, (item) => (
                        <ToDoItem
                                todo={item}
                                key={item.id}
                                onToggleCheck={() => this.props.requestItemCheck(item.id)}
                                onDelete={() => this.props.requestItemRemove(item.id)}/>
                    ))}</FlexItem>
                    <FlexItem>
                        <TextArea
                                onChange={this.props.onTextChange}
                                value={this.props.pendingTodo}
                                placeholder='Add an item...'
                        />
                    </FlexItem>
                    <FlexItem>
                        <FlexLayout direction='row'>
                            <FlexItem />
                            <FlexItem>
                                <Button onClick={this.props.requestAddItem}>Add</Button>
                            </FlexItem>
                            <FlexItem />
                            <FlexItem>
                                <Button onClick={this.props.requestRemoveAllChecked}>Remove checked</Button>
                            </FlexItem>
                            <FlexItem flexGrow={0.5}></FlexItem>
                        </FlexLayout>
                    </FlexItem>
                </FlexLayout>
            </div>;
        }
    }
);
