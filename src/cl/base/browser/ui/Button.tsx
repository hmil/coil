import * as React from 'react';
import { Danger, Success } from './Button.less';

export type ButtonType = 'primary' | 'default';

export interface IButtonProps {
    type?: ButtonType;
    text?: string;
    state?: boolean;
    onclick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

export class Button extends React.Component<IButtonProps, {}> {

    private handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const handler = this.props.onclick;
        if (handler) {
            handler(evt);
        }
    }

    private get className() {
        return this.props.state ? Success : Danger;
    }

    public render() {
        return <button type='button' className={this.className} onClick={this.handleClick}>{this.props.text}</button>;
    }
}
