import { Button } from 'cl/base/browser/ui/Button';
import * as React from 'react';

export interface IAppProps { }

export interface IAppState {
    buttonState: boolean;
}

/**
 * Root of the workbench UI
 */
export class Workbench extends React.Component<IAppProps, IAppState> {

    state = {
        buttonState: false
    };

    // === Lifecycle ===

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <h2>Welcome to React with Typescript!</h2>
                <Button text={this.buttonText} state={this.state.buttonState} onclick={this.clickHandler} type='primary' />
            </div>
        );
    }

    // === Computed properties ===

    private get buttonText(): string {
        return this.state.buttonState ? 'Activate' : 'Deactivate';
    }

    // === Methods ===

    private toggleButtonState(): void {
        this.setState({
            buttonState: !this.state.buttonState
        });
    }

    // === Handlers ===

    private clickHandler = () => {
        this.toggleButtonState();
    }
}
