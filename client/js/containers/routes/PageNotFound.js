import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import { primaryColor, secondaryColor } from 'utils/colors'
import logo from 'images/logo/full-logo-color.svg';

@Radium
export default class PageNotFound extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        return (
            <div style={STYLES.container}>
                <img src={logo} alt="curato logo" style={STYLES.image}/>
                <p style={STYLES.text}>Uh-oh, you went somewhere that doesn't exist. Sorry about that.</p>
                <Link to="/" style={STYLES.link}>
                    <p style={STYLES.text}>Click here to go to our home page!</p>
                </Link>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        minHeight: '400px',
        fontSize: 18,
        margin: '0 24px'
    },

    image: {
        width: '95%',
        '@media (min-width: 520px)': {
            width: '500px',
        }
    },

    text: {
        textAlign: 'center'
    },

    link: {
        color: primaryColor,
        fontWeight: 'bold'
    }
};
