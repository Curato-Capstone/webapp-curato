// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Star from './Star';
import Heart from './Heart';

@Radium
export default class Example extends Component {
    static defaultProps = {};

    props: {};

    state =  { starActive: false, heartActive: false };
    state: { starActive: boolean, heartActive: boolean };
    
    render() {
        const { starActive, heartActive } = this.state;
        return (
            <div style={STYLES}>
                <h2>Icons</h2>
                <div onClick={() => this.setState({ starActive: !starActive })}>
                    <Star active={starActive} />
                </div>
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
