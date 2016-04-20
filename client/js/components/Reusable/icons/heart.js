// @flow
import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Heart extends Component {
    static defaultProps = {};
    
    props: { active: boolean };

    state = { changed: false };
    state: { changed: boolean };

    componentWillReceiveProps(nextProps: Object) {
        if (nextProps.active !== this.props.active) {
            this.setState({ changed: true });
        }
    }

    render() {
        const { active } = this.props;
        const { changed } = this.state;

        return (
            <section
                style={[
                    STYLES.main, STYLES.active(active),
                    STYLES.animating(active && changed)
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
        cursor: 'pointer',
        height: '35px',
        width: '60px',
        backgroundImage: `url(${require('images/animated-icons/heart.png')})`,
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
        return {};
    },

    animating: (animating) => {
        if (animating) {
            return {
                animation: 'x .8s steps(28) 1 normal forwards',
                animationName: heartBurst,
            };
        }
        return {};
    }
};
