// @flow
import React, { Component } from 'react';
import Radium from 'radium';

type Props = { name: string };
class Sample extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        return (
            <div style={STYLES}>Hello {this.props.name}</div>
        );
    }
}

const STYLES = {
    ':hover': {
        color: 'orange'
    }
}

export default Sample;
