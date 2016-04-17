// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome'

import { primaryColor, secondaryColor } from 'utils/colors';

import logo from 'images/logo/logo.svg'

@Radium
export default class SideNav extends Component {
    static defaultProps = {};
    props: { hide: boolean };
    state: void;

    render() {
        const { hide } = this.props;

        return (
            <div style={[STYLES.container, STYLES.hide(hide)]}>
                <div>
                    <Link to="/">
                        <img src={logo} style={STYLES.logo} type="image/svg+xml" />
                    </Link>
                </div>
                
                <Link to="/">
                    <FontAwesome
                        name='search'
                        size="3x"
                        style={{ color: 'white', textShadow: '0 5px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                </Link>
                <Link to="/favorites">
                    Favorites
                </Link>
                <Link to="/preferences">
                    Preferences
                </Link>
            </div>
        );
    }
}


const STYLES = {
    container: {
        height: '100vh',
        minHeight: '900px',
        width: '100px',
        backgroundColor: primaryColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'width 1s ease-in-out, opacity .5s ease-in-out',
    },

    hide: (hide) => {
        if (hide) {
            return {
                width: 0,
                opacity: 0
            }
        }
    },

    logo: {
        height: '100px',
        width: '100px'
    }
};
