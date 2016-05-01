// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import TextField from './TextField';
import Select from './Select';

@Radium
export default class Example extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        return (
            <div style={STYLES}>
                <h2>Inputs</h2>
                <TextField
                    id="empty-input"
                    value=""
                    hintText="Put something here!"
                    type="text"
                    floatingLabelText="text"
                />
                <TextField
                    value="This is a regular text input"
                    hintText="Put something here!"
                    id="regular-input"
                    type="text"
                    floatingLabelText="text"
                />
                <TextField
                    value="This is a password input"
                    hintText="Password tho"
                    id="password-input"
                    type="password"
                    floatingLabelText="Password"
                />

                <Select
                    options={['What', 'is', 'good?']}
                    floatingLabelText="Gender"
                />

            </div>
        );
    }
}

const STYLES = {
    margin: '50px'
};
