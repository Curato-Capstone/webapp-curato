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
        type        : 'primary' | 'secondary' | 'submit',
        handleClick : (event: Object) => void,
        disabled    : boolean,
        style       : Object,
        size        : 'sm' | 'md' | 'lg'
    };
    state: void;

    getDimensions(size) {
        if (size === 'sm') {
            return {
                borderRadius: '2em',
                fontSize: '11px',
                lineHeight: '1.273em',
                padding: '6px 20px'
            }
        } else if (size == 'lg') {
            return {
                borderRadius: '2em',
                fontSize: '16px',
                lineHeight: '1.5em',
                padding: '10px 30px'
            }
        }

        return null;
    };

    render() {
        const { label, type, handleClick, disabled, style, size, ...other } = this.props;

        let newStyle = Object.assign(BUTTON_STYLE, this.getDimensions(size),
                          {backgroundColor: this.getColor(type)}, style,
                          disabled ? {'opacity': '.6'} : {}
                        );
        return (
            <div onClick={disabled ? () => {return null} : handleClick}>
                <button style={newStyle} {...other}>
                    <span style={{color:'white'}}>{label}</span>
                </button>
            </div>
        );
    }

    getColor(type: string): string {
        if (type === 'primary' || 'submit') {
            return primaryColor;
        }

        return secondaryColor;
    }
}

const BUTTON_STYLE = {
    border: '1px solid transparent',
    boxShadow: '1px 1px 2px #888888',
    borderRadius: '2em',
    display: 'inline-block',
    lineHeight: '1.5em',
    margin: '10px',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'opacity .2s ease-in-out',
    whiteSpace: 'nowrap'
};

const STYLES = {
    color: 'white'
};
