// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Radium from 'radium'

import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';

import { primaryColor, secondaryColor } from 'utils/colors';

import logo from 'images/logo/logo.svg';

@Radium
export default class SideNav extends Component {
    static defaultProps = { hide: false };
    props: { hide: boolean, location: Object };
    state: void;

    render() {
        const { hide, location } = this.props;

        return (
            <div style={[STYLES.container, STYLES.hide(hide)]}>
                <div style={STYLES.logoContainer}>
                    <Link to="/">
                        <img src={logo} style={STYLES.logo} type="image/svg+xml" />
                    </Link>
                </div>
                <div style={STYLES.navItemsContainer}>
                    <div style={STYLES.navItem}>
                        <Link to="/">
                            <FontAwesome
                                name="search"
                                size="3x"
                                style={{ color: 'white', textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                        </Link>
                    </div>
                    <div style={STYLES.navItem}>
                        <Link to="/favorites">
                            <FontAwesome
                                name="heart"
                                size="3x"
                                style={{ color: 'white', textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                        </Link>
                    </div>
                    <div style={STYLES.navItem}>
                        <Link to="/preferences">
                            <FontAwesome
                                name="sliders"
                                size="3x"
                                style={{ color: 'white', textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                        </Link>
                    </div>
                    <div style={STYLES.active(this.getActiveIndex(location.pathname))} />
                </div>
            </div>
        );
    }

    getActiveIndex(location) {
        switch (location) {
            case '/':
                return 0;
            case '/favorites':
                return 1;
            case '/preferences':
                return 2
            default:
                return -99
        }
    }
}


const STYLES = {
    container: {
        height: '100vh',
        minHeight: '900px',
        width: '50px',
        backgroundColor: primaryColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'width 1s ease-in-out, opacity .5s ease-in-out',
        '@media (min-width: 520px)': {
            width: '80px',
        }
    },

    hide: (hide) => {
        if (hide) {
            return {
                width: 0,
                opacity: 0
            };
        }
    },

    logo: {
        height: '70px',
        width: '70px',
        margin: '20px 0 60px 0',
        transition: 'all 1s ease-in-out',
        transform: 'scale(0.7,0.7)',
        '@media (min-width: 520px)': {
            transform: 'scale(1, 1)'
        }
    },

    navItemsContainer: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    navItem: {
        margin: '40px 0',
        height: '45px',
        transition: 'all 1s ease-in-out',
        transform: 'scale(0.72,0.72)',
        '@media (min-width: 520px)': {
            transform: 'scale(1, 1)'
        }
    },

    active: (item: number) => {
        return {
            position: 'absolute',
            top: 40 + 125 * item,
            left: 2,
            height: '55px',
            transition: 'all 0.5s ease-in-out',
            width: '3px',
            backgroundColor: 'white',
            '@media (min-width: 520px)': {
                left: 4
            }
        };
    }
};
