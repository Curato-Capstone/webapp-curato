// @flow
import React, { Component } from 'react';
import Radium from 'radium';

import { primaryColor } from 'utils/colors';

@Radium
export default class Header extends Component {
    static defaultProps = {};
    props: { text: string };
    state: void;

    render() {
        const { text } = this.props;

        return (
            <div style={STYLES.header}>
                {text}
            </div>
        );
    }
}

const STYLES = {
    header: {
        fontSize: '28px',
        color: primaryColor,
        textAlign: 'center',
        '@media (min-width: 520px)': {
            fontSize: '42px'
        },
    }
};
