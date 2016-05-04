// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Heart from './Heart';

@Radium
export default class Example extends Component {
    static defaultProps = {};

    props: {};

    state = { heartActive: false };
    state : { heartActive: boolean };

    render() {
        const { heartActive } = this.state;
        return (
            <div style={STYLES}>
                <h2>Icons</h2>
                <div onClick={() => this.setState({ heartActive: !heartActive })}>
                    <Heart active={heartActive} />
                </div>
            </div>
        );
    }
}

const STYLES = {
    margin: '50px'
};
