// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import spinnerImage from 'images/icons/spinner.svg';

@Radium
export default class Spinner extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        return (
            <img src={spinnerImage} style={STYLES} />
        );
    }
}

const STYLES = {
    position: 'fixed',
    top: '35%',
    left: '50%',
    zIndex: 99
};
