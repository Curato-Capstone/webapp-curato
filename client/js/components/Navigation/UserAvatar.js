import React, { Component } from 'react';
import Radium from 'radium';

import Avatar from 'material-ui/Avatar';

@Radium
export default class UserAvatar extends Component {
    static defaultProps = {};
    props: { name: string };
    state: void;

    render() {
        const { name } = this.props;

        return (
            <div style={STYLES.container}>
                <Avatar className="fa fa-paper-plane" style={STYLES.avatarIcon} />
                <div>{name}</div>
            </div>
        );
    }
}

const STYLES = {
    container: {
        position: 'absolute',
        right: 0,
        display: 'inline-flex',
        alignItems: 'center',
        height: '50px',
        marginRight: '20px',
        marginTop: '5px',
        cursor: 'pointer'
    },

    avatarIcon: {
        marginRight: '12px'
    }
};
