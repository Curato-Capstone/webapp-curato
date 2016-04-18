import React, { Component } from 'react';
import Radium from 'radium';
import Button from 'reusable/Button/Button'

import { primaryColor } from 'utils/colors'
@Radium
export default class Home extends Component {
    static defaultProps = {};
    props: {};
    state: void;

    render() {
        const { } = this.props;

        return (
            <div style={STYLES.container}>
                <div style={STYLES.header}>Curato</div>
                <div style={STYLES.text}>HEre is texttttt asdjfaisdfji asdfjsaiodfjisdo js o;f jaos;f HEre is texttttt asdjfaisdfji asdfjsaiodfjisdo js o;f jaos;f HEre is texttttt asdjfaisdfji asdfjsaiodfjisdo js o;f jaos;f</div>
                <Button label="Sign Up!" />
            </div>
        );
    }
}

const STYLES = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px'
    },
    header: {
        fontSize: '42px',
        color: primaryColor
    },

    text: {
        margin: '24px'
    }
};
