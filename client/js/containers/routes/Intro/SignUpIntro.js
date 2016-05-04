// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as authActions from 'modules/auth';

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
        const { actions } = this.props;

        return (
            <div>
                <Header text="Sign Up!" />
                <div style={STYLES.text}>
                    Now, create your account and start getting more curated suggestions today!
                </div>
                <SignUpForm onSubmit={() => actions.signUpUser()} />
            </div>
        );
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
        actions : bindActionCreators(Object.assign({}, authActions), dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
