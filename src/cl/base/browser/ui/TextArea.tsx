import * as React from 'react';
import { TextAreaStyle } from './TextArea.less';

export interface ITextAreaProps {
    value?: string;
    placeholder?: string;
    onChange?: (text: string) => void;
}

export class TextArea extends React.Component<ITextAreaProps, {}> {

    public render() {
        return <textarea
                value={this.props.value}
                placeholder={this.props.placeholder}
                className={TextAreaStyle}
                onChange={this.handleChange} />;
    }

    public handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (this.props.onChange) {
            this.props.onChange(evt.target.value);
        }
    }
}
