// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

import { primaryColor, secondaryColor } from 'utils/colors';

import logo from 'images/logo/logo.svg';

@Radium
export default class SideNav extends Component {
    static defaultProps = { };
    props: { location: Object };
    state: void;

    render() {
        const { location } = this.props;

        return (
            <div style={STYLES.container}>
                <Link to="/">
                    <img src={logo} style={STYLES.logo} type="image/svg+xml" />
                </Link>
                <div style={STYLES.navItemsContainer}>
                    <div style={STYLES.navItem} className="navItem" key="search">
                        <Link to="/">
                            <FontAwesome
                                name="search"
                                size="3x"
                                style={STYLES.navIcon}
                            />
                        </Link>
                    </div>
                    <div style={STYLES.navItem} className="navItem" key="favorites">
                        <Link to="/favorites">
                            <FontAwesome
                                name="heart"
                                size="3x"
                                style={STYLES.navIcon}
                            />
                        </Link>
                    </div>
                    <div style={STYLES.navItem} className="navItem" key="preferences">
                        <Link to="/preferences">
                            <FontAwesome
                                name="sliders"
                                size="3x"
                                style={STYLES.navIcon}
                            />
                        </Link>
                    </div>
                    <div style={STYLES.active(this.getActiveIndex(location.pathname))} />
                </div>
            </div>
        );
    }

    getActiveIndex(location: string): number {
        switch (location) {
            case '/':
                return 0;
            case '/favorites':
                return 1;
            case '/preferences':
                return 2;
            default:
                return -3;
        }
    }
}


const STYLES = {
    container: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '110vh',
        minHeight: '600px',
        width: '50px',
        zIndex: '9',
        boxShadow: '10px 0px 30px -15px rgba(0,0,0,0.65)',
        backgroundColor: primaryColor,
        transition: 'width 0.7s ease-in-out',
        '@media (min-width: 520px)': {
            width: '80px',
        }
    },

    logo: {
        height: '70px',
        width: '70px',
        margin: '20px 0 60px 0',
        transition: 'transform 0.5s ease-in-out',
        transform: 'scale(0.7,0.7)',
        '@media (min-width: 520px)': {
            transform: 'scale(1, 1)'
        }
    },

    navItemsContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },

    navItem: {
        height: '45px',
        margin: '40px 0',
        transition: 'transform 0.5s ease-in-out, opacity 0.25s ease-in-out',
        transform: 'scale(0.72,0.72)',
        ':hover': {
            opacity: 0.6,
            transform: 'scale(0.72,0.72) translateY(5px)'
        }
    },

    navIcon: {
        color: secondaryColor,
        textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)'
    },

    active: (item: number) => ({
        position: 'absolute',
        top: 38,
        transform: `translateY(${125 * item}px)`,
        opacity: item < 0 ? 0 : 1,
        left: 3,
        height: '55px',
        width: '3px',
        backgroundColor: secondaryColor,
        transition: 'transform 0.5s ease-in-out, opacity .7s ease-in-out',
        '@media (min-width: 520px)': {
            left: 4
        }
    })
};
