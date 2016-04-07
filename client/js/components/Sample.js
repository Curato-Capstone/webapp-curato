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
            <div>
                <div style={[STYLES.hi]}>Hello {this.props.name}</div>
                <div style={STYLES.bye}>Bye!</div>
            </div>
        );
    }
}

const STYLES = {
    hi: {
        color: 'orange',
        fontWeight: 'bold'
    },

    bye: {
        ':hover': {
            opacity: 0
        }
    }
}

export default Sample;
