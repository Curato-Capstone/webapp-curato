import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import logo from 'images/logo/full-logo-color.svg';

import Button from 'reusable/Button/Button';

@Radium
export default class Home extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <img style={STYLES.header} src={logo} />
                <div style={STYLES.text}>
                    Welcome to Curato! Curato is a simple way to sift through all
                    the information out there to help you find things to do.
                    If you’re new, start by creating an account so we can guide
                    you through how to use Curato.
                </div>
                <div style={STYLES.buttonContainer}>
                    <Link to="/intro/1">
                        <Button label="Sign Up!" style={STYLES.signUpButton} />
                    </Link>
                    <Link to="/signin" style={STYLES.haveAccount}>
                        Already have an account?
                    </Link>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    text: {
        margin: '24px',
        textAlign: 'center',
        fontSize: '20px'
    },

    buttonContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    signUpButton: {
        marginBottom: '16px'
    },

    haveAccount: {
        fontStyle: 'italic',
        textDecoration: 'underline',
        cursor: 'pointer'
    }
};
