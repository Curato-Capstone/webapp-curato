// @flow
import React, { Component } from 'react';
import Radium from 'radium';

@Radium
export default class MessageBar extends Component {
    static defaultProps = {};
    props: {
        message: string,
        type: "warning" | "success" | "failure"
    };

    render() {
        const { message, type } = this.props;

        return (
            <span style={[STYLES.messageBar, STYLES.messageType(type)]}>
                <p>{message}</p>
            </span>
        );
    }
}

const STYLES = {
    messageBar: {
        width: '100%',
        height: '50px',
        display: 'inline',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 3,
        textAlign: 'center'
    },

    messageType: (type) => {
        if (type === 'warning') {
            return STYLES.warning;
        } else if (type === 'success') {
            return STYLES.success;
        }
        return STYLES.failure;
    },

    warning: {
        backgroundColor: '#FFF176',
    },

    success: {
        backgroundColor: '#81C784',
    },

    failure: {
        backgroundColor: '#E57373',
    }
};
