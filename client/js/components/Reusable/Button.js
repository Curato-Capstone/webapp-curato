// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { primaryColor, secondaryColor } from '../../utils/colors';

import RaisedButton from 'material-ui/lib/raised-button';

type Props = {
    label        : string,
    type?        : 'primary' | 'secondary',
    handleClick? : (event: Object) => void,
    disabled?    : boolean
};
class Button extends Component {
    static defaultProps = {
        type        : 'primary',
        disabled    : false,
        handleClick : () => {}
    };
    state: void;
    props: Props;

    render() {
        const { label, type, handleClick, disabled } = this.props;

        return (
            <div onClick={handleClick}>
                <RaisedButton
                    backgroundColor={this.getColor()}
                    label={label}
                    disabled={disabled}
                />
            </div>
        );
    }

    getColor(): string {
        if (this.props.type === 'primary') {
            return primaryColor;
        } else {
            return secondaryColor;
        }
    }
}

export default Radium(Button);
