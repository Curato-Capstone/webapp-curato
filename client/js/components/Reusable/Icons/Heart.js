// @flow
import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Heart extends Component {
    static defaultProps = {};

    props: { active: boolean, styles?: Object };

    state = { changed: false };
    state: { changed: boolean };

    componentWillReceiveProps(nextProps: Object) {
        if (nextProps.active !== this.props.active) {
            this.setState({ changed: true });
        }
    }

    render() {
        const { active, styles } = this.props;
        const { changed } = this.state;

        return (
            <section
                style={[
                    STYLES.main, STYLES.active(active),
                    STYLES.animating(active && changed),
                    styles
                ]}
            />
        );
    }
}

const heartBurst = Radium.keyframes({
    '0%': {
        backgroundPosition: 'left'
    },
    '100%': {
        backgroundPosition: 'right'
    }
}, 'heartBurst');

const STYLES = {
    main: {
        height: '40px',
        width: '60px',
        cursor: 'pointer',
        backgroundImage: `url(${require('images/icons/heart.png')})`,
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '2900%'
    },

    active: (active) => {
        if (active) {
            return {
                backgroundPosition: 'right'
            };
        }
    },

    animating: (animating) => {
        if (animating) {
            return {
                animation: 'x .8s steps(28) 1 normal forwards',
                animationName: heartBurst,
            };
        }
    }
};
