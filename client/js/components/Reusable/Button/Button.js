// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { primaryColor, secondaryColor } from 'utils/colors';

@Radium
export default class Button extends Component {
    static defaultProps = {
        type        : 'primary',
        disabled    : false,
        handleClick : () => {},
        size        : 'md'
    };
    props: {
        label       : string,
        type        : 'primary' | 'secondary' | 'submit',
        handleClick : (event: Object) => void,
        disabled    : boolean,
        style?      : Object,
        size        : 'sm' | 'md' | 'lg'
    };
    state: void;

    render() {
        const { label, type, handleClick, disabled, style, size, ...other } = this.props;

        let newStyle = {
            ...STYLES.button,
            ...this.getDimensions(size),
            backgroundColor: this.getColor(type),
            opacity: disabled ? 0.6 : 1
        };
        
        return (
            <div style={style}>
                <button
                    onClick={disabled ? () => {} : handleClick}
                    style={newStyle}
                    {...other}
                >
                    <span style={STYLES.text}>{label}</span>
                </button>
            </div>
        );
    }

    getDimensions(size: string): Object | void {
        if (size === 'sm') {
            return {
                borderRadius: '2em',
                fontSize: '11px',
                lineHeight: '1.273em',
                padding: '6px 20px'
            };
        } else if (size === 'lg') {
            return {
                borderRadius: '2em',
                fontSize: '16px',
                lineHeight: '1.5em',
                padding: '10px 30px'
            };
        }
    }

    getColor(type: string): string {
        if (type === 'primary' || 'submit') {
            return primaryColor;
        }

        return secondaryColor;
    }
}

const STYLES = {
    button : {
        border: '1px solid transparent',
        boxShadow: '1px 1px 2px #888888',
        borderRadius: '2em',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '16px',
        lineHeight: '1.5em',
        margin: '10px',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        textTransform: 'uppercase',
        transition: 'opacity .3s ease-in-out',
        whiteSpace: 'nowrap',
        ':hover': {
            opacity: 0.85
        }
    },

    text: {
        color: 'white'
    }
};
