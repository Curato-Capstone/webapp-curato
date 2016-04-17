// @flow
import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class Star extends Component {
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
                    STYLES.main,
                    STYLES.active(active),
                    STYLES.animating(active && changed)
                ]}
            />
        );
    }
}

const STYLES = {
    main: {
        width: '70px',
        height: '50px',
        cursor: 'pointer',
        backgroundImage: `url(${require('images/animated-icons/star.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 0'
    },

    active: (active: boolean) => {
        if (active) {
            return {
                backgroundPosition: 'right'
            };
        }
        return {};
    },

    animating: (animating: boolean) => {
        if (animating) {
            return {
                backgroundPosition: '-3519px 0',
                transition: 'background 1s steps(55)'
            };
        }
        return {};
    }
};
