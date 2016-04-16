// @flow
import React, { Component } from 'react';
import Radium from 'radium';

type Props = {};
class SignIn extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div>
                This is the sign in page
            </div>
        );
    }
}

export default Radium(SignIn);
