// @flow
import React, { Component } from 'react';
import Radium from 'radium';

type Props = {};
class SignUp extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div>
                This is the sign up page
            </div>
        );
    }
}

const STYLES = {};

export default Radium(SignUp);
