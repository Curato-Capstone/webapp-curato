// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Header from 'components/Intro/Header';
import SignUpForm from 'components/Forms/SignUpForm/SignUpForm';

@Radium
export default class SignUp extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div>
                <Header text="Sign Up!" />
                <div style={STYLES.text}>
                    Now, create your account and start getting more curated suggestions today!
                </div>
                <SignUpForm onSubmit={() => console.log("SUBMITTTING")}/>
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
