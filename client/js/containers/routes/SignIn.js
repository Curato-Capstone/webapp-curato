import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from 'modules/auth';

import logoColor from 'images/logo/full-logo-color.svg';
import logo from 'images/logo/full-logo.svg'

import SignInForm from 'components/Forms/SignInForm/SignInForm';
import { primaryColor } from 'utils/colors';

@Radium
class SignIn extends Component {
    static defaultProps = {};
    props: { actions: Object};
    state: void;

    render() {
        const { actions } = this.props;

        return (
            <div style={STYLES.container}>
                <img src={logoColor} style={STYLES.logo} />
                <div style={STYLES.card}>
                    <div style={STYLES.left}>
                        <p style={STYLES.text}>Sign in to get your curated suggestions!</p>
                        <SignInForm onSubmit={() => actions.signInUser()} />
                    </div>
                    <div style={STYLES.right}>
                        <img src={logo} style={STYLES.sideLogo} />
                    </div>
                </div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '90vh',
    },

    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        height: '350px',
        width: '90%',
        maxWidth: '900px',
        margin: '16px 0',
        boxShadow: '3px 8px 12px #888888',
        padding: '12px 24px',
        boxSizing: 'border-box',
        '@media (min-width: 720px)': {
            height: '400px',
            padding: '0 0 0 12px',
            alignItems: 'flex-start'
        }
    },

    text: {
        textAlign: 'center',
        color: primaryColor,
        fontSize: '18px',
    },

    logo: {
        width: '80%',
        marginBottom: '18px',
        '@media (min-width: 720px)': {
            display: 'none',
        }
    },

    left: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        '@media (min-width: 720px)': {
            width: '40%',
            padding: '12px 0'
        }
    },

    right: {
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
        height: '100%',
        backgroundColor: primaryColor,
        '@media (min-width: 720px)': {
            display: 'flex',
        }
    },

    sideLogo: {
        width: '80%',
        paddingBottom: '50px'
    }

};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators(authActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
