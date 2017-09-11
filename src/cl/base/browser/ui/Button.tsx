import * as React from 'react';

import { ButtonActive, ButtonStyle } from './Button.less';

export interface IButtonProps {
    active?: boolean;
    onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    focusable?: boolean;
}

export class Button extends React.Component<IButtonProps, {}> {

    private get className(): string {
        return [
            ButtonStyle,
            this.props.active ? ButtonActive : ''
        ].join(' ');
    }

    private get children(): React.ReactNode {
        if (this.props.children == null || this.props.children['length'] != undefined && this.props.children['length'] === 0) {
            return '\u00A0';
        } else {
            return this.props.children;
        }
    }

    private get isFocusable(): boolean {
        return this.props.focusable == null || this.props.focusable;
    }

    public render() {
        return <button tabIndex={this.isFocusable ? 0 : -1} type='button' className={this.className} onClick={this.props.onClick}>
            {this.children}
        </button>;
    }
}
