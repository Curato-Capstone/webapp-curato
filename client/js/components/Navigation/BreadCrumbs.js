// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import FlipMove from 'react-flip-move';

import { primaryColor } from 'utils/colors';

const pathToCrumbs = {
    '/'            : ['Search'],
    '/favorites'   : ['Favorites'],
    '/preferences' : ['Preferences'],
    '/suggestions' : ['Search', 'Suggestions'],
    '/place'       : ['Place'],
    '/account'     : ['Account']
};

@Radium
export default class BreadCrumbs extends Component {
    static defaultProps = {};
    props: {
        location: Object
    };
    state: void;

    render() {
        const { location } = this.props;
        const pathname = location.pathname.length !== 1 ?
            location.pathname.replace(/\/$/, '') :
            location.pathname;

        return (
            <div style={STYLES.container}>
                <FlipMove
                    style={STYLES.crumbContainer}
                    enterAnimation="accordianHorizontal"
                    leaveAnimation="accordianHorizontal"
                    staggerDelayBy={70}
                >
                    <div key="Curato">Curato</div>
                    {pathToCrumbs[pathname].map((crumb, index) => (
                        <div style={STYLES.crumb} key={crumb + index}>
                            <div style={STYLES.divider}>//</div>
                            <div
                                style={[STYLES.crumbText, STYLES.active(pathToCrumbs[pathname].length === index + 1)]}
                            >
                                {crumb}
                            </div>
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
        left: 80,
        height: '20px',
        marginLeft: '20px',
        opacity: 0,
        zIndex: 99,
        fontSize: '21px',
        fontFamily: 'Roboto Mono',
        fontWeight: 'bold',
        transition: 'opacity 0.5s ease-in-out',
        '@media (min-width: 520px)': {
            opacity: 1
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

    crumbText: {
        transition: 'color 1.5s ease-in'
    },

    active: (active) => {
        if (active) {
            return { color: primaryColor };
        }
    }
};
