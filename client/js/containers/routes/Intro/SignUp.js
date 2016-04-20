import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

import { primaryColor } from 'utils/colors';

import Header from 'components/Intro/Header';
import Button from 'reusable/Button/Button';

@Radium
export default class SignUp extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div>
                <Header text="Sign Up!"/>
                <div style={STYLES.text}>Now, create your account and start getting more curated suggestions today!</div>

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
