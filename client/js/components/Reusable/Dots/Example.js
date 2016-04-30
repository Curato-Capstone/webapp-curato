// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import Dots from 'components/Reusable/Dots/Dots';

@Radium
export default class Example extends Component {
    static defaultProps = {};

    props: {};

    state = { active: 0 };
    state: { active: number };


    render() {
        const items = [
            { name: 'test', handleClick: () => this.setState({ active: 0 }) },
            { name: 'test2', handleClick: () => this.setState({ active: 1 }) },
            { name: 'test3', handleClick: () => this.setState({ active: 2 }) }
        ];

        return (
            <div style={STYLES}>
                <h2>Dots</h2>
                <Dots items={items} active={this.state.active} />
            </div>
        );
    }
}

const STYLES = {
    margin: '50px'
};
