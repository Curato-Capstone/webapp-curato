// @flow
import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Heart extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        return (
            <div style={STYLES.container}>
                <svg xmlns="http://www.w3.org/2000/svg" style={STYLES.svg}>
                    <g style={STYLES.group}>
                        <circle cx="36" cy="36" r="30" style={STYLES.circle} />
                        <path
                            d="M17.417,37.778l9.93,9.909l25.444-25.393"
                            style={STYLES.checkMark}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}

const checkMark = Radium.keyframes({
    '0%': {
        strokeDashoffset: '50px'
    },

    '100%': {
        strokeDashoffset: 0
    }
}, 'checkMark');

const checkMarkCircle = Radium.keyframes({
    '0%': {
        strokeDashoffset: '240px'
    },

    '100%': {
        strokeDashoffset: '480px'
    }
}, 'checkmMarkCircle');

const STYLES = {
    container: {
        // transform: 'scale(.25, .25)',
        height: '35px',
        width: '35px',
    },

    svg: {
        height: '70px',
        width: '70px',
        transform: 'scale(.5, .5)'
    },

    group: {
        fill: 'none',
        stroke: '#81C784',
        strokeWidth: 4
    },

    checkMark: {
        strokeDasharray: '50px, 50px',
        strokeDashoffset: '0',
        animation: 'x 0.6s ease-in-out backwards',
        animationName: checkMark
    },

    circle: {
        strokeDasharray: '240px, 240px',
        strokeDashoffset: '480px',
        animation: 'x 0.6s ease-in-out backwards',
        animationName: checkMarkCircle
    }
};
