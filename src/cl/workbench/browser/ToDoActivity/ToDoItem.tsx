import { Button } from 'cl/base/browser/ui/Button';
import { FlexItem, FlexLayout } from 'cl/base/browser/ui/FlexLayout';
import { TodoItem } from 'cl/workbench/common/IWorkbenchState';
import * as React from 'react';

import { Checked, ToDoItemStyle } from './ToDoItem.less';

export interface IToDoItemProps {
    todo: TodoItem;
    onToggleCheck: () => void;
    onDelete: () => void;
}

export class ToDoItem extends React.Component<IToDoItemProps, {}> {

    private get buttonText(): string {
        return this.props.todo.checked ? '\u2713' /* Check mark */ : '\u2007\u2007';
    }

    private get className(): string {
        return [
            ToDoItemStyle,
            this.props.todo.checked ? Checked : ''
        ].join(' ');
    }

    render() {
        return <div
                tabIndex={0}
                className={this.className}
                onClick={this.props.onToggleCheck}
                onKeyDown={this.handleKeyDown} >
            <FlexLayout>
                <FlexItem>
                    { this.props.todo.text }
                </FlexItem>
                <FlexItem flexGrow={0}>
                    <Button onClick={this.handleDeleteClick}>
                        x
                    </Button>
                </FlexItem>
            </FlexLayout>
        </div>;
    }

    private handleDeleteClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.stopPropagation();
        this.props.onDelete();
    }

    private handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        switch (evt.key) {
            case ' ':
            case 'Enter':
                evt.stopPropagation();
                return this.props.onToggleCheck();
            case 'Backspace':
            case 'Delete':
                return this.props.onDelete();
        }
    }
}