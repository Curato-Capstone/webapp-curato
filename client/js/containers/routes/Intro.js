// @flow
import React, { Component } from 'react';
import Radium from 'radium';

type Props = {};
class Intro extends Component {
    static defaultProps = {};
    state: void;
    props: Props;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.card}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Radium(Intro);

const STYLES = {
    container: {
        height: '100%',
        height: '100vh',
        minHeight: '600px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        width: '500px',
        height: '600px',
        boxShadow: '3px 8px 12px #888888',
        backgroundColor: 'rgba(255, 255, 240, 1)',
        // opacity: 0.25,
        margin: '40px'
    }
};
