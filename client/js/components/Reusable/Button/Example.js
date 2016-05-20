// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Button from './Button';

@Radium
export default class Example extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        return (
            <div style={STYLES}>
                <h2>Buttons</h2>
                <Button label="Primary Button" type="primary" />
                <Button label="Secondary Button" type="secondary" />

                <Button label="Disabled Primary Button" type="primary" disabled />
                <Button label="Disabled Secondary Button" type="secondary" disabled />

                <Button label="Primary Button Large" size="lg" />
                <Button label="Primary Button Small" size="sm" />
            </div>
        );
    }
}

const STYLES = {
    margin: '50px'
};
