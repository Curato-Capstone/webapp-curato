// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import FlipMove from 'react-flip-move';

import { primaryColor } from 'utils/colors'

const pathToCrumbs = {
    '/'            : ['Search'],
    '/favorites'   : ['Favorites', "Something"],
    '/preferences' : ['Preferences'],
    '/suggestions' : ['Search', 'Suggestions'],
    '/place'       : ['Place']
};

@Radium
export default class BreadCrumbs extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { location } = this.props;
        const pathname = location.pathname;

        return (
            <div style={STYLES.container}>
                <FlipMove
                    style={STYLES.crumbContainer}
                    enterAnimation="accordianHorizontal"
                    leaveAnimation="accordianHorizontal"
                    staggerDelayBy={70}
                >
                    <div key="Curato">Curato</div>
                    { pathToCrumbs[pathname].map((crumb, index) => (
                        <div style={STYLES.crumb} key={pathname + index}>
                            <div style={STYLES.divider}>//</div>
                            <div style={STYLES.active(pathToCrumbs[pathname].length == index + 1)}>{crumb}</div>
                        </div>
                    ))}
                </FlipMove>
            </div>
        );
    }
}

const STYLES = {
    container: {
        position: 'absolute',
        top: 16,
        left: 40,
        zIndex: 99,
        height: '20px',
        marginLeft: '20px',
        fontSize: '12px',
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        '@media (min-width: 300px)': {
            fontSize: '14px'
        },
        '@media (min-width: 420px)': {
            fontSize: '20px'
        },
        '@media (min-width: 520px)': {
            left: 80,
        },
    },

    crumbContainer: {
        display: 'flex',
    },

    crumb: {
        display: 'flex'
    },

    divider: {
        margin: '0 10px',
        letterSpacing: '0px'
    },

    active: (active) => {
        if (active) {
            return {color: primaryColor};
        }
    }
};
