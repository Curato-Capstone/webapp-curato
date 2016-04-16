// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { primaryColor, secondaryColor } from 'utils/colors';

import RaisedButton from 'material-ui/lib/raised-button';

@Radium
export default class Button extends Component {
    static defaultProps = {
        type        : 'primary',
        disabled    : false,
        handleClick : () => {}
    };
    props:{
        label       : string,
        type        : 'primary' | 'secondary',
        handleClick : (event: Object) => void,
        disabled    : boolean
    };
    state: void;


    render() {
        const { label, type, handleClick, disabled } = this.props;

        return (
            <div onClick={handleClick}>
                <RaisedButton
                    backgroundColor={this.getColor(type)}
                    label={label}
                    disabled={disabled}
                />
            </div>
        );
    }

    getColor(type: string): string {
        if (type === 'primary') {
            return primaryColor;
        }

        return secondaryColor;
    }
}
