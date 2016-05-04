// @flow
import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Tag extends Component {
    static defaultProps;

    props: { text: string };

    render() {
        let { text } = this.props;

        return (
            <div style={STYLE.container}>
                <span style={STYLE.tag}>{text}</span>
                <div style={STYLE.before}></div>
                <span style={STYLE.after}></span>
            </div>
        );
    }
}

const STYLE = {
    container: {
        position: 'absolute',
        bottom: 10,
        left: 12,
        display: 'inline-flex'
    },

    tag: {
        lineHeight: '28px',
        padding: '0 10px',
        color: '#ffffff',
        borderRadius: '3px 0px 0px 3px',
        backgroundColor: '#34495e',
        fontSize: '12px',
    },

    before: {
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderLeft: '10px solid #34495e',
        height: '28px',
        boxSizing: 'border-box',
        display: 'inline-block',
    },

    after: {
        position: 'absolute',
        content: '',
        top: '12px',
        right: '8px',
        width: '5px',
        height: '5px',
        borderRadius: '6px',
        background: '#ffffff'
    }
};
