import * as React from 'react';

type JustifyContent =
    | 'center'
    // | 'start'
    // | 'end'
    | 'flex-start'
    | 'flex-end'
    // | 'left'
    // | 'right'
    // | 'baseline'
    // | 'first baseline'
    // | 'last baseline'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    // | 'stretch'
    // | 'safe center'
    // | 'unsafe center'
    ;

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type AlignItems =
    // | 'normal'
    | 'stretch'
    // | 'center'
    // | 'start'
    // | 'end'
    | 'flex-start'
    | 'flex-end'
    // | 'self-start'
    // | 'self-end'
    // | 'left'
    // | 'right'
    | 'baseline'
    // | 'first baseline'
    // | 'last baseline'
    // | 'safe center'
    // | 'unsafe center'
    ;

type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface IFlexLayoutProps {
    justifyContent?: JustifyContent;
    direction?: FlexDirection;
    alignItems?: AlignItems;
    flexWrap?: FlexWrap;
    className?: string;
    style?: React.CSSProperties;
}

export class FlexLayout extends React.Component<IFlexLayoutProps, {}> {
    render() {
        const props = this.props;
        const styles = {
                display: 'flex',
                flexDirection: props.direction || 'row',
                flexWrap: props.flexWrap || 'nowrap',
                justifyContent: props.justifyContent || 'space-evenly',
                alignItems: props.alignItems || 'stretch'
            };

        return <div className={this.props.className} style={{...styles, ...this.props.style}}>{this.props.children}</div>;
    }
}

interface IFlexItemProps {
    flexGrow?: number;
    flexShrink?: number;
    className?: string;
    style?: React.CSSProperties;
}

export class FlexItem extends React.Component<IFlexItemProps, {}> {

    render() {
        const styles = {
            flexGrow: (this.props.flexGrow == null) ? 1 : this.props.flexGrow,
            flexShrink: (this.props.flexShrink == null) ? 1 : this.props.flexShrink,
            minWidth: 0
        };
        return <div style={{...styles, ...this.props.style}} className={this.props.className}>{this.props.children}</div>;
    }
}