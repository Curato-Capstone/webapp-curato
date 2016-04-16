import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class star extends Component {
    static defaultProps = {};
    props: { active: boolean };
    state: { changed: boolean };
    state = { changed: false }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active !== this.props.active) {
            this.setState({ changed: true })
        }
    }


    render() {
        const { active } = this.props;
        const { changed } = this.state;

        return (
            <section style={
                [STYLES.main, STYLES.active(active), STYLES.animating(active && changed)]
            }/>
        );
    }
}

const STYLES = {
    main: {
        width: '70px',
        height: '50px',
        background: `url(${require('../../../../images/animated-icons/star.png')}) no-repeat`,
        backgroundPosition: '0 0'
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
                backgroundPosition: '-3519px 0',
                transition: 'background 1s steps(55)'
            }
        }
        return {}
    }
};
