// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { routerActions } from 'react-router-redux';
import { auth as authActions } from 'modules/index';

import Header from 'components/Intro/Header';
import SignUpForm from 'components/Forms/SignUpForm/SignUpForm';

@Radium
class SignUp extends Component {
    static defaultProps = {};
    props: {
        actions: Object
    };
    state: void;

    render() {
        return (
            <div>
                <Header text="Sign Up!" />
                <div style={STYLES.text}>
                    Now, create your account and start getting more curated suggestions today!
                </div>
                <SignUpForm onSubmit={() => this.signUpUser()} />
            </div>
        );
    }

    signUpUser() {
        const { actions } = this.props;

        actions.signUpUser()
            .then(() => {
                actions.push('/');
            });
    }
}

const STYLES = {
    text: {
        margin: '24px',
        textAlign: 'center'
    },
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions : bindActionCreators({ ...authActions, ...routerActions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
