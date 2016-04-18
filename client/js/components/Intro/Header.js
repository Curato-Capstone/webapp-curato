import React, { Component } from 'react';
import Radium from 'radium';

import { primaryColor } from 'utils/colors'

@Radium
export default class Header extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { text } = this.props;

        return (
            <div style={STYLES.header}>
                {this.props.text}
            </div>
        );
    }
}

const STYLES = {
    header: {
        fontSize: '32px',
        color: primaryColor,
        // height: '25%',
        textAlign: 'center',
        // width: '100%'
        '@media (min-width: 520px)': {
            fontSize: '42px'
        },
    }
};
