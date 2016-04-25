// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { primaryColor, secondaryColor } from 'utils/colors';

import RaisedButton from 'material-ui/RaisedButton';

@Radium
export default class Button extends Component {
    static defaultProps = {
        type        : 'primary',
        disabled    : false,
        handleClick : () => {},
        style       : {}
    };
    props: {
        label       : string,
        type        : 'primary' | 'secondary',
        handleClick : (event: Object) => void,
        disabled    : boolean,
        style       : Object
    };
    state: void;

    render() {
        const { label, type, handleClick, disabled, style, ...other } = this.props;

        return (
            <div onClick={handleClick}>
                <RaisedButton
                    style={Object.assign(STYLES, style)}
                    backgroundColor={this.getColor(type)}
                    label={label}
                    labelColor="white"
                    disabled={disabled}
                    {...other}
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

const STYLES = {
    color: 'white'
};
