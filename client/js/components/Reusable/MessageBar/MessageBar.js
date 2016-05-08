// @flow
import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class MessageBar extends Component {
    static defaultProps = {};
    props: {
        message: string,
        type: "warning" | "success" | "error"
    };

    render() {
        const { message, type } = this.props;

        return (
            <div style={[STYLES.messageBar, STYLES.messageType(type)]}>
                <div>{message}</div>
            </div>
        );
    }
}

const STYLES = {
    messageBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        zIndex: 99,
        textAlign: 'center'
    },

    messageType: (type) => {
        if (type === 'warning') {
            return { backgroundColor: '#FFF176' };
        } else if (type === 'success') {
            return { backgroundColor: '#81C784' };
        }
        return { backgroundColor: '#E57373' };
    }
};
